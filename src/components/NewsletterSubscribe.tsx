"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import GlowedLink from "./GlowedLink";
import GradientText from "./GradientText";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    setStatus("loading");
    setMessage("");

    const formData = new URLSearchParams();
    formData.append("EMAIL", email);
    formData.append("f_id", "00f0cfe1f0");
    formData.append("u", "b6088a7da5e588b35ee18a982");
    formData.append("id", "d89017e618");

    try {
      const _response = await fetch(
        "https://nirjalpaudel.us22.list-manage.com/subscribe/post",
        {
          method: "POST",
          body: formData,
          mode: "no-cors", // Use 'no-cors' to prevent CORS preflight issues, but response will be opaque
        },
      );

      setStatus("success");
      setMessage("Subscription request sent!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        "Failed to send subscription request. Please try again later.",
      );
      console.error("Subscription error:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h5" component="h2" gutterBottom align="center">
          <GradientText>Want more</GradientText>{" "}
          <GlowedLink href="/blog">blogs ?</GlowedLink> Checkout{" "}
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
            disabled={status === "loading"}
          />
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={handleSubscribe}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </Stack>
        {message && (
          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              color: status === "error" ? "error.main" : "success.main",
            }}
          >
            {message}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
