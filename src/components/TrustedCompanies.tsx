"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ResponsiveGrid from "./ResponsiveGrid";
import GradientText from "./GradientText";
import { useTheme } from "@emotion/react";

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
    link: "https://softshalanepal.com/",
    image: "softshala.png",
  },
];

const TrustedCompanies = () => {
  return (
    <ResponsiveGrid sx={{ my: "20px" }}>
      <Typography textAlign="center" variant="h4" component="h4" gutterBottom>
        <GradientText>Trusted by Companies</GradientText>
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        mt={4}
      >
        {companies.map((company) => (
          <Box
            key={company.link}
            sx={{
              width: { xs: "40%", sm: 120 },
              maxWidth: 120 * 2,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              bgcolor: "#fefefe",
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
              }}
            >
              <img
                src={`/${company.image}`}
                alt={company.link}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  padding: "5px",
                  objectFit: "contain",
                }}
              />
            </a>
          </Box>
        ))}
      </Stack>
    </ResponsiveGrid>
  );
};

export default TrustedCompanies;
