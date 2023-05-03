import { RecItem } from '@type/recommendedItem';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage';

const CACHE_KEY_NAME = 'cachedRecItems';

type CachedRecItemsType = {
  word: string;
  data: RecItem[];
};

const getCachedRecItems = (word: string) => {
  const localCachedItems = getLocalStorageItem(CACHE_KEY_NAME);
  let cachedItems: CachedRecItemsType[] = [];

  if (localCachedItems) {
    cachedItems = JSON.parse(localCachedItems);
    return cachedItems?.find((item: CachedRecItemsType) => item.word === word)?.data;
  }
};

const cacheRecItems = (word: string, data: RecItem[]) => {
  const localCachedItems = getLocalStorageItem(CACHE_KEY_NAME);
  let cachedItems: CachedRecItemsType[] = [];

  if (localCachedItems) cachedItems = JSON.parse(localCachedItems);
  setLocalStorageItem(CACHE_KEY_NAME, [...cachedItems, { word, data }]);
};

export { getCachedRecItems, cacheRecItems };
