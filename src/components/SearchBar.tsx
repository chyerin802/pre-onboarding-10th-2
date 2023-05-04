import React, { useEffect, useRef, useState, ChangeEvent, FormEvent, KeyboardEvent, useCallback } from 'react';
import getRecommendedItemListAPI from '@api/recommendedItem';
import { RecItem } from '@type/recommendedItem';
import useDebounce from '@hooks/useDebounce';
import useOnClickOutside from '@hooks/useOnClickOutside';
import * as S from '@styles/SearchBar.style';
import { AiOutlineSearch } from 'react-icons/ai';
import RecommendedItemList from './RecommendedItemList';

const MAX_REC_ITEMS_LENGTH = 7;

function SearchBar() {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [recommendedItems, setRecommendedItems] = useState<RecItem[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedItem, setSelectedItem] = useState(-1);
  const [isRecommendListOpen, setIsRecommendListOpen] = useState(false);

  // searchBar 외부를 클릭하면 검색어 목록 닫힘
  useOnClickOutside(searchBarRef, () => {
    setIsRecommendListOpen(false);
  });
  const debouncedSearchWord = useDebounce(searchWord, 500);

  // 최종적으로 결정된 검색어에 해당하는 목록을 불러온다.
  const getRecommendItemsAsync = useCallback(async (word: string) => {
    const searchName = word.trim();
    try {
      if (searchName.length !== 0) {
        const res = await getRecommendedItemListAPI(searchName);
        setRecommendedItems(res.slice(0, MAX_REC_ITEMS_LENGTH));
      } else {
        setRecommendedItems([]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 검색어 input값의 변화를 다루는 onChange 핸들러 함수
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    setSelectedItem(-1);
  };

  // 검색어 form 제출 시 실행되는 onSubmit 핸들러 함수
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setSelectedItem(-1);
    getRecommendItemsAsync(searchWord);
  };

  // 검색어 목록 아이템 위아래 화살표로 이동 가능하도록 하는 onKeyUp 핸들러 함수
  const keyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (recommendedItems.length > 0) {
      const navigationKeys = ['ArrowUp', 'ArrowDown'];
      const lastItem = recommendedItems.length - 1;
      let nextItem = selectedItem;

      if (navigationKeys.includes(event.key)) {
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
    setSelectedItem(-1);
    setSearchWord(newWord);
    getRecommendItemsAsync(newWord);
  };

  const inputFocusHandler = () => setIsRecommendListOpen(true);

  // 추천 목록에 마우스 hover 했을 때 핸들러 함수
  const mouseOverHandler = (itemIndex: number) => {
    setSelectedItem(itemIndex);
  };

  // 검색어 변화에 따른 추천 검색어 요청
  useEffect(() => {
    if (selectedItem > -1) return;
    getRecommendItemsAsync(debouncedSearchWord);
  }, [debouncedSearchWord, getRecommendItemsAsync, selectedItem]);

  return (
    <S.SearchBar ref={searchBarRef}>
      <S.SearchForm onSubmit={submitHandler}>
        <S.SearchInputBox>
          <label htmlFor="word">
            <AiOutlineSearch />
          </label>
          <input
            type="text"
            id="word"
            autoComplete="off"
            placeholder="질환명을 입력해 주세요"
            value={searchWord}
            onChange={changeHandler}
            onKeyUp={keyUpHandler}
            onFocus={inputFocusHandler}
          />
        </S.SearchInputBox>
        <S.SearchFormBtn type="submit">
          <AiOutlineSearch />
        </S.SearchFormBtn>
      </S.SearchForm>
      {isRecommendListOpen ? (
        <RecommendedItemList
          items={recommendedItems}
          selectedItem={selectedItem}
          selectItem={clickHandler}
          hoverItem={mouseOverHandler}
        />
      ) : null}
    </S.SearchBar>
  );
}

export default SearchBar;
