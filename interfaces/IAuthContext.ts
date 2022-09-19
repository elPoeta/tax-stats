import { Dispatch } from "react";
import { IDispatch } from "./IDispatch";

export interface IAuthState {
  authorized: boolean;
}

export interface IAuthContext {
  state: IAuthState;
  dispatch: Dispatch<IDispatch>;
}
