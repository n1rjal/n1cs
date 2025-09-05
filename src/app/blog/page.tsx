import { getBlogPosts } from "@/lib/notion";
import BlogListPageWrapper from "@/components/BlogListPageWrapper";
import { Grid } from "@mui/material";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      width="100%"
      maxWidth="100%"
    >
      <Grid size={8}>
        <BlogListPageWrapper title="All Blogs" blogPosts={blogPosts} />
      </Grid>
    </Grid>
  );
}
