import React, { useEffect, useRef } from 'react';
import RecommendedItemList from './RecommendedItemList';

function SearchInputBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 처음 렌더링 시 input 창에 focus
  useEffect(() => {
    searchInputRef.current!.focus();
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="word">search icon</label>
        <input type="text" id="word" ref={searchInputRef} />
        <button type="submit">검색</button>
      </form>
      <RecommendedItemList />
    </div>
  );
}

export default SearchInputBox;
