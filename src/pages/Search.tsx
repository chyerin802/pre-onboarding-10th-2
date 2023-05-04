import React from 'react';
import SearchBar from '@components/SearchBar';
import SearchLayOut from '@styles/SearchLayout';

function Search() {
  return (
    <SearchLayOut>
      <h1>
        국내 모든 임상 시험 검색하고 <br />
        온라인으로 참여하기
      </h1>
      <SearchBar />
    </SearchLayOut>
  );
}

export default Search;
