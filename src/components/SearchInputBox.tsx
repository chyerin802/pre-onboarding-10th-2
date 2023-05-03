import React, { useEffect, useRef, useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import getRecommendedItemListAPI from '@api/recommendedItem';
import { RecItem } from '@type/recommendedItem';
import RecommendedItemList from './RecommendedItemList';

function SearchInputBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [recommendedItems, setRecommendedItems] = useState<RecItem[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedItem, setSelectedItem] = useState(-1);

  // 검색어 input값의 변화를 다루는 onChange 핸들러 함수
  const changeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const newWord = event.target.value.trim();
    setSearchWord(event.target.value);

    try {
      if (newWord.length !== 0) {
        const res = await getRecommendedItemListAPI(newWord);
        setRecommendedItems(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 검색어 form 제출 시 실행되는 onSubmit 핸들러 함수
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (searchWord.trim().length === 0) return;
    console.log(searchWord);
  };

  // 검색어 목록 아이템 위아래 화살표로 이동 가능하도록 하는 onKeyUp 핸들러 함수
  const keyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (recommendedItems.length > 0) {
      const navigationKeys = ['ArrowUp', 'ArrowDown'];
      const lastItem = recommendedItems.length - 1;
      let nextItem = selectedItem;

      if (navigationKeys.includes(event.key)) {
        event.preventDefault();
        if (event.key === 'ArrowUp') {
          nextItem = selectedItem === 0 ? lastItem : nextItem - 1;
        } else if (event.key === 'ArrowDown') {
          nextItem = selectedItem === lastItem ? 0 : nextItem + 1;
        }
        setSearchWord(recommendedItems[nextItem].name);
        setSelectedItem(nextItem);
      }
    }
  };

  // 추천검색어 클릭 시 검색어 (searchWord) 변경 onClick 핸들러 함수
  const clickHandler = (itemIndex: number) => {
    setSelectedItem(itemIndex);
    setSearchWord(recommendedItems[itemIndex].name);
  };

  // 처음 렌더링 시 input 창에 focus
  useEffect(() => {
    searchInputRef.current!.focus();
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="word">search icon</label>
        <input
          type="text"
          id="word"
          ref={searchInputRef}
          value={searchWord}
          onChange={changeHandler}
          onKeyUp={keyUpHandler}
        />
        <button type="submit">검색</button>
      </form>
      <RecommendedItemList items={recommendedItems} selectedItem={selectedItem} selectItem={clickHandler} />
    </div>
  );
}

export default SearchInputBox;
