import React, { useContext } from "react";
import { Wrapper, PlayerName, Result } from "./InformationTable.styles";
import Button from "../../atoms/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import {
  ButtonContext,
  GameContext,
  PlayerContext,
} from "../../../providers/ContextProvider";

const InformationTable = ({ style }) => {
  const { player } = useContext(PlayerContext);
  const { handlePlayAgain } = useContext(ButtonContext);
  const { draw } = useContext(GameContext);

  let name = "";
  if (!draw) name = player !== "red" ? "Player 1" : "Player 2";

  return (
    <Wrapper style={style}>
      <PlayerName>{name}</PlayerName>
      <Result>{draw ? "draw" : "wins"}</Result>
      <Button
        icon={<FontAwesomeIcon icon={faCirclePlay} />}
        content="play again"
        color={player}
        onClick={handlePlayAgain}
      />
    </Wrapper>
  );
};

export default InformationTable;
