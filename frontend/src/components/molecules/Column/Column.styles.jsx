import styled from "styled-components";
import mq from "../../../assets/responsiveDesign";

export const ColumnBody = styled.div`
  position: relative;
  height: 100%;
  width: 13%;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: -15%;
    left: 50%;
    background-color: ${({ theme }) => theme.colors.red};
    width: 50%;
    height: 3em;
    transform: translate(-50%, 0);
    border: 3px solid ${({ theme }) => theme.colors.black};
    border-top: 6px solid black;
    border-radius: 10px 10px 70px 70px;
    opacity: 0;

    ${mq[0]} {
      height: 4em;
      top: -10%;
    }
  }

  &:hover {
    outline: 2px solid ${({ theme }) => theme.colors.darkGrey};
    border-radius: 20px;

    &::before {
      opacity: 1;
    }
  }
`;
