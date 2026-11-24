"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type React from "react";
import type { BlogPost } from "@/lib/notion";
import getRelativeDuration from "@/utils/getRelativeDuration";
import GradientText from "./GradientText";
import InView from "./motion/InView";

interface BlogListPageProps {
  blogPosts: BlogPost[];
  title: string;
  renderGradient?: boolean;
  center?: boolean;
}

const BlogListPageWrapper: React.FC<BlogListPageProps> = ({
  title,
  blogPosts,
  renderGradient,
  center,
}) => {
  return (
    <Box sx={{ my: "10px" }}>
      <InView>
        <Box my="20px" mb="30px">
          <Typography
            {...{
              component: "h3",
              variant: "h3",
              ...(center && { textAlign: "center" }),
            }}
            color="textSecondary"
            gutterBottom
          >
            <GradientText>{title}</GradientText>
          </Typography>

          <Typography variant="body1" color="textSecondary">
            I enjoy sharing my journey through tech and beyond, documenting the
            lessons I&apos;ve learned, the projects I&apos;ve built, and the
            ideas that inspire me. Here are some of my stories and experiences
            you might find interesting.
          </Typography>
        </Box>
      </InView>

      <InView stagger={0.08}>
        <Box>
          {blogPosts.map((post) => (
            <Box
              key={post.id}
              component="article"
              sx={{
                py: 3,
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                "&:last-of-type": { borderBottom: "none" },
              }}
            >
              {/* 1. title */}
              <Link
                href={`/blogs/${post.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    lineHeight: 1.3,
                    mb: 1,
                    "a:hover > &": { textDecoration: "underline" },
                  }}
                >
                  {renderGradient ? (
                    <GradientText>{post.title}</GradientText>
                  ) : (
                    post.title
                  )}
                </Typography>
              </Link>

              {/* 2. summary */}
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.summary}
              </Typography>

              {/* 3. meta */}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {[post.category, getRelativeDuration(post.createdTime)]
                  .filter(Boolean)
                  .join(" · ")}
              </Typography>
            </Box>
          ))}
        </Box>
      </InView>
    </Box>
  );
};

export default BlogListPageWrapper;
