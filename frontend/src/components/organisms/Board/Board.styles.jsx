import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const BoardWrapper = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const BoardBody = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  max-width: 550px;
  padding: 0.5em 0.5em 2em;
  background-color: ${({ theme }) => theme.colors.grey};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  border-radius: 15px;
`;
