import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.blue};

  button {
    margin-top: 2em;
    font-size: 2rem;
  }
`;

export const RulesBlock = styled.div`
  max-width: 700px;
  width: 90%;
  margin-top: 2em;
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.grey};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  border-radius: 15px;
`;

export const Rule = styled.p`
  padding: 0.5em 1em;
  font-size: 1.8rem;
  font-weight: bold;
`;
