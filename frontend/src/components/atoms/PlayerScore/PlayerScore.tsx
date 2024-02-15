import { PlayerScoreProps } from "@interfaces/componentProps";
import { Wrapper, PlayerName, Score } from "./PlayerScore.styles";

const PlayerScore = ({ color, name, score }: PlayerScoreProps) => {
  return (
    <Wrapper color={color}>
      <PlayerName>{name}</PlayerName>
      <Score>{score}</Score>
    </Wrapper>
  );
};

export default PlayerScore;
