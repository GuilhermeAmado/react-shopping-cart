import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  :root {
    --text-dark: hsl(0, 0%, 25%);
    --text-light: hsl(0, 0%, 100%);
    --accent-color: hsla(334, 75%, 34%, 1);
    --accent-color25: hsla(334, 75%, 34%, 0.25);
    --accent-color50: hsla(334, 75%, 34%, 0.50);
    --accent-color75: hsla(334, 75%, 34%, 0.75);
    --primary-shadow: inset 0 -1px 0 #dcdcdc;
    --primary-border: 1px solid hsl(0, 0%, 80%);
    --warning-color50: hsla(43, 100%, 61%, 0.5);
    --success-color: hsl(170, 70%, 40%);
  }

  *,
  *::after,
  *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }

  html {
    font-family: 'Montserrat', sans-serif;
    overflow-y: scroll;
  }

  body {
      box-sizing: border-box;
      color: var(--text-dark);
  }

  a {
    color: inherit;
    text-decoration: none
  }

  .container {
    max-width: 620px;
    padding: 0 10px;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
