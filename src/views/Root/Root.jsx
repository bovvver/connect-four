import React from "react";
import { GlobalStyle } from "../../assets/globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "../../assets/theme";
import Board from "../../components/organisms/Board/Board";
import Main from "../Main/Main";
import Rules from "../Rules/Rules";
import ContextProvider from "../../providers/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Root = () => {
  return (
    <Router>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/game" element={<Board />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </ThemeProvider>
      </ContextProvider>
    </Router>
  );
};

export default Root;
