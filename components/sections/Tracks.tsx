"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TRACKS } from "@/lib/content";

export function Tracks() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="tracks" className="relative py-24 sm:py-32">
      <div className="container-px grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Key Discussion Tracks"
            title="Six conversations shaping the agenda"
            highlight={["agenda"]}
            subtitle="Each track convenes the people, capital and technology needed to turn ambition into bankable outcomes."
          />
        </div>

        <div className="space-y-3">
          {TRACKS.map((t, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={t.title} direction="up" delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-brand-teal/40 bg-slate-50/80"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor="hover"
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-sm font-bold text-brand-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-lg font-semibold text-ink">
                      {t.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="grid h-8 w-8 flex-none place-items-center rounded-full bg-slate-100 text-slate-500"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 pl-[3.4rem] text-slate-600">
                          {t.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
