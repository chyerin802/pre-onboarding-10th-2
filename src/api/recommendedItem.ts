import { RecItem } from '@type/recommendedItem';
import CustomCacheStorage from '@service/CacheStorage';

const REC_ITEM_CACHE_KEY = 'rec-item';
const REC_ITEM_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1일;
const GET_REC_ITEMS_ENDPOINT = '/api/v1/search-conditions/';

const RecItemCacheStorage = new CustomCacheStorage(REC_ITEM_CACHE_KEY, REC_ITEM_EXPIRY_TIME);

const getRecommendedItemListAPI = async (name: string) => {
  const url = `${GET_REC_ITEMS_ENDPOINT}?name=${name}`;
  // cache open
  let data: RecItem[] = await RecItemCacheStorage.getMatchData(url);

  if (!data) {
    console.info('calling api');
    const apiResponse = await fetch(url);
    await RecItemCacheStorage.putData(url, apiResponse);
    data = await apiResponse.json();
  }

  return data;
};

export default getRecommendedItemListAPI;
