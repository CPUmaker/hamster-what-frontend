import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkModeEnabled, setDarkMode] = useState(
    Appearance.getColorScheme() === "dark"
  );

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === "dark");
      console.log("colorScheme: " + colorScheme);
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkModeEnabled,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
