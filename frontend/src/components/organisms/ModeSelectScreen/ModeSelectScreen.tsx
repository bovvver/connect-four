import { useState } from "react";
import Button from "../../atoms/Button/Button";
import { Wrapper } from "./ModeSelectScreen.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePlus,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModeSelectForm from "../ModeSelectForm/ModeSelectForm";
import { ModeSelectScreenProps } from "@interfaces/componentProps";

const ModeSelectScreen = ({ isGameModeFormOpen, formStateHandler }: ModeSelectScreenProps) => {
  const [isNewGameSelected, setIsNewGameSelected] = useState(true);

  const goToUserForm = (isNewGameSelectedArg: boolean) => {
    setIsNewGameSelected(isNewGameSelectedArg);
    formStateHandler(true, true);
  };

  return (
    <Wrapper isGameModeFormOpen={isGameModeFormOpen.modeForm}>
      <ModeSelectForm
        isGameModeFormOpen={isGameModeFormOpen.userForm}
        isNewGameSelected={isNewGameSelected}
        formStateHandler={formStateHandler}
      />
      <Button
        icon={<FontAwesomeIcon icon={faCirclePlus} />}
        content="new game"
        onClick={() => goToUserForm(true)}
      />
      <Button
        icon={<FontAwesomeIcon icon={faCirclePlay} />}
        content="join game"
        onClick={() => goToUserForm(false)}
      />
      <Button
        icon={<FontAwesomeIcon icon={faCircleXmark} />}
        content="back"
        onClick={() => {
          formStateHandler(false, false);
        }}
      />
    </Wrapper>
  );
};

export default ModeSelectScreen;
