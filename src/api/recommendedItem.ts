import axios from 'axios';
import { getCachedRecItems, setCachedRecItems } from '@utils/cacheRecItem';

const GET_REC_ITEMS_ENDPOINT = '/api/v1/search-conditions/';

const getRecommendedItemListAPI = async (name: string) => {
  const cachedData = getCachedRecItems(name);

  if (!cachedData) {
    try {
      console.info('calling api');
      const res = await axios.get(GET_REC_ITEMS_ENDPOINT, { params: { name } });
      setCachedRecItems(name, res.data);
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return cachedData;
};

export default getRecommendedItemListAPI;
