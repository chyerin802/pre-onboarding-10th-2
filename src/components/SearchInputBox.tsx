import React from 'react';
import RecommendedItemList from './RecommendedItemList';

function SearchInputBox() {
  return (
    <div>
      <form>
        <label htmlFor="word">search icon</label>
        <input type="text" id="word" />
        <button type="submit">검색</button>
      </form>
      <RecommendedItemList />
    </div>
  );
}

export default SearchInputBox;
