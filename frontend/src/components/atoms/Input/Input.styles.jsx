import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 0.8em 0.5em;
  margin-top: 40px;
  max-width: 12em;
  width: 90%;
  font-size: 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-bottom: 6px solid ${({ theme }) => theme.colors.black};
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 30px;
  text-align: center;

  &:nth-of-type(1) {
    margin-top: 0;
  }
`;
