import { Dispatch, useEffect, useState } from "react";

export const useDarkMode = (initialValue: string): [string, Dispatch<any>] => {
  const [theme, setTheme] = useState(initialValue);

  useEffect(() => {
    const root = window.document.documentElement;
    const color = theme === "dark" ? "light" : "dark";
    root.classList.remove(color);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return [theme, setTheme];
};
