import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledFont = styled(FontAwesomeIcon)`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.yellow};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
`;
