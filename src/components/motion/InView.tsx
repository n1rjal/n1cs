"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  fadeDownVariants,
  fadeInVariants,
  fadeLeftVariants,
  fadeRightVariants,
  fadeUpVariants,
  reducedMotionVariants,
  staggerContainerVariants,
} from "./MotionUtils";

type Direction = "up" | "down" | "left" | "right" | "fade";

interface InViewProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  skipFirstScreen?: boolean;
}

const directionVariants = {
  up: fadeUpVariants,
  down: fadeDownVariants,
  left: fadeLeftVariants,
  right: fadeRightVariants,
  fade: fadeInVariants,
};

export default function InView({
  children,
  direction = "up",
  delay = 0,
  stagger = 0.08,
  once = true,
  amount = 0.2,
  className,
  skipFirstScreen = false,
}: InViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isInFirstScreen, setIsInFirstScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const variants = shouldReduceMotion 
    ? reducedMotionVariants 
    : directionVariants[direction];

  const containerVariants = staggerContainerVariants(stagger, delay);

  useEffect(() => {
    if (!skipFirstScreen || !ref.current) return;

    const checkFirstScreen = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Check if the element is within the first screen (100vh)
        const isInFirstViewport = rect.top < viewportHeight && rect.bottom > 0;
        setIsInFirstScreen(isInFirstViewport);
      }
    };

    // Check immediately
    checkFirstScreen();

    // Check on scroll
    window.addEventListener('scroll', checkFirstScreen);
    window.addEventListener('resize', checkFirstScreen);

    return () => {
      window.removeEventListener('scroll', checkFirstScreen);
      window.removeEventListener('resize', checkFirstScreen);
    };
  }, [skipFirstScreen]);

  // If skipFirstScreen is true and element is in first screen, show content immediately
  if (skipFirstScreen && isInFirstScreen) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={stagger > 0 ? containerVariants : variants}
    >
      {stagger > 0 ? (
        <motion.div variants={variants}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}
