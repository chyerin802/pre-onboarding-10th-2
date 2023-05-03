// eslint-disable-next-line no-promise-executor-return
const wait = (timeToDelay: number) => new Promise(resolve => setTimeout(resolve, timeToDelay));

const dummyItems = [
  {
    name: '갑상선암',
    id: 4373,
  },
  {
    name: '갑상선염',
    id: 4376,
  },
];

const getRecommendedItemListAPI = async (word: string) => {
  console.log(word, ' 가져올거임');
  try {
    await wait(3000);
    return dummyItems;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default getRecommendedItemListAPI;
