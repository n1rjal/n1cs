"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

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
    image: "hyteno.webp",
  },
  {
    link: "https://nutrogen.io",
    image: "nutrogen.png",
  },
  {
    link: "https://lancemeup.com",
    image: "lmu.png",
  },
  {
    link: "https://softshalanepal.com/",
    image: "softshala.png",
  },
];

const TrustedCompanies = () => {
  return (
    <Container>
      <Typography align="center" variant="h4" component="h4" gutterBottom>
        Trusted by Companies
      </Typography>
      <Stack
        direction="row"
        spacing={4}
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
              maxWidth: 120,
              height: 60,
              position: "relative",
            }}
          >
            <a href={company.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={`/${company.image}`}
                alt={company.link}
                fill
                style={{ objectFit: "contain" }}
              />
            </a>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default TrustedCompanies;
