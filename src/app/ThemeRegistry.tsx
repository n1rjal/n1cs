"use client";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { createContext, useState, useMemo } from "react"; // Removed useEffect
import { createCustomTheme } from "./theme";

const emotionCache = createCache({ key: "mui" });

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeRegistry(props: { children: React.ReactNode }) {
  const { children } = props;

  // Initialize mode based on localStorage only on the client
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const storedMode = localStorage.getItem("colorMode") as "light" | "dark";
      if (storedMode) {
        return storedMode;
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
    }
    return "light"; // Default for server render or if no preference
  });

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

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${emotionCache.key} ${Object.keys(emotionCache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(emotionCache.inserted).join(" "),
        }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
