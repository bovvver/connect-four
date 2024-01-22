import styled from "styled-components";
import mq from "../../assets/responsiveDesign";

export const Content = styled.p`
  padding-top: 1em;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;

  ${mq[0]} {
    font-size: 3rem;
  }
`;
