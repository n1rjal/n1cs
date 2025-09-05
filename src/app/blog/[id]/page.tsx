import { getBlogPosts, getPostContent, getSingleBlogPost } from "@/lib/notion";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ContentWrapper from "@/components/ContentWrapper";
import { Typography, Box, Container } from "@mui/material";

// Explicitly define PageProps to match Next.js's expected type for route parameters
interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(process.env.NOTION_BLOG_DATABASE_ID!);
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({
  params,
}: PageProps) {
  const post = await getSingleBlogPost(params.id);

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" color="error">
          Post not found.
        </Typography>
      </Container>
    );
  }

  const { content, headings } = await getPostContent(post.id);

  return (
    <>
      <ReadingProgressBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Published: {new Date(post.createdTime).toISOString().split("T")[0]}
          </Typography>
          <ContentWrapper content={content} headings={headings} />
        </Box>
      </Container>
    </>
  );
}
