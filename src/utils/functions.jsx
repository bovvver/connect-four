export const checkVertical = (column, row) => {
  let counter = checkWinner(1, column, row + 1, 0, 1);
  showWinner(counter);
};

export const checkHorizontal = (column, row) => {
  let counter = checkWinner(1, column + 1, row, 1, 0);
  counter += checkWinner(0, column - 1, row, -1, 0);
  showWinner(counter);
};

export const checkDiagnonallyLeft = (column, row) => {
  let counter = checkWinner(1, column + 1, row + 1, 1, 1);
  counter += checkWinner(0, column - 1, row - 1, -1, -1);
  showWinner(counter);
};

export const checkDiagnonallyRight = (column, row) => {
  let counter = checkWinner(1, column + 1, row - 1, 1, -1);
  counter += checkWinner(0, column - 1, row + 1, -1, 1);
  showWinner(counter);
};

export const showWinner = (counter) => {
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

export const checkConditions = (column, row) => {
  checkVertical(column, row);
  checkHorizontal(column, row);
  checkDiagnonallyLeft(column, row);
  checkDiagnonallyRight(column, row);
};

export const checkBoard = () => {
  let counter = 0;
  for (let i = 0; i <= 6; i++) {
    if (colorArray[i][0] !== null) counter++;
  }
  if (counter === 7) {
    setDraw(true);
    handleModalVisibility();
  }
};

export const clearArray = () => {
  const emptyArray = [];
  for (let i = 0; i <= 6; i++) {
    emptyArray[i] = [];
    for (let j = 0; j <= 5; j++) {
      emptyArray[i][j] = null;
    }
  }
  setColorArray(emptyArray);
};

export const checkTile = (column, n) => {
  if (n < 0) return;
  if (colorArray[column][n] !== null) return checkTile(column, n - 1);
  else {
    handlePlayer(n);
    return n;
  }
};
