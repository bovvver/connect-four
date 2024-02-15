import { TileProps } from "@interfaces/componentProps";
import { useContext } from "react";
import { TileBody } from "./Tile.styles";
import TileWindow from "@components/atoms/TileWindow/TileWindow";
import { TileColors } from "@providers/ContextProvider";

const Tile = ({ row, column }: TileProps) => {
  const { colorArray } = useContext(TileColors);

  return (
    <TileBody>
      <TileWindow color={colorArray[column][row]} />
    </TileBody>
  );
};

export default Tile;
