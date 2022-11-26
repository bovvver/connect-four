import React, { createContext, useState } from "react";

export const TileColors = createContext({
  colorArray: [],
  handleColorArray: () => {},
});

export const PlayerContext = createContext({
  player: "",
  handlePlayer: () => {},
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

  const checkTile = (column, n) => {
    if (n < 0) return;
    if (colorArray[column][n] !== null) return checkTile(column, n - 1);
    else return n;
  };

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
    let counter = 1;
    counter = checkWinner(counter, column, row + 1, 0, 1);

    if (counter >= 4) console.log("Vertical Win!");
  };

  const checkHorizontal = (column, row) => {
    let counter = 1;
    counter = checkWinner(counter, column + 1, row, 1, 0);
    counter += checkWinner(0, column - 1, row, -1, 0);

    if (counter >= 4) console.log("Horizontal Win!");
  };

  const checkDiagnonallyLeft = (column, row) => {
    let counter = 1;
    counter = checkWinner(counter, column + 1, row + 1, 1, 1);
    counter += checkWinner(0, column - 1, row - 1, -1, -1);

    if (counter >= 4) console.log("Diagnoally Left Win!");
  };

  const checkDiagnonallyRight = (column, row) => {
    let counter = 1;
    counter = checkWinner(counter, column + 1, row - 1, 1, -1);
    counter += checkWinner(0, column - 1, row + 1, -1, +1);

    if (counter >= 4) console.log("Diagnoally Right Win!");
  };

  const handleColorArray = (column) => {
    handlePlayer();
    const auxiliaryArray = [...colorArray];
    const row = checkTile(column, 5);

    auxiliaryArray[column][row] = player;
    setColorArray(auxiliaryArray);
    checkVertical(column, row);
    checkHorizontal(column, row);
    checkDiagnonallyLeft(column, row);
    checkDiagnonallyRight(column, row);
  };

  const handlePlayer = () => {
    if (player === "red") setPlayer("yellow");
    if (player === "yellow") setPlayer("red");
  };

  return (
    <TileColors.Provider value={{ colorArray, handleColorArray }}>
      <PlayerContext.Provider value={{ player, handlePlayer }}>
        {children}
      </PlayerContext.Provider>
    </TileColors.Provider>
  );
};

export default ContextProvider;
