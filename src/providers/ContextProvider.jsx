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

//   const checkVertical = () => {
//     let counter = 0;

//   };

  const checkWinner = (column, row) => {
    if (
      colorArray[column][row + 1] === player ||
      colorArray[column][row - 1] === player
    ) {
      checkVertical();
    }

    if (
      colorArray[column + 1][row] === player ||
      colorArray[column - 1][row] === player
    ) {
      checkHorizontal();
    }

    if (
      colorArray[column + 1][row + 1] === player ||
      colorArray[column - 1][row - 1] === player
    ) {
      checkDiagnonallyLeft();
    }

    if (
      colorArray[column + 1][row - 1] === player ||
      colorArray[column - 1][row + 1] === player
    ) {
      checkDiagnonallyRight();
    }
  };

  const handleColorArray = (column) => {
    handlePlayer();
    const auxiliaryArray = [...colorArray];
    const row = checkTile(column, 5);

    auxiliaryArray[column][row] = player;
    setColorArray(auxiliaryArray);
    checkWinner(column, row);
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
