import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
  
  :root {
    --text-dark: hsl(0, 0%, 25%);
    --text-light: hsl(0, 0%, 100%);
    --accent-color: hsla(334, 75%, 34%, 1);
    --accent-color25: hsla(334, 75%, 34%, 0.25);
    --accent-color50: hsla(334, 75%, 34%, 0.50);
    --accent-color75: hsla(334, 75%, 34%, 0.75);
    --primary-shadow: inset 0 -1px 0 #dcdcdc;
    --primary-border: 1px solid hsl(0, 0%, 80%);
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
  }

  body {
      box-sizing: border-box;
      color: var(--text-dark);
  }
`;

export default GlobalStyle;