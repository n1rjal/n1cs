import { Metadata } from "next";
import { getBlogPosts } from "@/lib/notion";
import BlogListPageWrapper from "@/components/BlogListPageWrapper";
import { Grid } from "@mui/material";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest articles and insights from Nirjal Paudel on software development, technology, and more.",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      width="100%"
      maxWidth="100%"
      bgcolor="background.paper"
    >
      <Grid size={8}>
        <BlogListPageWrapper title="All Blogs" blogPosts={blogPosts} />
      </Grid>
    </Grid>
  );
}
