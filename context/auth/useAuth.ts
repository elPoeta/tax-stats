import { useContext } from "react";
import { IAuthContext } from "../../interfaces/IAuthContext";
import { AuthContext } from "./AuthContext";

export const useAuth = () => useContext<IAuthContext>(AuthContext);
