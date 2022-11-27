import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  height: 80%;
  width: 80%;
  background-color: ${({ theme, color }) => {
    if (color === "red") return theme.colors.red;
    if (color === "yellow") return theme.colors.yellow;
    return theme.colors.lightBlue;
  }};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.black};
  overflow: hidden;
  transition: background-color 0.2s;

  &::after {
    content: "";
    position: absolute;
    top: 15%;
    bottom: 20%;
    width: 100%;
    background-color: ${({ theme, color }) => {
      if (color === "red") return theme.colors.red;
      if (color === "yellow") return theme.colors.yellow;
      return theme.colors.lightBlue;
    }};
    border-radius: 50%;
    transition: background-color 0.1s;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 60%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shadow};
  }
`;
