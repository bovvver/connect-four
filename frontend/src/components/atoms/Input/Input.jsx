import React from "react";
import { StyledInput } from "./Input.styles";

const Input = ({ placeholder, type }) => {
  return <StyledInput placeholder={placeholder} type={type} />;
};

export default Input;
