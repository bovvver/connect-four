import styled from "styled-components";
import mq from "@assets/responsiveDesign";

export const Wrapper = styled.button`
  padding: 0.5em 0;
  width: 9em;
  font-size: 1.5rem;
  background-color: ${({ theme, color }) => {
    if (color === "red") return theme.colors.red;
    if (color === "yellow") return theme.colors.yellow;
    return theme.colors.grey;
  }};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  ${mq[0]} {
    font-size: 2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }
`;
