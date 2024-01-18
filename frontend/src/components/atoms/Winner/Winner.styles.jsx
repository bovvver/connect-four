import styled from "styled-components";

export const Color = styled.div`
  width: 10em;
  height: 10em;
  background-color: ${({ theme, color }) => {
    if (color === "red") return theme.colors.red;
    if (color === "yellow") return theme.colors.yellow;
    return theme.colors.grey;
  }};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  transition: background-color 0.1s;
`;
