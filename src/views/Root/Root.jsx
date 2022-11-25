import React from "react";
import { GlobalStyle } from "../../assets/globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "../../assets/theme";
import Board from "../../components/organisms/Board/Board";
import ContextProvider from "../../providers/ContextProvider";

const Root = () => {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Board />
      </ThemeProvider>
    </ContextProvider>
  );
};

export default Root;
