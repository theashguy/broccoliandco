import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    font-family: 'Lato', sans-serif;
  }

  #__next {
    background: white;
    padding: 0;
    margin: 0;
    height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
  }
`;

const theme = {
  colors: {
    primary: "#c7c890",
    base: "#FFF",
    header: "orange",
  },
  padding: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
    jumbo: "2rem",
  },
  layers: {
    base: 1,
    mask: 100,
  },
};

export { theme, GlobalStyle };
