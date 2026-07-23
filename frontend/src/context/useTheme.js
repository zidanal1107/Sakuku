// src/context/useTheme.js
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme harus digunakan di dalam <ThemeProvider>");
  }
  return context;
};
