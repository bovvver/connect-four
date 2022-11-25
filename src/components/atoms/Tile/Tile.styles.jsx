import styled from "styled-components";

export const TileBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  font-size: 2rem;
  background-color: ${({ theme, color }) => {
    if (color === "red") return theme.colors.red;
    if (color === "yellow") return theme.colors.yellow;
    return theme.colors.grey;
  }};
  border: 1px solid black;
`;
