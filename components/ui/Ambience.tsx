"use client";

import { motion } from "framer-motion";

// Floating gradient blobs + grid used as a global ambient backdrop.
export function Ambience() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(110% 90% at 50% 0%, #000 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(110% 90% at 50% 0%, #000 35%, transparent 80%)",
        }}
      />
      {/* Blobs */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-brand-teal/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[30%] h-[40rem] w-[40rem] rounded-full bg-brand-purple/20 blur-[140px]"
        animate={{ x: [0, -70, 0], y: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[20%] h-[34rem] w-[34rem] rounded-full bg-brand-green/15 blur-[130px]"
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.04]" />
    </div>
  );
}
