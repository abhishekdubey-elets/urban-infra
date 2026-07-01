"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/80 px-6 py-14 text-center sm:px-16">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-teal/15 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-brand-purple/15 blur-3xl" />
            <Quote className="mx-auto h-10 w-10 text-brand-teal/60" />
            <div className="relative mt-6 min-h-[140px] sm:min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mx-auto max-w-2xl font-display text-xl font-medium leading-relaxed text-slate-800 sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6">
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-sm text-brand-teal">{t.role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-8 bg-brand-teal" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
