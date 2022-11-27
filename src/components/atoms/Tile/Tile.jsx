import React, { useContext } from "react";
import { TileBody } from "./Tile.styles";
import TileWindow from "../TileWindow/TileWindow";
import { TileColors } from "../../../providers/ContextProvider";

const Tile = ({ row, column }) => {
  const { colorArray } = useContext(TileColors);

  return (
    <TileBody>
      <TileWindow color={colorArray[column][row]} />
    </TileBody>
  );
};

export default Tile;
