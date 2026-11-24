import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import BlogListPageWrapper from "@/components/BlogListPageWrapper";
import DeepThoughtsAndBooksSection from "@/components/DeepThoughtsAndBooksSection";
import GradientText from "@/components/GradientText";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import ProjectCard from "@/components/ProjectCard";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";
import Testimonials from "@/components/Testimonials";
import ViewAllLink from "@/components/ViewAllLink";
import TrustedCompanies from "@/components/TrustedCompanies";
import WorkingDeveloper from "@/components/WorkingDeveloper";
import KeepInTouchActions from "@/components/KeepInTouchActions";
import {
  getBlogPosts,
  getProjects,
  getDeepThoughts,
  getBooks,
} from "@/lib/notion";
import GlowedLink from "../components/GlowedLink";
import InView from "../components/motion/InView";

export default async function Home() {
  const blogPosts = await getBlogPosts();
  const projects = await getProjects();
  const deepThoughts = await getDeepThoughts();
  const books = await getBooks();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: {
          xl: 8,
          xm: 2,
          sm: 3,
          md: 4,
        },
        mb: 0,
        overflow: "hidden",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <Stack
        justifyContent="center"
        // bottom-align so the hero buttons share a baseline with the caption pill
        alignItems={{ xs: "center", md: "flex-end" }}
        flexDirection={{
          sm: "column-reverse",
          xs: "column-reverse",
          md: "row",
          xl: "row",
          lg: "row",
        }}
        maxWidth="md"
        sx={{
          pt: { lg: 8, xl: 8, sm: 0, xs: 0 },
          mx: { lg: "auto", xl: "auto", sm: 2, xs: 2 },
          width: "90%",
          boxSizing: "border-box",
          columnGap: { md: 4 },
          // fixed column ratio so text width doesn't depend on the h1's unwrapped length
          "& > :first-of-type": { flex: { md: "1.3 1 0" }, minWidth: 0 },
          "& > :last-of-type": { flex: { md: "1 1 0" }, minWidth: 0 },
        }}
      >
        <InView skipFirstScreen>
          <Box>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              component="span"
            >
              Hi 👋, I&apos;m
            </Typography>
            <Typography component="h1" variant="h1">
              <GradientText>Nirjal Paudel</GradientText>
              <Box
                component="span"
                sx={{
                  display: "block",
                  fontSize: "0.45em",
                  fontWeight: 500,
                  color: "text.secondary",
                  mt: 1,
                }}
              >
                (n1rjal)
              </Box>
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5 }}>
              Welcome to my corner of the internet.
            </Typography>
            <Box mt={{ xs: 2, md: 4 }} color="text.secondary">
              <Typography component="h2" variant="h6" gutterBottom>
                I am
              </Typography>
              <Stack
                component="ul"
                spacing={0.75}
                sx={{ listStyle: "none", p: 0, m: 0, pl: 2 }}
              >
                <Typography component="li" variant="body2">
                  Software Engineer at{" "}
                  <GlowedLink href="https://ailytics.ai" target="_blank">
                    Ailytics.ai
                  </GlowedLink>
                </Typography>
                <Typography component="li" variant="body2">
                  Top Rated with 100% Job Success on{" "}
                  <GlowedLink
                    href="https://www.upwork.com/freelancers/~0102d4b4b099a771b2"
                    target="_blank"
                  >
                    Upwork
                  </GlowedLink>
                </Typography>
                <Typography component="li" variant="body2">
                  Top technical contributor to{" "}
                  <GlowedLink href="https://nepal.gnome.org/" target="_blank">
                    GNOME Nepal
                  </GlowedLink>
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 3 }}>
              <Button
                href="/#keep-in-touch"
                variant="contained"
                color="secondary"
              >
                Get In Touch
              </Button>
              <Button href="/about-me" variant="outlined" color="secondary">
                About me
              </Button>
              <ResumeDownloadButton />
            </Stack>
          </Box>
        </InView>

        <InView direction="right" skipFirstScreen>
          <Box>
            <WorkingDeveloper />
          </Box>
        </InView>
      </Stack>

      <TrustedCompanies />

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <InView>
            <Typography variant="h3" component="h2" gutterBottom>
              <GradientText>My Projects</GradientText>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ maxWidth: 640 }}
            >
              Here are a few of my recent projects. I&rsquo;m passionate about
              building things that solve real-world problems and I&rsquo;m
              always looking for new challenges.
            </Typography>
          </InView>

          <InView stagger={0.1}>
            <Box sx={{ my: 2 }}>
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </Box>
          </InView>

          {projects.length > 3 ? (
            <InView>
              <ViewAllLink href="/projects" label="View all projects" />
            </InView>
          ) : null}
        </Container>
      </Box>

      <Box>
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Box
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
            }}
          >
            <BlogListPageWrapper
              title="Latest Blogs"
              blogPosts={blogPosts.sort(() => 0.5 - Math.random()).slice(0, 3)}
            />
          </Box>

          {blogPosts.length > 3 ? (
            <InView>
              <ViewAllLink href="/blogs" label="View all blogs" />
            </InView>
          ) : null}
        </Container>
      </Box>

      <Testimonials />

      <DeepThoughtsAndBooksSection deepThoughts={deepThoughts} books={books} />
      <Box
        id="keep-in-touch"
        sx={{ bgcolor: "background.paper", py: { xs: 6, md: 10 } }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              columnGap: 10,
              rowGap: 8,
              alignItems: "start",
            }}
          >
            <Box>
              <InView>
                <Typography variant="h3" component="h2" gutterBottom>
                  <GradientText>Keep in Touch</GradientText>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  I&apos;m always open to connecting with new people. Whether
                  you have a question, a project idea, or just want to say hi,
                  feel free to reach out.
                </Typography>
              </InView>
              <InView stagger={0.1}>
                <KeepInTouchActions />
              </InView>
            </Box>

            <InView>
              <NewsletterSubscribe embedded />
            </InView>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
