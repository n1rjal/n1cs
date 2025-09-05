import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import GlowedLink from "../components/GlowedLink";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TrustedCompanies from "@/components/TrustedCompanies";
import ResumeDownloadButton from "@/components/ResumeDownloadButton";

export default async function Home() {
  const blogPosts = [];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
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
          <Typography component="h1" variant="h3">
            Nirjal Paudel (n1rjal)
          </Typography>
          <Box
            mt={{
              lg: "1.5cm",
              md: "1cm",
              sm: 0,
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

          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" color="secondary">
              View My Work
            </Button>
            <Button variant="outlined" color="secondary">
              Get In Touch
            </Button>
            <ResumeDownloadButton />
          </Stack>
        </Box>
      </Container>

      <TrustedCompanies />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h3" gutterBottom>
          Latest Blog Posts
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Published:{" "}
                    {new Date(post.createdTime).toISOString().split("T")[0]}
                  </Typography>
                  <Button
                    size="small"
                    component={Link}
                    href={`/blog/${post.slug}`}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2">
              No blog posts found. Please ensure your Notion database is set up
              correctly and has published posts.
            </Typography>
          )}
        </Box>

        {/* Newsletter Section */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
            pb: 6,
            mt: 8,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" component="h2" gutterBottom>
              Subscribe to My Newsletter
            </Typography>
            <Typography variant="body1" paragraph>
              Stay up-to-date with my latest projects, articles, and insights.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <TextField
                label="Your Email"
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" size="medium" color="secondary">
                Subscribe
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Contact Me Section */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1" paragraph>
            Have a question or want to work together? Fill out the form below or
            reach out to me directly on{" "}
            <GlowedLink href="https://api.whatsapp.com/send?phone=9779863948081&text=Hi%20Nirjal%2C%20I%20am%20here%20from%20your%20website%2C%20I%20am%20willing%20to%20chat%20to%20you%20on%20few%20things.%20Are%20you%20up%20for%20it%20%3F">
              {" "}
              WhatsApp
            </GlowedLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
