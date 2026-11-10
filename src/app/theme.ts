import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const createCustomTheme = (mode: "light" | "dark") => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Gunmetal Grey inspired (Light mode)
            primary: {
              main: "#3f3f46", // gunmetal grey
            },
            secondary: {
              main: "#c2410c", // burnt orange: 5.2:1 on light surfaces
            },
            error: {
              main: "#d32f2f",
            },
            background: {
              default: "#f2f2f2", // clean light grey background
              paper: "#fffefe", // white for cards/paper
            },
            text: {
              primary: "#212121", // dark grey for primary text
              secondary: "#52525b", // softer dark grey (7:1 on paper)
            },
          }
        : {
            // Stealth Black inspired (Dark mode)
            primary: {
              main: "#e0e0e0", // metallic silver/white for primary elements
            },
            secondary: {
              main: "#ffa040", // warm orange accent, brightened for dark mode
            },
            error: {
              main: "#ef5350",
            },
            background: {
              default: "#121314", // page background
              paper: "#1c1d1f", // raised surfaces sit lighter than the page
            },
            text: {
              primary: "#f5f5f5", // off-white for text
              secondary: "#b4b4bb", // light grey for secondary text
            },
          }),
    },
    typography: {
      fontFamily: ["var(--font-body)", "Playfair Display", "serif"].join(","),
      h1: {
        fontSize: "3rem",
        fontWeight: 700,
        fontFamily: "var(--font-heading), Montserrat, sans-serif",
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 700,
        fontFamily: "var(--font-heading), Montserrat, sans-serif",
      },
      h3: {
        fontSize: "2rem",
        fontFamily: "var(--font-heading), Montserrat, sans-serif",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.75rem",
        fontFamily: "var(--font-heading), Montserrat, sans-serif",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.5rem",
        fontFamily: "var(--font-heading), Montserrat, sans-serif",
        fontWeight: 500,
      },
      h6: {
        fontSize: "1.25rem",
        fontFamily: "var(--font-heading), Montserrat, sans-serif",
        fontWeight: 500,
      },
      body1: { fontSize: "1rem", lineHeight: 1.7 },
      body2: { fontSize: "0.875rem", lineHeight: 1.5 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "a:focus-visible, button:focus-visible, [role='button']:focus-visible, input:focus-visible":
            {
              outline: `3px solid ${mode === "dark" ? "#ffa040" : "#c2410c"}`,
              outlineOffset: "2px",
              borderRadius: 4,
            },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderBottom:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.12)" // White border for dark mode
                : "1px solid rgba(0, 0, 0, 0.12)", // Black border for light mode
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
          },
          containedSecondary: {
            color: mode === "dark" ? "#111" : "#fff",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: "24px",
            paddingBottom: "24px",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: false },
        styleOverrides: { root: { minHeight: 40 } },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
