import React from "react";
import { GlobalStyle } from "../../assets/globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "../../assets/theme";

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>root</div>
    </ThemeProvider>
  );
};

export default Root;
