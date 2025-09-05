"use client";

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

interface BlogListPageProps {
  blogPosts: any[]; // Replace 'any[]' with your actual BlogPost[] type
}

const BlogListPageWrapper: React.FC<BlogListPageProps> = ({ blogPosts }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        color: theme.palette.text.primary, // Use theme text color
        borderRadius: 2,
        p: 3, // Add some padding
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: theme.palette.warning.main }}
        >
          {" "}
          {/* Orange accent for title */}
          All Blog Posts
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: theme.palette.background.paper, // Use theme paper background for cards
                  color: theme.palette.text.primary, // Use theme text color for cards
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {" "}
                    {/* Lighter grey for date */}
                    Published: {new Date(post.createdTime).toLocaleDateString()}
                  </Typography>
                  <Button
                    size="small"
                    component={Link}
                    href={`/blog/${post.id}`}
                    sx={{ color: theme.palette.warning.main }}
                  >
                    Read More
                  </Button>{" "}
                  {/* Orange button text */}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              No blog posts found. Please ensure your Notion database is set up
              correctly and has published posts.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default BlogListPageWrapper;
