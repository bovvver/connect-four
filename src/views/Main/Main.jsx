import React from "react";
import { Wrapper, StyledIcon } from "./Main.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  faCirclePlay,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <Wrapper>
      <StyledIcon icon={faCircleHalfStroke} />
      <Button
        icon={<FontAwesomeIcon icon={faCirclePlay} />}
        content="play"
        onClick={() => handleClick("/connect-four/game")}
      />
      <Button
        icon={<FontAwesomeIcon icon={faClipboardList} />}
        content="rules"
        onClick={() => handleClick("/connect-four/rules")}
      />
    </Wrapper>
  );
};

export default Main;
