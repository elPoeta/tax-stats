import { createContext } from "react";
import { IThemeContext } from "../../interfaces/IThemeContext";

import { initialState } from "./state";

const defaultCoantext: IThemeContext = {
  state: initialState,
  dispatch: ({}) => {},
};

export const ThemeContext = createContext<IThemeContext>(defaultCoantext);
