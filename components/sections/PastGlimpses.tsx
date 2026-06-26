"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Decorative gradient "photo" tiles (self-contained, no external assets).
const tiles = [
  { h: "h-64", g: "from-brand-green/40 to-brand-teal/30", label: "Keynote Plenary" },
  { h: "h-44", g: "from-brand-teal/40 to-brand-blue/30", label: "Investor Roundtable" },
  { h: "h-56", g: "from-brand-blue/40 to-brand-purple/30", label: "Ministerial Address" },
  { h: "h-72", g: "from-brand-purple/40 to-brand-green/30", label: "Networking Lounge" },
  { h: "h-48", g: "from-brand-teal/40 to-brand-green/30", label: "Tech Showcase" },
  { h: "h-60", g: "from-brand-blue/40 to-brand-teal/30", label: "Panel Discussion" },
  { h: "h-52", g: "from-brand-green/40 to-brand-purple/30", label: "Awards Night" },
  { h: "h-44", g: "from-brand-purple/40 to-brand-blue/30", label: "Fireside Chat" },
];

export function PastGlimpses() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Past Glimpses"
          title="Moments from previous editions"
          highlight={["Moments"]}
          subtitle="A look back at the energy, ideas and connections that define the summit."
        />

        <div className="mt-12 columns-2 gap-4 [column-fill:_balance] sm:columns-3 lg:columns-4">
          {tiles.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              className={`group relative mb-4 block w-full overflow-hidden rounded-2xl ${t.h}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${t.g} transition-transform duration-700 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-noise opacity-[0.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-70" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-sm font-semibold text-white">{t.label}</span>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-ink/50 px-2 py-1 text-[10px] uppercase tracking-wider text-white/70 backdrop-blur">
                2025
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[150] grid place-items-center bg-ink/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tiles[open].g}`} />
              <div className="absolute inset-0 bg-noise opacity-[0.07]" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-2xl font-bold text-white">
                  {tiles[open].label}
                </span>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-strong"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
