export interface ButtonProps {
  icon: JSX.Element;
  content: string;
  onClick?: () => void;
  color?: string;
}

export interface InputProps {
  placeholder: string;
  type: string;
}

export interface PlayerScoreProps {
  name: string;
  score: number;
  color: string;
}

export interface TileProps {
  row: number;
  column: number;
}

export interface InformationTableProps {
  style: Record<string, string | number>;
}

export interface ModelSelectFormProps {
  isGameModeFormOpen: boolean,
  isNewGameSelected: boolean,
  formStateHandler: (closeFirstMenu: boolean, closeSecondMenu: boolean) => void,
}

export interface ModeSelectScreenProps {
  isGameModeFormOpen: Record<string, boolean>, 
  formStateHandler: (closeFirstMenu: boolean, closeSecondMenu: boolean) => void,
}