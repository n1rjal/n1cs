
'use client';

import { useState } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GlowedLink from "./GlowedLink";
import GradientText from "./GradientText";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}. (This is a placeholder. Backend integration is required.)`);
    console.log(`Subscribed with: ${email}`);
    setEmail(''); // Clear the input
  };

  return (
    <Box sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2" gutterBottom align="center">
          <GradientText>Want more</GradientText> <GlowedLink href="/blog">blogs ?</GlowedLink> Checkout{" "}
          <GlowedLink href="/reading-list">reading lists</GlowedLink>
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Stay up-to-date with my latest projects, articles, and insights.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <TextField
            label="Your Email"
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" size="medium" color="secondary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
