import { Metadata } from "next";
import { getBlogPosts } from "@/lib/notion";
import BlogListPageWrapper from "@/components/BlogListPageWrapper";
import ResponsiveGrid from "@/components/ResponsiveGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read the latest articles and insights from Nirjal Paudel on software development, technology, and more.",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <ResponsiveGrid>
      <BlogListPageWrapper title="All Blogs" blogPosts={blogPosts} />
    </ResponsiveGrid>
  );
}
