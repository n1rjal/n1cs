import { BlogPost } from "@/lib/notion";
import { Typography } from "@mui/material";

interface BlogHeaderProps {
  post: BlogPost;
}

const BlogHeader = ({ post }: BlogHeaderProps) => (
  <>
    {post.category ? (
      <Typography variant="h6" component="h3" my="0" gutterBottom>
        #{post.category}
      </Typography>
    ) : null}
    <Typography variant="h3" component="h1" my="0" gutterBottom>
      {post.title}
    </Typography>
    <Typography
      variant="subtitle1"
      color="text.secondary"
      gutterBottom
      my="0"
      mb="5px"
    >
      Published: {new Date(post.createdTime).toISOString().split("T")[0]}
    </Typography>

    <Typography component="p">{post.summary}</Typography>
  </>
);

export default BlogHeader;
