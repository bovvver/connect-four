import React, { useContext } from "react";
import { Wrapper } from "./Scoreboard.styles";
import PlayerScore from "../../atoms/PlayerScore/PlayerScore";
import Winner from "../../atoms/Winner/Winner";
import { PlayerContext } from "../../../providers/ContextProvider";

const Scoreboard = () => {
  const { winCount } = useContext(PlayerContext);

  return (
    <Wrapper>
      <PlayerScore color="red" name="Player 1" score={winCount.player1} />
      <Winner />
      <PlayerScore color="yellow" name="Player 2" score={winCount.player2} />
    </Wrapper>
  );
};

export default Scoreboard;
