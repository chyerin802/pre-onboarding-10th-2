export default class CustomCacheStorage {
  cacheKey: string;

  expireTime: number;

  constructor(cacheKey: string, expireTime: number) {
    this.cacheKey = cacheKey;
    this.expireTime = expireTime;
  }

  openCache() {
    return caches.open(this.cacheKey);
  }

  isExpired(cachedTime: number) {
    const now = new Date().getTime();

    return now > cachedTime + this.expireTime;
  }

  async putData(req: RequestInfo | URL, res: Response) {
    const cache = await this.openCache();
    await cache.put(req, res.clone());
  }

  async getMatchData(req: RequestInfo | URL) {
    const cache = await this.openCache();
    const cachedResponse = await cache.match(req);

    //  if response matched
    if (cachedResponse) {
      const cachedTimeStr = cachedResponse.headers.get('date');
      const cachedTime = cachedTimeStr ? new Date(cachedTimeStr).getTime() : -this.expireTime;

      // check expired Time
      if (!this.isExpired(cachedTime)) {
        return cachedResponse.json();
      }
    }
  }
}
