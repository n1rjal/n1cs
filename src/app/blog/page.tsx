import { getBlogPosts } from "@/lib/notion";
import BlogListPageWrapper from "@/components/BlogListPageWrapper";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return <BlogListPageWrapper blogPosts={blogPosts} />;
}
