import { GlobalStyle } from "@assets/globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "@assets/theme";
import Board from "@components/organisms/Board/Board";
import Main from "@views/Main/Main";
import Rules from "@views/Rules/Rules";
import ContextProvider from "@providers/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

const Root = () => {
  return (
    <Router>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            <Route path="/connect-four/" element={<Main />} />
            <Route path="/connect-four/game" element={<Board />} />
            <Route path="/connect-four/rules" element={<Rules />} />
            <Route path="/connect-four/*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </ContextProvider>
    </Router>
  );
};

export default Root;
