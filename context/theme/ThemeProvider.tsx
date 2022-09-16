import {  useEffect, useReducer } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import { IProps } from "../../interfaces/IProps";

import { themeActions, initialState, reducer } from "./state";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({children}:IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useDarkMode(typeof window !== "undefined" ? localStorage.theme : "dark");

  useEffect(() => {
    dispatch({ type: themeActions.MODE, data:{ colorTheme: theme }});
  },[theme,setTheme]);

  return (
    <ThemeContext.Provider value={{
       state,
       dispatch
    }}>
     {children}
    </ThemeContext.Provider>
  )
}