import styled from "styled-components";
import { StyledIcon } from "../../../views/Main/Main.styles";

export const Wrapper = styled.div`
  height: 10vh;
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  ${StyledIcon} {
    font-size: 5rem;
  }
`;
