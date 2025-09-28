"use client";
import type { SvgIconComponent } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Category from "@mui/icons-material/Category";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { BlogPost } from "@/lib/notion";
import getRelativeDuration from "@/utils/getRelativeDuration";
import GradientText from "./GradientText";

interface BlogHeaderProps {
  post: BlogPost;
  renderGradient?: boolean;
  reducedOpacity?: boolean;
}

type BlogStatRenderer = {
  renderIf: (b: BlogPost) => boolean;
  render: (b: BlogPost) => string;
  icon: SvgIconComponent;
};

const renderers: BlogStatRenderer[] = [
  {
    renderIf: (b) => !!b.category,
    icon: Category,
    render: (b) => b.category,
  },
  {
    renderIf: (_) => true,
    icon: AccessTimeIcon,
    render: (b) => getRelativeDuration(b.createdTime),
  },
];

const BlogHeader = ({
  post,
  renderGradient,
  reducedOpacity,
}: BlogHeaderProps) => (
  <>
    {renderGradient ? (
      <Typography variant="h5" component="h2" my={0} gutterBottom>
        <GradientText>{post.title}</GradientText>
      </Typography>
    ) : (
      <Typography variant="h5" component="h2" my={0} gutterBottom>
        {post.title}
      </Typography>
    )}

    <Stack alignItems="center" direction="row" columnGap={"16px"} useFlexGap>
      {renderers
        .filter((f) => f.renderIf(post))
        .map((f) => (
          <>
            <Stack
              alignItems="center"
              direction="row"
              columnGap={"4px"}
              useFlexGap
            >
              <f.icon fontSize="medium" color="disabled" />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
                my={0}
                mb={0.5}
                component="span"
              >
                {f.render(post)}
              </Typography>
            </Stack>
          </>
        ))}
    </Stack>

    <Typography
      component="p"
      my={2}
      variant="body1"
      color={reducedOpacity ? "textSecondary" : "textPrimary"}
      sx={{
        ...(reducedOpacity
          ? {
              display: "-webkit-box",
              WebkitLineClamp: 2, // clamp to 3 lines
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.5rem", // keeps consistent line height
            }
          : {}),
      }}
    >
      {post.summary}
    </Typography>
  </>
);

export default BlogHeader;
