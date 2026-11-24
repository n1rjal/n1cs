"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { decodeContactLink, encodedContactLinks } from "@/utils/contactLinks";

type ContactLinks = {
  email: string;
  whatsapp: string;
};

const initialLinks: ContactLinks = {
  email: "#",
  whatsapp: "#",
};

export default function KeepInTouchActions() {
  const [contactLinks, setContactLinks] = useState<ContactLinks>(initialLinks);

  useEffect(() => {
    setContactLinks({
      email: decodeContactLink(encodedContactLinks.email),
      whatsapp: decodeContactLink(encodedContactLinks.whatsapp),
    });
  }, []);

  const rows = [
    { label: "WhatsApp", href: contactLinks.whatsapp, Icon: WhatsAppIcon },
    { label: "Email", href: contactLinks.email, Icon: EmailIcon },
  ];

  // Full-width rows with a hairline between them; arrow nudges on hover.
  return (
    <Box sx={{ mt: 3, maxWidth: 420 }}>
      {rows.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          color="text.primary"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            py: 1.75,
            fontWeight: 600,
            borderTop: (t) => `1px solid ${t.palette.divider}`,
            "&:last-of-type": {
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            },
            "& .arrow": { ml: "auto", transition: "transform 0.2s ease" },
            "&:hover, &:focus-visible": {
              color: "secondary.main",
              "& .arrow": { transform: "translateX(4px)" },
            },
          }}
        >
          <Icon fontSize="small" />
          {label}
          <ArrowForwardIcon className="arrow" fontSize="small" />
        </Link>
      ))}
    </Box>
  );
}
