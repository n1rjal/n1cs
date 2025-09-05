import { getBlogPosts } from "@/lib/notion";
import BlogListPageWrapper from "@/components/BlogListPageWrapper"; // Import the new client component

export default async function BlogPage() {
  const blogPosts = await getBlogPosts(process.env.NOTION_BLOG_DATABASE_ID!);

  return <BlogListPageWrapper blogPosts={blogPosts} />;
}
