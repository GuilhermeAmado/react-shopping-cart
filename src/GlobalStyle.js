import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
  
  *,
  *::after,
  *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }

  html {
      font-family: Inter, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

      --english-green-color: #1B4D3E;
  }

  body {
      box-sizing: border-box;
  }
`;

export default GlobalStyle;
