type LocalItemWithExpiry = {
  value: any;
  expiry: number;
};

const getLocalStorageItem = (key: string) => localStorage.getItem(key);
const setLocalStorageItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

function setLocalItemListWithExpiry(key: string, value: any, ttl: number) {
  const prevLocalItemList = getLocalStorageItem(key);
  let newLocalItemList = [];
  const now = new Date();

  if (prevLocalItemList) newLocalItemList = JSON.parse(prevLocalItemList);
  setLocalStorageItem(key, [...newLocalItemList, { value, expiry: now.getTime() + ttl }]);
}

function getLocalItemListWithExpiry<T>(key: string, findCallback: (value: T) => boolean) {
  const prevLocalItemList = getLocalStorageItem(key);

  if (prevLocalItemList) {
    const newLocalItemList: LocalItemWithExpiry[] = JSON.parse(prevLocalItemList);

    const findItemIdx = newLocalItemList?.findIndex((item: LocalItemWithExpiry) => findCallback(item.value));

    if (findItemIdx === -1) return;

    const now = new Date();

    if (now.getTime() > newLocalItemList[findItemIdx].expiry) {
      newLocalItemList.splice(findItemIdx, 1);
      setLocalStorageItem(key, newLocalItemList);
    } else {
      return newLocalItemList[findItemIdx].value;
    }
  }
}

export { getLocalStorageItem, setLocalStorageItem, setLocalItemListWithExpiry, getLocalItemListWithExpiry };
