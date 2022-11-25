import React from "react";
import Column from "../../molecules/Column/Column";
import { BoardBody } from "./Board.styles";

const Board = () => {
  return (
    <BoardBody>
      <Column column={0} />
      <Column column={1} />
      <Column column={2} />
      <Column column={3} />
      <Column column={4} />
      <Column column={5} />
      <Column column={6} />
    </BoardBody>
  );
};

export default Board;
