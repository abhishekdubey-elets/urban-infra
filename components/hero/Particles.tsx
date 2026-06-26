"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Deterministic pseudo-random so SSR/CSR match (no Math.random in render path drift).
function seeded(i: number) {
  const x = Math.sin(i * 999.13) * 10000;
  return x - Math.floor(x);
}

export function Particles({ count = 26 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: seeded(i + 1) * 100,
        top: seeded(i + 7) * 100,
        size: 1 + seeded(i + 3) * 2.5,
        dur: 6 + seeded(i + 5) * 10,
        delay: seeded(i + 9) * 6,
        drift: (seeded(i + 11) - 0.5) * 40,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-teal/70"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px rgba(31,194,201,0.8)",
          }}
          animate={{ y: [0, -60, 0], x: [0, d.drift, 0], opacity: [0, 0.9, 0] }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
