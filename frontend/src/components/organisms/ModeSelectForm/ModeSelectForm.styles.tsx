import styled from "styled-components";
import { StyledModeSelectProps } from "@interfaces/styledComponentProps";

export const Wrapper = styled.div<StyledModeSelectProps>`
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: ${({ isGameModeFormOpen }) => {
    return isGameModeFormOpen ? "0%" : "100%";
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.red};
  transition: bottom 0.3s;

  button {
    margin-top: 1em;
    font-size: 4rem;
    max-width: 90%;
  }
`;
