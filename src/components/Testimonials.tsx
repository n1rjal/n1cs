"use client";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import testimonials from "@/constants/testomonials";
import GradientText from "./GradientText";
import InView from "./motion/InView";

export default function Testimonials() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 12,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <InView>
          <Typography component="h2" variant="h3" gutterBottom>
            <GradientText>Testimonials</GradientText>
          </Typography>

          <Typography variant="body1" color="textSecondary">
            The best reflections of my work come from the people I&apos;ve
            worked with. Their words capture the craft, collaboration, and
            impact behind every project. Here are some of their experiences.
          </Typography>
        </InView>

        <InView stagger={0.1}>
          <Stack spacing={3} sx={{ mt: 4 }}>
            {testimonials.map((testimonial: any) => (
              <Box
                key={testimonial.author}
                component="figure"
                sx={{
                  m: 0,
                  p: { xs: 3, sm: 4 },
                  borderRadius: 2,
                  // soft tinted plate: no shadow, no border
                  bgcolor: "action.hover",
                }}
              >
                <FormatQuoteIcon
                  color="secondary"
                  sx={{ fontSize: "2.25rem", mb: 1, ml: -0.5 }}
                />
                <Typography
                  component="blockquote"
                  sx={{ m: 0, fontSize: "1.0625rem", lineHeight: 1.7 }}
                >
                  {testimonial.quote}
                </Typography>

                <Typography
                  component="figcaption"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2.5 }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {testimonial.author}
                  </Box>
                  {testimonial.position}
                </Typography>
              </Box>
            ))}
          </Stack>
        </InView>
      </Container>
    </Box>
  );
}
