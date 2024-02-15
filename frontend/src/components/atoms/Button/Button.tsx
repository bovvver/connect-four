import { Wrapper } from "./Button.styles";
import { ButtonProps } from "@interfaces/componentProps";

const Button = ({ icon, onClick, content, color } : ButtonProps) => {
  return (
    <Wrapper color={color} onClick={onClick}>
      {icon} {content}
    </Wrapper>
  );
};

export default Button;
