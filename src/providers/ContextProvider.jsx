import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
import React, { createContext, useState } from "react";

export const TileColors = createContext({
  colorArray: [],
  handleColorArray: () => {},
});

export const PlayerContext = createContext({
  player: "",
  handlePlayer: () => {},
  winCount: {
    player1: 0,
    player2: 0,
  },
  handleWin: () => {},
});

export const GameContext = createContext({
  modalVisibility: false,
  handleModalVisibility: () => {},
  draw: false,
});

export const ButtonContext = createContext({
  handleGameReset: () => {},
  handlePlayAgain: () => {},
});

const initialState = [];

for (let i = 0; i <= 6; i++) {
  initialState[i] = [];
  for (let j = 0; j <= 5; j++) {
    initialState[i][j] = null;
  }
}

const ContextProvider = ({ children }) => {
  const [colorArray, setColorArray] = useState(initialState);
  const [player, setPlayer] = useState("red");
  const [winCount, setWinCount] = useState({ player1: 0, player2: 0 });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [draw, setDraw] = useState(false);

  // winning conditions

  const checkWinner = (counter, column, row, colAddon, rowAddon) => {
    while (true) {
      if (colorArray[column] && colorArray[column][row] === player) {
        counter++;
        column += colAddon;
        row += rowAddon;
      } else {
        break;
      }
    }
    return counter;
  };

  const checkVertical = (column, row) => {
    let counter = checkWinner(1, column, row + 1, 0, 1);
    showWinner(counter);
  };

  const checkHorizontal = (column, row) => {
    let counter = checkWinner(1, column + 1, row, 1, 0);
    counter += checkWinner(0, column - 1, row, -1, 0);
    showWinner(counter);
  };

  const checkDiagnonallyLeft = (column, row) => {
    let counter = checkWinner(1, column + 1, row + 1, 1, 1);
    counter += checkWinner(0, column - 1, row - 1, -1, -1);
    showWinner(counter);
  };

  const checkDiagnonallyRight = (column, row) => {
    let counter = checkWinner(1, column + 1, row - 1, 1, -1);
    counter += checkWinner(0, column - 1, row + 1, -1, 1);
    showWinner(counter);
  };

  const showWinner = (counter) => {
    if (counter >= 4 && player === "red") {
      const newCount = winCount.player1 + 1;
      setWinCount({ ...winCount, player1: newCount });
      handleModalVisibility();
    }
    if (counter >= 4 && player === "yellow") {
      const newCount = winCount.player2 + 1;
      setWinCount({ ...winCount, player2: newCount });
      handleModalVisibility();
    }
  };

  const checkConditions = (column, row) => {
    checkVertical(column, row);
    checkHorizontal(column, row);
    checkDiagnonallyLeft(column, row);
    checkDiagnonallyRight(column, row);
  };

  const checkBoard = () => {
    let counter = 0;
    for (let i = 0; i <= 6; i++) {
      if (colorArray[i][0] !== null) counter++;
    }
    if (counter === 7) {
      setDraw(true);
      handleModalVisibility();
    }
  };

  // change player

  const handlePlayer = (n) => {
    if (n < 0) return;
    if (player === "red") setPlayer("yellow");
    if (player === "yellow") setPlayer("red");
  };

  //buttons

  const handlePlayAgain = () => {
    clearArray();
    handleModalVisibility();
    setDraw(false);
  };

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const clearArray = () => {
    const emptyArray = [];
    for (let i = 0; i <= 6; i++) {
      emptyArray[i] = [];
      for (let j = 0; j <= 5; j++) {
        emptyArray[i][j] = null;
      }
    }
    setColorArray(emptyArray);
  };

  const handleGameReset = () => {
    clearArray();
    setWinCount({ player1: 0, player2: 0 });
  };

  // actual game

  const checkTile = (column, n) => {
    if (n < 0) return;
    if (colorArray[column][n] !== null) return checkTile(column, n - 1);
    else {
      handlePlayer(n);
      return n;
    }
  };

  const handleColorArray = (column) => {
    const auxiliaryArray = [...colorArray];
    const row = checkTile(column, 5);

    auxiliaryArray[column][row] = player;
    setColorArray(auxiliaryArray);
    checkConditions(column, row);
    checkBoard();
  };

  return (
    <TileColors.Provider value={{ colorArray, handleColorArray }}>
      <PlayerContext.Provider value={{ player, handlePlayer, winCount }}>
        <ButtonContext.Provider value={{ handleGameReset, handlePlayAgain }}>
          <GameContext.Provider
            value={{ modalVisibility, handleModalVisibility, draw }}
          >
            {children}
          </GameContext.Provider>
        </ButtonContext.Provider>
      </PlayerContext.Provider>
    </TileColors.Provider>
  );
};

export default ContextProvider;
