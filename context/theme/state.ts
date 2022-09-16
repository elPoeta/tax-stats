import { IDispatch } from "../../interfaces/IDispatch";
import { IThemeState } from "../../interfaces/IThemeContext";

type ActionThemeType = { MODE: string; RESET: string };

const themeActions: ActionThemeType = {
  MODE: "MODE",
  RESET: "RESET",
};

const initialState: IThemeState = {
  colorTheme: "dark",
};

const reducer = (state: IThemeState, action: IDispatch) => {
  const { type, data } = action;

  switch (type) {
    case themeActions.MODE:
      return { ...state, ...data };
    case themeActions.RESET:
      return initialState;
    default:
      return state;
  }
};

export { themeActions, initialState, reducer };
