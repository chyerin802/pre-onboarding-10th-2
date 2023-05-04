import styled from 'styled-components';

const SearchLayOut = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 5rem;
  background-color: var(--bg-color);

  > h1 {
    font-size: 2.125rem;
    font-weight: 700;
    letter-spacing: -0.018em;
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export default SearchLayOut;
