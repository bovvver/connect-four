import React, { useState } from "react";
import { Wrapper, StyledIcon } from "./Main.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  faCirclePlay,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import ModeSelectScreen from "../../components/organisms/ModeSelectScreen/ModeSelectScreen";

const Main = () => {
  const [isGameModeFormOpen, setIsGameModeFormOpen] = useState({
    modeForm: false,
    userForm: false,
  });
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  const handleFormsState = (modeForm, userForm) => {
    setIsGameModeFormOpen({ modeForm: modeForm, userForm: userForm });
  };

  return (
    <Wrapper>
      <ModeSelectScreen
        isGameModeFormOpen={isGameModeFormOpen}
        formStateHandler={handleFormsState}
      />
      <StyledIcon icon={faCircleHalfStroke} />
      <Button
        icon={<FontAwesomeIcon icon={faCirclePlay} />}
        content="play"
        onClick={() => {
          handleFormsState(true, false);
        }}
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
