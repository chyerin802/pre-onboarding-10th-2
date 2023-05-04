import styled from 'styled-components';

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 3rem;
  width: 30rem;
  padding: 0.5rem;
`;

export const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1rem;
  > label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
  > input {
    flex: 1;
    border: none;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }
`;

export const SearchFormBtn = styled.button`
  background: #3579e1;
  color: white;
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  > svg {
    font-size: 1.5rem;
  }
`;
