import { RecItem } from '@type/recommendedItem';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage';

const CACHE_KEY_NAME = 'cachedRecItems';
const CACHE_EXPIRE_TIME = 500;

type CachedRecItemsType = {
  word: string;
  data: RecItem[];
  expiry: number;
};

const getCachedRecItems = (word: string) => {
  const localCachedItems = getLocalStorageItem(CACHE_KEY_NAME);

  if (localCachedItems) {
    const cachedItems: CachedRecItemsType[] = JSON.parse(localCachedItems);
    const findItem = cachedItems?.find((item: CachedRecItemsType) => item.word === word);

    if (!findItem) return;

    const now = new Date();
    console.log('now', now.getTime());
    console.log('expiry', findItem.expiry);

    if (now.getTime() > findItem.expiry) {
      setLocalStorageItem(
        CACHE_KEY_NAME,
        cachedItems.filter(item => item.word !== findItem.word)
      );
    } else {
      return findItem.data;
    }
  }
};

const setCachedRecItems = (word: string, data: RecItem[]) => {
  const localCachedItems = getLocalStorageItem(CACHE_KEY_NAME);
  let cachedItems: CachedRecItemsType[] = [];
  const now = new Date();

  if (localCachedItems) cachedItems = JSON.parse(localCachedItems);
  setLocalStorageItem(CACHE_KEY_NAME, [...cachedItems, { word, data, expiry: now.getTime() + CACHE_EXPIRE_TIME }]);
};

export { getCachedRecItems, setCachedRecItems };
