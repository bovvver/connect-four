import { useContext } from "react";
import Column from "@components/molecules/Column/Column";
import { Wrapper, BoardBody, BoardWrapper } from "./Board.styles";
import Navigation from "@components/molecules/Navigation/Navigation";
import InformationTable from "@components/molecules/InformationTable/InformationTable";
import Scoreboard from "@components/molecules/Scoreboard/Scoreboard";
import { GameContext } from "@providers/ContextProvider";

const Board = () => {
  const { modalVisibility } = useContext(GameContext);

  return (
    <Wrapper>
      <Navigation />
      <InformationTable
        style={
          modalVisibility
            ? { opacity: 1 }
            : { opacity: 0, pointerEvents: "none" }
        }
      />
      <BoardWrapper>
        <BoardBody style={modalVisibility ? { pointerEvents: "none" } : {}}>
          <Column column={0} />
          <Column column={1} />
          <Column column={2} />
          <Column column={3} />
          <Column column={4} />
          <Column column={5} />
          <Column column={6} />
        </BoardBody>
        <Scoreboard />
      </BoardWrapper>
    </Wrapper>
  );
};

export default Board;
