"use client";
import { Typography } from "@mui/material";
import type { BlogPost } from "@/lib/notion";
import GradientText from "./GradientText";

interface BlogHeaderProps {
  post: BlogPost;
  renderGradient?: boolean;
  reducedOpacity?: boolean;
}

const BlogHeader = ({
  post,
  renderGradient,
  reducedOpacity,
}: BlogHeaderProps) => (
  <>
    {post.category ? (
      <Typography fontSize="12px" my={0} gutterBottom>
        #{post.category.replace(" ", "_").toLowerCase()}
      </Typography>
    ) : null}
    {renderGradient ? (
      <Typography variant="h4" component="h2" my={0} gutterBottom>
        <GradientText>{post.title}</GradientText>
      </Typography>
    ) : (
      <Typography variant="h4" component="h2" my={0} gutterBottom>
        {post.title}
      </Typography>
    )}
    <Typography
      variant="subtitle1"
      color="text.secondary"
      gutterBottom
      my={0}
      mb={0.5}
    >
      Published: {new Date(post.createdTime).toISOString().split("T")[0]}
    </Typography>

    <Typography
      component="p"
      my={2}
      variant="body1"
      color={`${reducedOpacity ? "textSecondary" : "textPrimary"}`}
    >
      {post.summary}
    </Typography>
  </>
);

export default BlogHeader;
