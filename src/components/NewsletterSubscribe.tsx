"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GlowedLink from "./GlowedLink";
import GradientText from "./GradientText";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // 'loading', 'success', 'error'
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    setStatus("loading");
    setMessage("");

    const formData = new URLSearchParams();
    formData.append("EMAIL", email);
    // Mailchimp's hidden anti-bot field (f_id)
    // The value for f_id is usually empty for legitimate submissions
    formData.append("f_id", "00f0cfe1f0"); // Use the f_id from the provided URL
    formData.append("u", "b6088a7da5e588b35ee18a982"); // User ID from URL
    formData.append("id", "d89017e618"); // List ID from URL

    try {
      // Mailchimp typically uses JSONP, direct fetch might have CORS issues.
      // For a real application, a server-side proxy or a dedicated Mailchimp API client is recommended.
      // Here, we'll attempt a direct POST, which might be blocked by CORS.
      const response = await fetch(
        "https://nirjalpaudel.us22.list-manage.com/subscribe/post",
        {
          method: "POST",
          body: formData,
          mode: "no-cors", // Use 'no-cors' to prevent CORS preflight issues, but response will be opaque
        },
      );

      // Since mode is 'no-cors', response.ok will always be true and response.json() will fail.
      // We can't directly read the response from Mailchimp in this mode.
      // For proper feedback, a server-side proxy is almost always required for Mailchimp forms.
      // For demonstration, we'll assume success if no network error.
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
