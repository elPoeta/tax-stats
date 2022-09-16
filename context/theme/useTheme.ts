import { useContext } from "react";
import { IThemeContext } from "../../interfaces/IThemeContext";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => useContext<IThemeContext>(ThemeContext);