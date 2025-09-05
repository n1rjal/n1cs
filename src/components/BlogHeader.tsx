import { BlogPost } from "@/lib/notion";
import { Typography } from "@mui/material";
import GradientText from "./GradientText";

interface BlogHeaderProps {
  post: BlogPost;
  renderGradient?: boolean;
}

const BlogHeader = ({ post, renderGradient }: BlogHeaderProps) => (
  <>
    {post.category ? (
      <Typography fontSize="12px" my="0" gutterBottom>
        #{post.category.replace(" ", "_").toLowerCase()}
      </Typography>
    ) : null}
    {renderGradient ? (
      <Typography variant="h3" component="h1" my="0" gutterBottom>
        <GradientText>{post.title}</GradientText>
      </Typography>
    ) : (
      <Typography variant="h3" component="h1" my="0" gutterBottom>
        {post.title}
      </Typography>
    )}
    <Typography
      variant="subtitle1"
      color="text.secondary"
      gutterBottom
      my="0"
      mb="5px"
    >
      Published: {new Date(post.createdTime).toISOString().split("T")[0]}
    </Typography>

    <Typography component="p" my="15px">
      {post.summary}
    </Typography>
  </>
);

export default BlogHeader;
