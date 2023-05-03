import React from 'react';
import { RecItemListProps } from '@type/recommendedItem';
import RecommendedItem from '@styles/recommendedItemList.style';

function RecommendedItemList({ items }: RecItemListProps) {
  return (
    <div>
      {items.length === 0 ? (
        <p>검색어가 없습니다.</p>
      ) : (
        <ul>
          {items.map(item => (
            <RecommendedItem key={item.id}>{item.name}</RecommendedItem>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendedItemList;
