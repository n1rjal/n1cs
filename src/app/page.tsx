import EmailIcon from "@mui/icons-material/Email";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import BlogListPageWrapper from "@/components/BlogListPageWrapper";
import GradientText from "@/components/GradientText";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import ProjectCard from "@/components/ProjectCard";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";
import Testimonials from "@/components/Testimonials";
import TrustedCompanies from "@/components/TrustedCompanies";
import { getBlogPosts, getProjects } from "@/lib/notion";
import GlowedLink from "../components/GlowedLink";

export default async function Home() {
  const blogPosts = await getBlogPosts();
  const projects = await getProjects();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        mb: 0,
      }}
    >
      <Container maxWidth="md" sx={{ mt: 4 }}>
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
            <GradientText>Nirjal Paudel (n1rjal)</GradientText>
          </Typography>
          <Box
            mt={{
              xs: 2,
              sm: 4,
              md: 6,
              lg: 8,
            }}
          >
            <Typography variant="h6" color="text.primary" gutterBottom>
              I am
            </Typography>
            <Box ml="0px">
              <List component="ul" sx={{ listStyleType: "none", pl: 0 }}>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: "24px" }}>
                    <FiberManualRecordIcon
                      sx={{ fontSize: "0.7rem", color: "primary.main" }}
                    />
                  </ListItemIcon>
                  <Typography>
                    Top technical contributor for{" "}
                    <GlowedLink href="https://nepal.gnome.org/" target="_blank">
                      GNOME Nepal
                    </GlowedLink>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: "24px" }}>
                    <FiberManualRecordIcon
                      sx={{ fontSize: "0.7rem", color: "primary.main" }}
                    />
                  </ListItemIcon>
                  <Typography>
                    Helping people around the globe on{" "}
                    <GlowedLink
                      href="https://www.upwork.com/freelancers/~0102d4b4b099a771b2"
                      target="_blank"
                    >
                      Upwork
                    </GlowedLink>
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: "24px" }}>
                    <FiberManualRecordIcon
                      sx={{ fontSize: "0.7rem", color: "primary.main" }}
                    />
                  </ListItemIcon>
                  <Typography>Tinkerer and experimenter</Typography>
                </ListItem>
              </List>
            </Box>
          </Box>

          <List
            component="ul"
            sx={{ listStyleType: "none", pl: 0, mb: "10px" }}
          >
            <Typography variant="h6" color="text.primary" gutterBottom>
              Welcome to my corner of the internet
            </Typography>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: "0.7rem", color: "primary.main" }}
                />
              </ListItemIcon>
              <Typography>Experience my experiences</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: "0.7rem", color: "primary.main" }}
                />
              </ListItemIcon>
              <Typography>Think with me</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <FiberManualRecordIcon
                  sx={{ fontSize: "0.7rem", color: "primary.main" }}
                />
              </ListItemIcon>
              <Typography>Boast / Roast my opinions</Typography>
            </ListItem>
          </List>

          <Grid container spacing={1} justifyContent="center" sx={{ pt: 4 }}>
            <Grid
              size={{
                xs: 5,
                sm: 5,
                md: 4,
                lg: 2,
              }}
              display="flex"
              justifyContent="center"
            >
              <GlowedLink href="/abouts">
                <Button variant="contained" color="secondary">
                  About Me
                </Button>
              </GlowedLink>
            </Grid>

            <Grid
              size={{
                xs: 5,
                sm: 5,
                md: 4,
                lg: 2,
              }}
              display="flex"
              justifyContent="center"
            >
              <Link href="/#keep-in-touch" passHref>
                <Button variant="outlined" color="secondary">
                  Get In Touch
                </Button>
              </Link>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
              display="flex"
              justifyContent="center"
            >
              <ResumeDownloadButton />
            </Grid>
          </Grid>
        </Box>
      </Container>

      <TrustedCompanies />

      <Testimonials />

      <Box>
        <Container maxWidth="md" sx={{ my: 4 }}>
          <Box
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 3,
            }}
          >
            <BlogListPageWrapper
              title="Latest Blog Posts"
              blogPosts={blogPosts.sort(() => 0.5 - Math.random()).slice(0, 3)}
            />
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "background.default",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            <GradientText>My Projects</GradientText>
          </Typography>
          <Typography variant="body1" paragraph>
            Here are a few of my recent projects. I&rsquo;m passionate about
            building things that solve real-world problems and I&rsquo;m always
            looking for new challenges.
          </Typography>
          <Grid container spacing={4} sx={{ my: 2 }}>
            {projects.slice(0, 3).map((project) => (
              <Grid key={project.id}>
                <ProjectCard {...project} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              component={Link}
              href="/projects"
              variant="contained"
              color="secondary"
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      <NewsletterSubscribe />

      <Box id="keep-in-touch" sx={{ bgcolor: "background.default", py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <GradientText>Keep in Touch</GradientText>
          </Typography>
          <Typography variant="body1" paragraph>
            I&apos;m always open to connecting with new people. Whether you have
            a question, a project idea, or just want to say hi, feel free to
            reach out.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={4}
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <GlowedLink href="https://api.whatsapp.com/send?phone=9779863948081&text=Hi%20Nirjal%2C%20I%20am%20here%20from%20your%20website%2C%20I%20am%20willing%20to%20chat%20to%20you%20on%20few%20things.%20Are%20you%20up%20for%20it%20%3F">
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<WhatsAppIcon />}
              >
                WhatsApp
              </Button>
            </GlowedLink>
            <GlowedLink href="mailto:nirjalpaudel54312@gmail.com">
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<EmailIcon />}
              >
                Email
              </Button>
            </GlowedLink>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
