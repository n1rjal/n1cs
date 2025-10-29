"use client";

import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion, useReducedMotion } from "framer-motion";
import GradientText from "./GradientText";
import ResponsiveGrid from "./ResponsiveGrid";
import InView from "./motion/InView";
import { hoverScaleSubtle } from "./motion/MotionUtils";

const companies = [
  {
    link: "https://morgenland-teppiche.de",
    image: "morgenland-teppiche.png",
  },
  {
    link: "https://cleanilo.de",
    image: "cleanilo.svg",
  },
  {
    link: "https://hyteno.com",
    image: "hyteno.png",
  },
  {
    link: "https://nutrogen.io",
    image: "nutrogen.svg",
  },
  {
    link: "https://meropadhai.com/",
    image: "mero-padhai.svg",
  },
  {
    link: "https://givewheel.com/",
    image: "gw-logo.png",
  },
];

const TrustedCompanies = () => {
  const theme = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <ResponsiveGrid sx={{ my: "20px" }}>
      <InView>
        <Typography textAlign="center" variant="h4" component="h4" gutterBottom>
          <GradientText>Trusted by Companies</GradientText>
        </Typography>
      </InView>

      <InView stagger={0.08}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          {companies.map((company) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={company.link}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : hoverScaleSubtle}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    bgcolor: "#fefefe",
                    p: 1,
                    boxShadow: theme.shadows[1],
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/${company.image}`}
                      alt={company.link}
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </InView>
    </ResponsiveGrid>
  );
};

export default TrustedCompanies;
