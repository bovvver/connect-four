import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.blue};
`;

export const BoardBody = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  max-width: 650px;
  aspect-ratio: 1/0.9;
  padding: 0.5em 0.5em 2em;
  background-color: ${({ theme }) => theme.colors.grey};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  border-radius: 15px;
`;
