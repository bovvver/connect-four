import { PlayerNames } from "enums/PlayerNames";
import { TileState } from "enums/TileState";

export interface BoardContextProps {
    board: TileState[][],
    handleBoardChange: (newBoard: TileState[][]) => void,
}

type WinCount = {
  player1: number,
  player2: number
}

export interface PlayerContextProps {
    player: PlayerNames,
    winCount: WinCount,
    setPlayer: (player: PlayerNames) => void,
    setWinCount: (winCount: WinCount) => void,
}

export interface GameContextProps {
  modalVisibility: boolean,
  handleModalVisibility: () => void,
  draw: boolean,
}