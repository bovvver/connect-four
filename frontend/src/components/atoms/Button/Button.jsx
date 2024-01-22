import React from "react";
import { Wrapper } from "./Button.styles";

const Button = ({ icon, onClick, content, color }) => {
  return (
    <Wrapper color={color} onClick={onClick}>
      {icon} {content}
    </Wrapper>
  );
};

export default Button;
