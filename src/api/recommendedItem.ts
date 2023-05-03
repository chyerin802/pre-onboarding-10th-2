import axios from 'axios';

const GET_REC_ITEMS_ENDPOINT = '/api/v1/search-conditions/';
const getRecommendedItemListAPI = async (name: string) => {
  try {
    const res = await axios.get(GET_REC_ITEMS_ENDPOINT, { params: { name } });
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default getRecommendedItemListAPI;
