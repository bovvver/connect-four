import { createContext, useState } from "react";

// CONTEXTS

export const GameContext = createContext({
  modalVisibility: false,
  handleModalVisibility: () => {},
  draw: false,
});

export const ButtonContext = createContext({
  handleGameReset: () => {},
  handlePlayAgain: () => {},
});


const ContextProvider = ({ children }) => {
  const [player, setPlayer] = useState("red");
  const [winCount, setWinCount] = useState({ player1: 0, player2: 0 });
  const [modalVisibility, setModalVisibility] = useState(false);
  const [draw, setDraw] = useState(false);

  // TILE CONTEXT

  const handleColorArray = (column) => {
    const auxiliaryArray = [...colorArray];
    const row = checkTile(column, 5);

    auxiliaryArray[column][row] = player;
    setColorArray(auxiliaryArray);
    checkConditions(column, row);
    checkBoard();
  };

  // GAME CONTEXT

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  // BUTTON CONTEXT

  const handleGameReset = () => {
    clearArray();
    setWinCount({ player1: 0, player2: 0 });
  };

  const handlePlayAgain = () => {
    clearArray();
    handleModalVisibility();
    setDraw(false);
  };

  // UTILS FUNCTIONS

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

  const checkTile = (column, n) => {
    if (n < 0) return;
    if (colorArray[column][n] !== null) return checkTile(column, n - 1);
    else {
      handlePlayer(n);
      return n;
    }
  };

  // COMPONENT RENDER

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
