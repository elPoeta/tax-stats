import { Dispatch } from "react";
import { IDispatch } from "./IDispatch";

export interface IThemeState {
  colorTheme: string;
}

export interface IThemeContext {
  state: IThemeState;
  dispatch: Dispatch<IDispatch>;
}
