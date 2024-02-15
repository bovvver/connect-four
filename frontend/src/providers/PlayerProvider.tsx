import { PlayerContextProps } from "@interfaces/providersProps";
import { PlayerNames } from "enums/PlayerNames";
import { useState, createContext, ReactNode } from "react";

export const PlayerContext = createContext<PlayerContextProps>({
  player: PlayerNames.PLAYER1,
  winCount: {
    player1: 0,
    player2: 0,
  },
  setPlayer: () => {},
  setWinCount: () => {},
});

const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<PlayerNames>(PlayerNames.PLAYER1);
  const [winCount, setWinCount] = useState({ player1: 0, player2: 0 });

  return (
    <PlayerContext.Provider
      value={{ player, winCount, setPlayer, setWinCount }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
