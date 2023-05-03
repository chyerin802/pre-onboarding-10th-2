export type RecItem = {
  name: string;
  id: number;
};

export type RecItemListProps = {
  items: RecItem[];
  selectedItem: number;
  selectItem: (selectIndex: number) => void;
};
