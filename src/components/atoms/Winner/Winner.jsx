import React, { useContext } from "react";
import { PlayerContext } from "../../../providers/ContextProvider";
import { Color } from "./Winner.styles";

const Winner = () => {
  const { player } = useContext(PlayerContext);

  return <Color color={player}></Color>;
};

export default Winner;
