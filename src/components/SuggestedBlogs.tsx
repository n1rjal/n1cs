import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import type { BlogPost } from "@/lib/notion";
import BlogHeader from "./BlogHeader";
import BlogListPageWrapper from "./BlogListPageWrapper";

interface SuggestedBlogsProps {
  blogPosts: BlogPost[];
}

export default function SuggestedBlogs({ blogPosts }: SuggestedBlogsProps) {
  if (!blogPosts || blogPosts.length === 0) {
    return null;
  }

  return (
    <Box>
      <BlogListPageWrapper title="Suggested Blogs" blogPosts={blogPosts} />
    </Box>
  );
}
