"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BlogHeader from "./BlogHeader";
import { BlogPost } from "@/lib/notion";
import GradientText from "./GradientText";

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
    <Box sx={{ my: "15px" }}>
      <Typography component="h3" variant="h3" my="20px" mb="30px">
        <GradientText>{title}</GradientText>
      </Typography>
      <Box>
        {blogPosts.map((post) => (
          <Card sx={{ my: 4 }} key={post.id}>
            <CardContent>
              <BlogHeader post={post} />
              <Button
                size="small"
                component={Link}
                href={`/blog/${post.id}`}
                sx={{ color: theme.palette.warning.main }}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BlogListPageWrapper;
