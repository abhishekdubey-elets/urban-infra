"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Word-by-word reveal for large editorial headings.
export function TextReveal({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <motion.h2
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const isHi = highlight.includes(word.replace(/[^a-zA-Z]/g, ""));
        return (
          <span key={i} className="mr-[0.28em] inline-block overflow-hidden py-[0.05em]">
            <motion.span
              className={cn("inline-block", isHi && "text-gradient")}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: { y: "0%", opacity: 1 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
}
