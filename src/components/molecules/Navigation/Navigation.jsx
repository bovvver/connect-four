import React, { useContext } from "react";
import { Wrapper, StyledFont } from "./Navigation.styles";
import Button from "../../atoms/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { ButtonContext } from "../../../providers/ContextProvider";

const Navigation = () => {
  const { handleGameReset } = useContext(ButtonContext);

  return (
    <Wrapper>
      <Button icon={<FontAwesomeIcon icon={faCompass} />} content="menu" />
      <StyledFont icon={faCircleHalfStroke} />
      <Button
        icon={<FontAwesomeIcon icon={faArrowRotateRight} />}
        content="restart"
        onClick={handleGameReset}
      />
    </Wrapper>
  );
};

export default Navigation;
