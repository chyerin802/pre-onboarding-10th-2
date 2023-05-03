const getLocalStorageItem = (key: string) => localStorage.getItem(key);
const setLocalStorageItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));

export { getLocalStorageItem, setLocalStorageItem };
