import React, { useEffect, useRef, useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import getRecommendedItemListAPI from '@api/recommendedItem';
import { RecItem } from '@type/recommendedItem';
import useDebounce from '@hooks/useDebounce';
import RecommendedItemList from './RecommendedItemList';

function SearchInputBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [recommendedItems, setRecommendedItems] = useState<RecItem[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedItem, setSelectedItem] = useState(-1);

  const debouncedSearchWord = useDebounce(searchWord, 500);

  // 검색어 input값의 변화를 다루는 onChange 핸들러 함수
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    setSelectedItem(-1);
  };

  // 검색어 form 제출 시 실행되는 onSubmit 핸들러 함수
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (searchWord.trim().length === 0) return;
    alert(`${searchWord}를 검색함!`);
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

  // 추천검색어 클릭 시 해당 검색어 검색 onClick 핸들러 함수
  const clickHandler = (itemIndex: number) => {
    const newWord = recommendedItems[itemIndex].name;
    setSearchWord(newWord);
    alert(`${newWord}를 검색함!`);
  };

  // 추천 목록에 마우스 hover 했을 때 핸들러 함수
  const mouseOverHandler = (itemIndex: number) => {
    setSelectedItem(itemIndex);
  };

  // 처음 렌더링 시 input 창에 focus
  useEffect(() => {
    searchInputRef.current!.focus();
  }, []);

  // 검색어 변화에 따른 추천 검색어 요청
  useEffect(() => {
    // 최종적으로 결정된 검색어에 해당하는 목록을 불러온다.
    const getRecommendItemsAsync = async () => {
      const searchName = debouncedSearchWord.trim();
      try {
        if (searchName.length !== 0) {
          const res = await getRecommendedItemListAPI(searchName);
          setRecommendedItems(res);
        } else {
          setRecommendedItems([]);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (selectedItem > -1) return;
    getRecommendItemsAsync();
  }, [debouncedSearchWord, selectedItem]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="word">search icon</label>
        <input
          type="text"
          id="word"
          autoComplete="off"
          ref={searchInputRef}
          value={searchWord}
          onChange={changeHandler}
          onKeyUp={keyUpHandler}
        />
        <button type="submit">검색</button>
      </form>
      <div>{debouncedSearchWord}</div>
      <RecommendedItemList
        items={recommendedItems}
        selectedItem={selectedItem}
        selectItem={clickHandler}
        hoverItem={mouseOverHandler}
      />
    </div>
  );
}

export default SearchInputBox;
