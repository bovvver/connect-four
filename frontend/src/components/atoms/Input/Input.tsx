import { InputProps } from "@interfaces/componentProps";
import { StyledInput } from "./Input.styles";

const Input = ({ placeholder, type }: InputProps) => {
  return <StyledInput placeholder={placeholder} type={type} />;
};

export default Input;
