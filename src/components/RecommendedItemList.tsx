import React from 'react';
import { RecItemListProps } from '@type/recommendedItem';

function RecommendedItemList({ items }: RecItemListProps) {
  return (
    <div>
      {items.length === 0 ? (
        <p>검색어가 없습니다.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendedItemList;
