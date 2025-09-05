"use client";
import Box from "@mui/material/Box";
import type { BlogPost } from "@/lib/notion";
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
