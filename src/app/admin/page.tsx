"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

// This component will handle the revalidation logic
function RevalidationManager() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRevalidate = async (path: string, type: string) => {
    setLoading(type);
    setError(null);
    setSuccess(null);

    // IMPORTANT: You must set this in your .env.local file
    const secret = process.env.NEXT_PUBLIC_REVALIDATION_TOKEN;

    if (!secret) {
      setError("Revalidation token is not set in environment variables.");
      setLoading(null);
      return;
    }

    try {
      const res = await fetch(`/api/revalidate?secret=${secret}&path=${path}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to revalidate");
      }

      setSuccess(
        `Successfully revalidated ${type}! The changes should be live.`,
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Content Revalidation
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Click a button to refresh the content of the specified pages. This
          will pull the latest data from Notion.
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={() => handleRevalidate("/blogs", "Blog Posts")}
            disabled={loading === "Blog Posts"}
          >
            {loading === "Blog Posts" ? "Refreshing..." : "Refresh Blog Posts"}
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRevalidate("/projects", "Projects")}
            disabled={loading === "Projects"}
          >
            {loading === "Projects" ? "Refreshing..." : "Refresh Projects"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleRevalidate("/", "Home Page")}
            disabled={loading === "Home Page"}
          >
            {loading === "Home Page" ? "Refreshing..." : "Refresh Home Page"}
          </Button>
        </Stack>
        {success && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

// The page component
export default function AdminPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <RevalidationManager />
    </Box>
  );
}
