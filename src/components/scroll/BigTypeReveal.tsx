import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BigTypeRevealProps {
  children: React.ReactNode;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const BigTypeReveal: React.FC<BigTypeRevealProps> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, x: -32 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, ease: EASE }}
    className={cn(
      "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground/90",
      className
    )}
  >
    {children}
  </motion.div>
);

export default BigTypeReveal;
