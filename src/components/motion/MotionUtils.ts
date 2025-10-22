"use client";

import type { Transition, Variants } from "framer-motion";

// Transition presets
export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const easeTransition: Transition = {
  duration: 0.28,
  ease: [0.25, 0.1, 0.25, 1],
};

export const quickTransition: Transition = {
  duration: 0.18,
  ease: "easeOut",
};

// Reveal variants for InView animations
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

export const fadeLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeTransition,
  },
};

export const fadeRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeTransition,
  },
};

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: easeTransition,
  },
};

// Reduced motion variants (just opacity, no movement)
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
};

// Hover/press interaction presets
export const hoverLift = {
  y: -3,
  scale: 1.01,
  transition: springTransition,
};

export const hoverLiftSubtle = {
  y: -2,
  scale: 1.005,
  transition: springTransition,
};

export const tapPress = {
  scale: 0.985,
  transition: quickTransition,
};

export const hoverScale = {
  scale: 1.05,
  transition: springTransition,
};

export const hoverScaleSubtle = {
  scale: 1.02,
  transition: springTransition,
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 2,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.12,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -2,
    transition: {
      duration: 0.08,
      ease: "easeIn",
    },
  },
};

// Stagger container variants
export const staggerContainerVariants = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

