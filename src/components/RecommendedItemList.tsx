import React from 'react';
import { RecItemListProps } from '@type/recommendedItem';
import { AiOutlineSearch } from 'react-icons/ai';
import * as S from '@styles/RecommendedItemList.style';

function RecommendedItemList({ items, selectedItem, selectItem, hoverItem }: RecItemListProps) {
  return (
    <S.RecommendedItemsBox>
      <div className="recommed__text">추천 검색어</div>
      {items.length === 0 ? (
        <p>검색어가 없습니다</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <S.RecommendedItem
              key={item.id}
              className={selectedItem === index ? 'selected' : ''}
              onClick={() => selectItem(index)}
              onMouseOver={() => hoverItem(index)}>
              <AiOutlineSearch />
              <span>{item.name}</span>
            </S.RecommendedItem>
          ))}
        </ul>
      )}
    </S.RecommendedItemsBox>
  );
}

export default RecommendedItemList;
