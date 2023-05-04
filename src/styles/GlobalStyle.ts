import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    line-height: 1.5;
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  button{
    cursor: pointer;
    background: none;
    border: none;
  }

  a{
    text-decoration: none;

    &:visited{
      text-decoration: none;
      color: none;
    }
  }

  li{
    list-style: none;
  }
  
  .App{
    width:100%;
    min-height: 100vh;
  }

  :root {
    /** color */
    --bg-color: #D0E8FD;
  }         
`;

export default GlobalStyle;
