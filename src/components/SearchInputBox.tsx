import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import RecommendedItemList from './RecommendedItemList';

function SearchInputBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState('');

  // 검색어 input값의 변화를 다루는 onChange 핸들러 함수
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  // 처음 렌더링 시 input 창에 focus
  useEffect(() => {
    searchInputRef.current!.focus();
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="word">search icon</label>
        <input type="text" id="word" ref={searchInputRef} value={searchWord} onChange={changeHandler} />
        <button type="submit">검색</button>
      </form>
      <div>{searchWord}</div>
      <RecommendedItemList />
    </div>
  );
}

export default SearchInputBox;
