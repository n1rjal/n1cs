"use client";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type React from "react";
import type { BlogPost } from "@/lib/notion";
import BlogHeader from "./BlogHeader";
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
        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid key={post.id}>
              <Card sx={{ my: 4, height: "100%" }}>
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
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BlogListPageWrapper;
