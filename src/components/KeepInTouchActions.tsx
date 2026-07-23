"use client";

import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { decodeContactLink, encodedContactLinks } from "@/utils/contactLinks";
import GlowedLink from "./GlowedLink";

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

  return (
    <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 3 }}>
      <GlowedLink href={contactLinks.whatsapp}>
        <Button variant="outlined" color="secondary" startIcon={<WhatsAppIcon />}>
          WhatsApp
        </Button>
      </GlowedLink>
      <GlowedLink href={contactLinks.email}>
        <Button variant="outlined" color="secondary" startIcon={<EmailIcon />}>
          Email
        </Button>
      </GlowedLink>
    </Stack>
  );
}
