"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import docker from "highlight.js/lib/languages/dockerfile";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import CopyCodeButton from "@/components/CopyCodeButton";
import GlowedLink from "@/components/GlowedLink";
import ImageModal from "@/components/ImageModal";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface ContentWrapperProps {
  content: string;
  headings: Heading[];
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  content,
  headings,
}) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");
  const [modalImageOriginalWidth, setModalImageOriginalWidth] = useState(0);
  const [modalImageOriginalHeight, setModalImageOriginalHeight] = useState(0);

  const handleImageClick = (
    src: string,
    alt: string,
    naturalWidth: number,
    naturalHeight: number,
  ) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setModalImageOriginalWidth(naturalWidth);
    setModalImageOriginalHeight(naturalHeight);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Grid container my={4}>
      <Grid>
        <Box
          sx={{
            py: 3,
            px: {
              sm: 2,
            },
            borderRadius: 2,
            color: theme.palette.text.primary,
            maxWidth: {
              xl: "md",
              lg: "md",
              md: "lg",
              sm: "100%",
            },
          }}
        >
          <Box component="hr" />
          <Box sx={{ pt: 4 }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                [
                  rehypeHighlight,
                  {
                    languages: {
                      python,
                      javascript,
                      typescript,
                      shell,
                      docker,
                      sql,
                      json,
                      yaml,
                    },
                  },
                ],
              ]}
              components={{
                code: (props) => {
                  const { className, children } = props;

                  const getTextContent = (node: React.ReactNode): string => {
                    if (typeof node === "string") return node;
                    if (typeof node === "number") return node.toString();
                    if (Array.isArray(node))
                      return node.map(getTextContent).join("");
                    if (React.isValidElement(node)) {
                      const element = node as React.ReactElement<any>;
                      if (element.props.children) {
                        return getTextContent(element.props.children);
                      }
                    }
                    return "";
                  };

                  const codeContent = getTextContent(children);

                  // Inline heuristic:
                  // - No newline
                  // - No language class
                  const inline =
                    !codeContent.includes("\n") &&
                    !className?.startsWith("language-");

                  if (inline) {
                    return (
                      <Box
                        component="code"
                        className={className}
                        sx={{
                          color: "#f73b3b",
                        }}
                      >
                        {children}
                      </Box>
                    );
                  }

                  return (
                    <Box position="relative" maxWidth="90dvw">
                      <CopyCodeButton code={codeContent} />
                      <Box
                        component="pre"
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.9em",
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? theme.palette.background.default
                              : theme.palette.background.paper, // light mode
                          color: theme.palette.text.primary,
                          p: 2,
                          borderRadius: theme.shape.borderRadius,
                          overflowX: "auto",
                        }}
                        className={className}
                      >
                        <Box
                          component="code"
                          sx={{
                            display: "block",
                            wordBreak: "break-word",
                            color: "inherit",
                          }}
                        >
                          {children}
                        </Box>
                      </Box>
                    </Box>
                  );
                },
                h1: ({ node, ...props }) => (
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ color: theme.palette.warning.main, mt: 4, mb: 2 }}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ color: theme.palette.warning.main, mt: 3, mb: 1.5 }}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ color: theme.palette.warning.main, mt: 2, mb: 1 }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <Typography
                    component="div"
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      lineHeight: 1.8,
                      mb: 1.5,
                      wordBreak: "break-word",
                    }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <Typography
                    component="li"
                    variant="body1"
                    sx={{
                      color: theme.palette.text.primary,
                      lineHeight: 1.8,
                      mb: 0.5,
                      wordBreak: "break-word",
                    }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <Box
                    component="ul"
                    sx={{
                      ml: {
                        lg: 3,
                        sm: 1,
                      },
                      mb: 1.5,
                      listStyleType: "disc",
                    }}
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <Box
                    component="ol"
                    sx={{ ml: 3, mb: 1.5, listStyleType: "decimal" }}
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <Box
                    component="hr"
                    sx={{
                      border: "none",
                      borderTop: `1px solid ${theme.palette.divider}`,
                      my: 4,
                    }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <GlowedLink href={props.href!} {...props} />
                ),
                img: ({ node, ...props }) => (
                  <Box component="figure" sx={{ m: 0 }}>
                    <Box
                      component="img"
                      {...props}
                      alt={props.alt || ""}
                      sx={{
                        display: "block",
                        margin: "auto",
                        cursor: "pointer",

                        width: {
                          xs: "90%", // mobile
                          sm: "75%",
                          md: "60%",
                        },
                        maxWidth: "100%", // never overflow horizontally
                        height: "auto",
                        maxHeight: "100vh", // never exceed viewport height
                      }}
                      onClick={(e) => {
                        const imgElement = e.target as HTMLImageElement;
                        handleImageClick(
                          imgElement.src,
                          imgElement.alt,
                          imgElement.naturalWidth,
                          imgElement.naturalHeight,
                        );
                      }}
                    />
                    {props.alt ? (
                      <Box
                        component="figcaption"
                        textAlign="center"
                        sx={{ fontSize: "12px", fontStyle: "italic" }}
                      >
                        {props.alt}
                      </Box>
                    ) : null}
                  </Box>
                ),
                blockquote: ({ node, ...props }) => (
                  <Box
                    component="blockquote"
                    sx={{
                      borderLeft: `4px solid ${theme.palette.divider}`,
                      paddingLeft: theme.spacing(2),
                      margin: theme.spacing(2, 0),
                      color: theme.palette.text.secondary,
                      fontStyle: "italic",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
        </Box>
      </Grid>

      <ImageModal
        src={modalImageSrc}
        alt={modalImageAlt}
        open={openModal}
        onClose={handleCloseModal}
        originalWidth={modalImageOriginalWidth}
        originalHeight={modalImageOriginalHeight}
      />
    </Grid>
  );
};

export default ContentWrapper;
