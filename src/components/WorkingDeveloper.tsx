"use client";
import { Box } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/constants/Developer.json";

const phrases = [
  "Experience my experiences",
  "Think with me",
  "Boast / Roast my opinions",
];
const command = "cat lets-talk.txt";
// steps: type each char, reveal each output line, then one hold step before looping
const lastStep = command.length + phrases.length;

const Cursor = ({ blink }: { blink: boolean }) => (
  <motion.span
    animate={blink ? { opacity: [1, 0] } : undefined}
    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
  >
    ▍
  </motion.span>
);

// Mini terminal that types `cat lets-talk.txt` and prints the list, on a loop
const TerminalCaption = () => {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const delay = t < command.length ? 90 : t < lastStep ? 350 : 3500;
    const id = setTimeout(() => setT((n) => (n + 1) % (lastStep + 1)), delay);
    return () => clearTimeout(id);
  }, [t, reduce]);

  const step = reduce ? lastStep : t;
  const typed = command.slice(0, step);
  const shown = Math.max(0, step - command.length);
  const done = shown === phrases.length;
  const prompt = (
    <Box component="span" sx={{ color: "secondary.main" }}>
      ${" "}
    </Box>
  );

  return (
    <Box sx={{ textAlign: "center", mt: "-10%", position: "relative" }}>
      <Box
        aria-hidden
        sx={{
          display: "inline-block",
          minWidth: 280,
          px: 2,
          py: 1.25,
          borderRadius: 2,
          bgcolor: "action.hover",
          color: "text.primary",
          textAlign: "left",
          whiteSpace: "pre",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "0.8125rem",
          lineHeight: 1.7,
        }}
      >
        <div>
          {prompt}
          {typed}
          {!done && <Cursor blink={!reduce} />}
        </div>
        {/* every line always renders (hidden until reached) so the box never changes size */}
        {phrases.map((p, i) => (
          <Box key={p} sx={{ color: "text.secondary", visibility: i < shown ? "visible" : "hidden" }}>
            - {p}
          </Box>
        ))}
        <Box sx={{ visibility: done ? "visible" : "hidden" }}>
          {prompt}
          <Cursor blink={!reduce} />
        </Box>
      </Box>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        Experience my experiences, think with me, and boast or roast my
        opinions.
      </span>
    </Box>
  );
};

const WorkingDeveloper = () => (
  // maxWidth on the wrapper so the caption's % margin tracks the animation's width
  <Box
    sx={{
      width: "100%",
      maxWidth: { xs: "min(100%, 50vh)", md: "35vw" },
      mx: "auto",
    }}
  >
    <Box sx={{ width: "100%", aspectRatio: "1 / 1" }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
    <TerminalCaption />
  </Box>
);

export default WorkingDeveloper;
