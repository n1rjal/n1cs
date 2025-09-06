"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";
import { createContext, useMemo, useState } from "react";
import { createCustomTheme } from "./theme";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeRegistry(props: { children: React.ReactNode }) {
  const { children } = props;

  // Initialize mode based on localStorage only on the client
  const [clientLoaded, setClientLoaded] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");

  React.useEffect(() => {
    const storedMode = localStorage.getItem("colorMode") as "light" | "dark";
    if (storedMode) {
      setMode(storedMode);
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
    setClientLoaded(true);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  if (!clientLoaded) return <></>;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
