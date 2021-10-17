import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "../theme";

function BroccoliApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Merriweather:wght@400;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default BroccoliApp;
