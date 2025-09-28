import { type FC } from "react";
import Link from "next/link";
import Typography from "@mui/material/Typography";

interface INirjalsBlogProps {
  increasedLine?: boolean;
}

const NirjalsBlog: FC<INirjalsBlogProps> = ({ increasedLine = false }) => (
  <Link href="/" style={{ textDecoration: "none" }}>
    <Typography
      variant="h6"
      sx={{
        fontFamily: "Edu NSW ACT Cursive, cursive",
        fontStyle: "normal",
        fontWeight: "bold",
        ...(increasedLine && {
          lineHeight: "400%",
        }),
      }}
      noWrap
      component="div"
      color="secondary"
      className=".intro"
      width="100%"
    >
      Nirjal&apos;s Corner
    </Typography>
  </Link>
);

export default NirjalsBlog;
