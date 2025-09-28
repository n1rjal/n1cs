import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import NirjalsBlog from "./NirjalsBlog";

const footerGroups = [
  {
    title: "Connect",
    children: [
      {
        name: "GitHub",
        href: "https://github.com/n1rjal",
      },
      {
        name: "Instagram",
        href: "https://instagram.com/n1rjal",
      },
    ],
  },

  {
    title: "Hire Me",
    children: [
      {
        name: "Upwork",
        href: "https://www.upwork.com/freelancers/~0102d4b4b099a771b2",
      },
    ],
  },
  {
    title: "Message",
    children: [
      {
        name: "WhatsApp",
        href: "https://api.whatsapp.com/send?phone=9779863948081&text=Hi%20Nirjal%2C%20I%20am%20here%20from%20your%20website%2C%20I%20am%20willing%20to%20chat%20to%20you%20on%20few%20things.%20Are%20you%20up%20for%20it%20%3F",
      },
      {
        name: "Email",
        href: "mailto: nirjalpaudel54312@gmail.com",
      },

      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/nirjalpaudel",
      },
      {
        name: "Facebook",
        href: "https://facebook.com/n1rjal",
      },
    ],
  },
];

const Footer = () => (
  <Box component="footer" bgcolor="background.paper" borderTop="1px">
    <Grid
      container
      spacing={4}
      sx={{
        p: { lg: 8, xl: 8, sm: 4, xs: 4 },
        mx: { lg: "auto", xl: "auto", sm: 2, xs: 2 },
        lineHeight: "20px",
      }}
      alignItems="start"
    >
      <Grid
        size={{
          lg: 3,
          xl: 3,
          sm: 12,
          xs: 12,
          md: 4,
        }}
        lineHeight="400%"
      >
        <NirjalsBlog increasedLine />
        <Typography color="textSecondary" lineHeight="200%" textAlign="left">
          Software engineer (5+ yrs) in backend, databases, and cloud.
          Open-source contributor.
        </Typography>
      </Grid>
      {footerGroups.map((group) => (
        <Grid
          size={{
            lg: 3,
            xl: 3,
            sm: 6,
            xs: 6,
            md: 4,
          }}
          key={group.title}
        >
          <Typography
            sx={{
              fontStyle: "normal",
              fontWeight: "bold",
            }}
            noWrap
            component="div"
            color="textPrimary"
            className=".intro"
            width="100%"
            fontSize="medium"
            lineHeight="400%"
          >
            {group.title}
          </Typography>
          {group.children.map(({ name, href }) => (
            <Box component="div" key={href}>
              <Link href={href} style={{ textDecoration: "none" }}>
                <Typography
                  lineHeight="200%"
                  color="textSecondary"
                  fontSize="medium"
                >
                  {name}
                </Typography>
              </Link>
            </Box>
          ))}
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Footer;
