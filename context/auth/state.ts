import { IAuthState } from "../../interfaces/IAuthContext";
import { IDispatch } from "../../interfaces/IDispatch";

const initialState: IAuthState = {
  authorized: false,
};
type ActionAuthType = { SIGN: string; RESET: string };

const authActions: ActionAuthType = {
  SIGN: "SIGN",
  RESET: "RESET",
};

const reducer = (state: IAuthState, action: IDispatch) => {
  const { type, data } = action;

  switch (type) {
    case authActions.SIGN:
      return { ...state, authorized: data.authorized };
    case authActions.RESET:
      return initialState;
    default:
      return state;
  }
};

export { authActions, initialState, reducer };
