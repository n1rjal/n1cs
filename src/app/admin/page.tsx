"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
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

  const handleRevalidateAll = async () => {
    setLoading("All Content");
    setError(null);
    setSuccess(null);

    const secret = process.env.NEXT_PUBLIC_REVALIDATION_TOKEN;

    if (!secret) {
      setError("Revalidation token is not set in environment variables.");
      setLoading(null);
      return;
    }

    const paths = [
      "/",
      "/blogs",
      "/blogs/[id]",
      "/projects",
      "/projects/[id]",
      "/deep-thoughts",
      "/deep-thoughts/[id]",
      "/books",
      "/books/[id]",
    ];

    try {
      const results = await Promise.all(
        paths.map((path) =>
          fetch(`/api/revalidate?secret=${secret}&path=${path}`),
        ),
      );

      const allSuccessful = results.every((res) => res.ok);

      if (!allSuccessful) {
        throw new Error("Some paths failed to revalidate");
      }

      setSuccess(
        "Successfully revalidated all content! All changes should be live.",
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Content Revalidation
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Click a button to refresh the content of the specified pages. This
          will pull the latest data from Notion.
        </Typography>

        {/* Refresh All Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={handleRevalidateAll}
            disabled={loading === "All Content"}
          >
            {loading === "All Content" ? "Refreshing All..." : "🔄 Refresh All Content"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Home Page */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Home Page
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleRevalidate("/", "Home Page")}
            disabled={loading === "Home Page"}
          >
            {loading === "Home Page" ? "Refreshing..." : "Refresh Home Page"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Blog Posts */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Blog Posts
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleRevalidate("/blogs", "Blog List")}
              disabled={loading === "Blog List"}
            >
              {loading === "Blog List" ? "Refreshing..." : "Refresh Blog List"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRevalidate("/blogs/[id]", "All Blog Details")}
              disabled={loading === "All Blog Details"}
            >
              {loading === "All Blog Details" ? "Refreshing..." : "Refresh All Blog Detail Pages"}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Projects */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Projects
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleRevalidate("/projects", "Project List")}
              disabled={loading === "Project List"}
            >
              {loading === "Project List" ? "Refreshing..." : "Refresh Project List"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRevalidate("/projects/[id]", "All Project Details")}
              disabled={loading === "All Project Details"}
            >
              {loading === "All Project Details" ? "Refreshing..." : "Refresh All Project Detail Pages"}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Deep Thoughts */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Deep Thoughts
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleRevalidate("/deep-thoughts", "Deep Thoughts List")}
              disabled={loading === "Deep Thoughts List"}
            >
              {loading === "Deep Thoughts List" ? "Refreshing..." : "Refresh Deep Thoughts List"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRevalidate("/deep-thoughts/[id]", "All Deep Thought Details")}
              disabled={loading === "All Deep Thought Details"}
            >
              {loading === "All Deep Thought Details" ? "Refreshing..." : "Refresh All Deep Thought Detail Pages"}
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Books */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Books
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => handleRevalidate("/books", "Books List")}
              disabled={loading === "Books List"}
            >
              {loading === "Books List" ? "Refreshing..." : "Refresh Books List"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRevalidate("/books/[id]", "All Book Details")}
              disabled={loading === "All Book Details"}
            >
              {loading === "All Book Details" ? "Refreshing..." : "Refresh All Book Detail Pages"}
            </Button>
          </Stack>
        </Box>

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
