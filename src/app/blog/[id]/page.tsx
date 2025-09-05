import { getBlogPosts, getPostContent, getSingleBlogPost } from "@/lib/notion";
import { Metadata } from "next";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ContentWrapper from "@/components/ContentWrapper";
import { Typography, Box, Container } from "@mui/material";
import SuggestedBlogs from "@/components/SuggestedBlogs";
import Grid from "@mui/material/Grid";
import BlogHeader from "@/components/BlogHeader";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

import { Metadata } from "next";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getSingleBlogPost(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
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

  const blogPosts = await getBlogPosts();
  const suggestedBlogs = blogPosts
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 3); // Get first 3

  const { content, headings } = await getPostContent(post.id);

  return (
    <Grid container justifyContent="center" bgcolor="background.paper">
      <ReadingProgressBar />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid>
              <BlogHeader post={post} renderGradient />
              <ContentWrapper content={content} headings={headings} />
              <SuggestedBlogs blogPosts={suggestedBlogs} />
              <NewsletterSubscribe />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}
