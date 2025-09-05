import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import BlogHeader from "@/components/BlogHeader";
import ContentWrapper from "@/components/ContentWrapper";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import SuggestedBlogs from "@/components/SuggestedBlogs";
import { getBlogPosts, getPostContent, getSingleBlogPost } from "@/lib/notion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getSingleBlogPost(id);
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  } as Metadata;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getSingleBlogPost(id);

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
    <ResponsiveGrid py="20px">
      <ReadingProgressBar />
      <Box my="20px">
        <BlogHeader post={post} renderGradient />
        <ContentWrapper content={content} headings={headings} />
        <SuggestedBlogs blogPosts={suggestedBlogs} />
        <NewsletterSubscribe />
      </Box>
    </ResponsiveGrid>
  );
}
