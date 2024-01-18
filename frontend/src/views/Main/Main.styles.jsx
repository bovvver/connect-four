import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  overflow: hidden;

  button {
    margin-top: 1em;
    font-size: 4rem;
    max-width: 90%;
  }
`;

export const changeColor = keyframes`
    from {
        color: #FFCE67;
    } 
    
    to {
        color: #FB6685;
    }
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 10rem;
  color: ${({ theme }) => theme.colors.yellow};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 50%;
  transition: color 0.3s;
  animation: ${changeColor} 1s ease-in-out infinite alternate;
`;
