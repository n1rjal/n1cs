import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BlogPost } from "@/lib/notion";

interface SuggestedBlogsProps {
  blogPosts: BlogPost[];
}

export default function SuggestedBlogs({ blogPosts }: SuggestedBlogsProps) {
  if (!blogPosts || blogPosts.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" component="h3" gutterBottom>
        Suggested Blogs
      </Typography>
      <Box>
        {blogPosts.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardContent>
              <Link
                href={`/blog/${post.id}`}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {post.title}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                {new Date(post.createdTime).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
