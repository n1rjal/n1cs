"use client";

import { CardActionArea, CardActions, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type React from "react";
import type { BlogPost } from "@/lib/notion";
import BlogHeader from "./BlogHeader";
import GradientText from "./GradientText";
import InView from "./motion/InView";
import { hoverLiftSubtle, tapPress } from "./motion/MotionUtils";

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
  const shouldReduceMotion = useReducedMotion();
  
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
            I enjoy sharing my journey through tech and beyond — documenting the
            lessons I&apos;ve learned, the projects I&apos;ve built, and the ideas that
            inspire me. Here are some of my stories and experiences you might find
            interesting.
          </Typography>
        </Box>
      </InView>
      
      <InView stagger={0.08}>
        <Box>
          <Grid container spacing={4} sx={{ mt: 0 }}>
            {blogPosts.map((post) => (
              <Grid key={post.id} m="0" p="0">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : hoverLiftSubtle}
                  whileTap={shouldReduceMotion ? {} : tapPress}
                  style={{ height: "100%" }}
                >
                  <Link
                    href={`/blogs/${post.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ mt: "5px", py: "10px", px: "3px", height: "100%" }}>
                      <CardContent sx={{ m: "2px", py: "2px" }}>
                        <BlogHeader
                          reducedOpacity
                          renderGradient={!!renderGradient}
                          post={post}
                        />
                      </CardContent>
                      <CardActionArea></CardActionArea>
                      <CardActions></CardActions>
                    </Card>
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </InView>
    </Box>
  );
};

export default BlogListPageWrapper;
