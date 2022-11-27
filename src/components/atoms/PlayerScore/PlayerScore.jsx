import React from "react";
import { Wrapper, PlayerName, Score } from "./PlayerScore.styles";

const PlayerScore = ({ color, name, score }) => {
  return (
    <Wrapper color={color}>
      <PlayerName>{name}</PlayerName>
      <Score>{score}</Score>
    </Wrapper>
  );
};

export default PlayerScore;
