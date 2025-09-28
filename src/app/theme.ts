import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const createCustomTheme = (mode: "light" | "dark") => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // Gunmetal Grey inspired (Light mode)
            primary: {
              main: "#5a5a5a", // gunmetal grey
            },
            secondary: {
              main: "#ff6f00", // royal enfield orange stripe
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
              secondary: "#4f4f4f", // softer dark grey for secondary text
            },
            border: {
              primary: "#2f11f0",
            },
          }
        : {
            // Stealth Black inspired (Dark mode)
            primary: {
              main: "#e0e0e0", // metallic silver/white for primary elements
            },
            secondary: {
              main: "#ff8f00", // warm orange stripe accent (slightly brighter for dark mode)
            },
            error: {
              main: "#ef5350",
            },
            background: {
              paper: "#191A1A", // deep matte black background
              default: "#2a2a2a", // slightly lighter matte black for cards/paper
            },
            text: {
              primary: "#f5f5f5", // off-white for text
              secondary: "#bdbdbd", // light grey for secondary text
            },
            border: {
              primary: "#2f11f0",
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      h1: {
        fontSize: "3rem",
        fontWeight: 700,
        fontFamily: "Oswald, sans-serif",
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 700,
        fontFamily: "Oswald, sans-serif",
      },
      h3: {
        fontSize: "2rem",
        fontFamily: "Oswald, sans-serif",
        fontWeight: 600,
      },
      h4: {
        fontSize: "1.75rem",
        fontFamily: "Oswald, sans-serif",
        fontWeight: 600,
      },
      h5: {
        fontSize: "1.5rem",
        fontFamily: "Oswald, sans-serif",
        fontWeight: 500,
      },
      h6: {
        fontSize: "1.25rem",
        fontFamily: "Oswald, sans-serif",
        fontWeight: 500,
      },
      body1: { fontSize: "1rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.5 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
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
            color: mode === "dark" ? "#fff" : "#000",
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
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
