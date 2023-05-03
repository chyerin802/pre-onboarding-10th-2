import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import RecommendedItemList from '@components/recommendedItemList';

const dummyItems = [
  {
    name: '갑상선암',
    id: 4373,
  },
  {
    name: '갑상선염',
    id: 4376,
  },
];

function SearchInputBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchWord, setSearchWord] = useState('');

  // 검색어 input값의 변화를 다루는 onChange 핸들러 함수
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  // 검색어 form 제출 시 실행되는 onSubmit 핸들러 함수
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (searchWord.trim().length === 0) return;
    console.log(searchWord);
  };

  // 처음 렌더링 시 input 창에 focus
  useEffect(() => {
    searchInputRef.current!.focus();
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="word">search icon</label>
        <input type="text" id="word" ref={searchInputRef} value={searchWord} onChange={changeHandler} />
        <button type="submit">검색</button>
      </form>
      <RecommendedItemList items={dummyItems} />
    </div>
  );
}

export default SearchInputBox;
