"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import BlogHeader from "./BlogHeader";
import { BlogPost } from "@/lib/notion";

interface BlogListPageProps {
  blogPosts: BlogPost[];
  title: string;
}

const BlogListPageWrapper: React.FC<BlogListPageProps> = ({
  title,
  blogPosts,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ my: 4 }}>
      <Typography component="h3" variant="h3" my="20px" mb="30px">
        {title}
      </Typography>
      <Box>
        {blogPosts.map((post) => (
          <Box my="30px">
            <BlogHeader post={post} />
            <Button
              size="small"
              component={Link}
              href={`/blog/${post.id}`}
              sx={{ color: theme.palette.warning.main }}
            >
              Read More
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BlogListPageWrapper;
