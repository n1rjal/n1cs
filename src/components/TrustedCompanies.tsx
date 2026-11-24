"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, useReducedMotion } from "framer-motion";
import ResponsiveGrid from "./ResponsiveGrid";
import InView from "./motion/InView";
import { hoverScaleSubtle } from "./motion/MotionUtils";

const companies = [
  {
    link: "https://ailytics.ai",
    image: "ailytics.webp",
    name: "Ailytics",
  },
  {
    link: "https://morgenland-teppiche.de",
    image: "morgenland-teppiche.png",
    name: "Morgenland Teppiche",
  },
  {
    link: "https://cleanilo.de",
    image: "cleanilo.svg",
    name: "Cleanilo",
  },
  {
    link: "https://hyteno.com",
    image: "hyteno.png",
    name: "Hyteno",
  },
  {
    link: "https://nutrogen.io",
    image: "nutrogen.svg",
    name: "Nutrogen",
  },
  {
    link: "https://meropadhai.com/",
    image: "mero-padhai.svg",
    name: "Mero Padhai",
  },
];

const TrustedCompanies = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ResponsiveGrid sx={{ mt: { xs: 10, md: 20 }, mb: { xs: 8, md: 10 } }}>
      <InView>
        <Typography
          textAlign="center"
          variant="overline"
          component="h2"
          color="text.secondary"
          sx={{ display: "block", letterSpacing: "0.2em" }}
        >
          Trusted by
        </Typography>
      </InView>

      <InView stagger={0.08}>
        <Box
          sx={{
            // 6 logos split evenly into rows of 2, 3 or 6, so there's never an orphan
            display: "grid",
            gridTemplateColumns: {
              // minmax(0, …) lets columns shrink below the logo images' natural width
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(6, minmax(0, 1fr))",
            },
            gap: 2,
            mt: 3,
            maxWidth: { xs: "400px", sm: "600px", md: "800px" },
            mx: "auto",
          }}
        >
          {companies.map((company) => (
            <motion.div
              key={company.link}
              whileHover={shouldReduceMotion ? {} : hoverScaleSubtle}
            >
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "2/1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  p: 1,
                  bgcolor: "transparent",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  // plate only appears on hover, so the colour logo is legible on dark bg
                  "&:hover": { bgcolor: "#fefefe", boxShadow: 3 },
                }}
              >
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    component="img"
                    src={`/${company.image}`}
                    alt={company.name}
                    sx={(t) => ({
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      // flat white silhouettes at rest, original colours on hover
                      // white silhouette on dark, black on light
                      filter:
                        t.palette.mode === "dark"
                          ? "brightness(0) invert(1)"
                          : "brightness(0)",
                      opacity: 0.45,
                      transition: "filter 0.3s, opacity 0.3s",
                      "a:hover > &": { filter: "none", opacity: 1 },
                    })}
                  />
                </a>
              </Box>
            </motion.div>
          ))}
        </Box>
      </InView>
    </ResponsiveGrid>
  );
};

export default TrustedCompanies;
