import { BoardContextProps } from "@interfaces/providersProps";
import { TileState } from "enums/TileState";
import { useState, createContext, ReactNode, useEffect } from "react";

export const BoardContext = createContext<BoardContextProps>({
  board: [],
  handleBoardChange: () => {},
});

const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<TileState[][]>([]);

  useEffect(() => {
    const initialState: TileState[][] = [];
    for (let i = 0; i <= 6; i++) {
      initialState[i] = [];
      for (let j = 0; j <= 5; j++) {
        initialState[i][j] = TileState.EMPTY;
      }
    }
    handleBoardChange(initialState);
  }, []);

  const handleBoardChange = (newBoard: TileState[][]) => {
    setBoard(newBoard);
  };

  return (
    <BoardContext.Provider value={{ board, handleBoardChange }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
