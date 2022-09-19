import { createContext } from "react";
import { IAuthContext } from "../../interfaces/IAuthContext";
import { initialState } from "./state";

const defaultContext: IAuthContext = {
  state: initialState,
  dispatch: ({}) => {},
};

export const AuthContext = createContext(defaultContext);
