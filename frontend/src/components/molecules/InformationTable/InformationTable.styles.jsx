import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1em;
  position: absolute;
  top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  border-radius: 15px;
  font-weight: bold;
  z-index: 10;
  transition: opacity 0.1s;

  button {
    width: 10em;
  }
`;

export const PlayerName = styled.p`
  font-size: 2rem;
`;

export const Result = styled.p`
  font-size: 5.5rem;
  text-transform: uppercase;
`;
