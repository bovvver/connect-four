import React from "react";
import Button from "../../atoms/Button/Button";
import { Wrapper } from "./ModeSelectForm.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../../atoms/Input/Input";

const ModeSelectForm = ({
  isGameModeFormOpen,
  isNewGameSelected,
  formStateHandler,
}) => {
  const closeForm = () => {
    formStateHandler(true, false);
  };

  return (
    <Wrapper isGameModeFormOpen={isGameModeFormOpen}>
      <Input placeholder="Your nickname" type="text" />
      {isNewGameSelected ? null : (
        <Input placeholder="Room code" type="password" />
      )}
      <Button icon={<FontAwesomeIcon icon={faCirclePlay} />} content="start" />
      <Button
        icon={<FontAwesomeIcon icon={faCircleXmark} />}
        content="back"
        onClick={closeForm}
      />
    </Wrapper>
  );
};

export default ModeSelectForm;
