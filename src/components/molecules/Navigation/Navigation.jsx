import React, { useContext } from "react";
import { StyledIcon } from "../../../views/Main/Main.styles";
import { Wrapper } from "./Navigation.styles";
import Button from "../../atoms/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { ButtonContext } from "../../../providers/ContextProvider";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { handleGameReset } = useContext(ButtonContext);
  const navigate = useNavigate();

  const handleClick = () => {
    handleGameReset();
    navigate("/");
  };

  return (
    <Wrapper>
      <Button
        icon={<FontAwesomeIcon icon={faCompass} />}
        content="menu"
        onClick={handleClick}
      />
      <StyledIcon icon={faCircleHalfStroke} />
      <Button
        icon={<FontAwesomeIcon icon={faArrowRotateRight} />}
        content="restart"
        onClick={handleGameReset}
      />
    </Wrapper>
  );
};

export default Navigation;
