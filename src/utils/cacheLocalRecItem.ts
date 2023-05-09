import { RecItem } from '@type/recommendedItem';
import { getLocalItemListWithExpiry, setLocalItemListWithExpiry } from './localStorage';

const CACHE_KEY_NAME = 'cachedRecItems';
const CACHE_EXPIRE_TIME = 100000000;

type CachedRecItem = {
  word: string;
  data: RecItem[];
};

const getCachedRecItems = (word: string) => {
  const getValue = getLocalItemListWithExpiry(CACHE_KEY_NAME, (value: CachedRecItem) => value.word === word);
  return getValue?.data;
};

const setCachedRecItems = (word: string, data: RecItem[]) => {
  setLocalItemListWithExpiry(CACHE_KEY_NAME, { word, data }, CACHE_EXPIRE_TIME);
};

export { getCachedRecItems, setCachedRecItems };
