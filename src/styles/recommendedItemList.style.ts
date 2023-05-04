import styled from 'styled-components';

export const RecommendedItemsBox = styled.div`
  background-color: white;
  width: 30rem;
  margin-top: 0.5rem;
  border-radius: 1.5rem;
  min-height: 10rem;
  overflow: scroll;
  > ul {
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    max-height: calc((1.6rem + 1rem) * 7);
  }

  .recommed__text {
    padding-left: 1.5rem;
    padding-top: 1rem;
    font-weight: 600;
    color: #a7afb7;
    font-size: 0.8rem;
  }

  > p {
    padding-left: 1.5rem;
    padding-top: 1rem;
    font-size: 1rem;
  }
`;

export const RecommendedItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;

  &.selected {
    background: #a7afb7;
  }

  > span {
    margin-left: 0.5rem;
  }
`;
