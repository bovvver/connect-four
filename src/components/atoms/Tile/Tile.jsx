import React from "react";
import { TileBody } from "./Tile.styles";

const Tile = ({ row, column, color }) => {
  return (
    <TileBody color={color}>
      {column} / {row}
    </TileBody>
  );
};

export default Tile;
