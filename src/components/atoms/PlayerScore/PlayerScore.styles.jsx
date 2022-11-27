import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  padding: 1em 2em;
  background-color: ${({ theme }) => theme.colors.grey};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  border-radius: 15px;
  font-weight: bold;
  text-align: center;

  &::before {
    content: "";
    height: 50%;
    aspect-ratio: 1/1;
    position: absolute;
    bottom: -1em;
    left: -1em;
    border: 3px solid ${({ theme }) => theme.colors.black};
    border-bottom: 6px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme, color }) => {
      if (color === "red") return theme.colors.red;
      if (color === "yellow") return theme.colors.yellow;
    }};
    border-radius: 50%;
  }
`;

export const PlayerName = styled.p`
  font-size: 1.8em;
`;

export const Score = styled.p`
  font-size: 2.5em;
`;
