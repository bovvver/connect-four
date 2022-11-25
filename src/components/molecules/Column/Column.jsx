import React, { useContext } from "react";
import Tile from "../../atoms/Tile/Tile";
import { ColumnBody } from "./Column.styles";
import { TileColors } from "../../../providers/ContextProvider";

const Column = ({ column }) => {
  const { colorArray, handleColorArray } = useContext(TileColors);

  return (
    <ColumnBody
      onClick={() => {
        handleColorArray(column);
      }}
    >
      <Tile column={column} row={0} color={colorArray[column][0]} />
      <Tile column={column} row={1} color={colorArray[column][1]} />
      <Tile column={column} row={2} color={colorArray[column][2]} />
      <Tile column={column} row={3} color={colorArray[column][3]} />
      <Tile column={column} row={4} color={colorArray[column][4]} />
      <Tile column={column} row={5} color={colorArray[column][5]} />
    </ColumnBody>
  );
};

export default Column;
