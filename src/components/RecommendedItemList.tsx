import React from 'react';
import { RecItemListProps } from '@type/recommendedItem';
import RecommendedItem from '@styles/recommendedItemList.style';

function RecommendedItemList({ items, selectedItem, selectItem, hoverItem }: RecItemListProps) {
  return (
    <div>
      {items.length === 0 ? (
        <p>검색어가 없습니다.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <RecommendedItem
              key={item.id}
              className={selectedItem === index ? 'selected' : ''}
              onClick={() => selectItem(index)}
              onMouseOver={() => hoverItem(index)}>
              {item.name}
            </RecommendedItem>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendedItemList;
