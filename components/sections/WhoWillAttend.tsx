"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ATTENDEE_RINGS } from "@/lib/content";

export function WhoWillAttend() {
  const [active, setActive] = useState(0);
  const current = ATTENDEE_RINGS[active];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Who Will Attend"
          title="The entire urban ecosystem, convened"
          highlight={["ecosystem,"]}
          subtitle="Five worlds — government, industry, capital, technology and academia — meeting where decisions become projects."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          {/* Concentric rings */}
          <Reveal direction="right">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {ATTENDEE_RINGS.map((ring, i) => {
                const size = 100 - i * 18;
                const isActive = i === active;
                return (
                  <motion.button
                    key={ring.label}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-start rounded-full border"
                    style={{
                      width: `${size}%`,
                      height: `${size}%`,
                      borderColor: isActive
                        ? "rgba(31,194,201,0.7)"
                        : "rgba(255,255,255,0.12)",
                      boxShadow: isActive
                        ? "0 0 40px -8px rgba(31,194,201,0.5)"
                        : "none",
                    }}
                    animate={{ rotate: isActive ? 0 : 0 }}
                  >
                    <span
                      className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-brand-gradient text-ink"
                          : "bg-ink-100 text-slate-600 ring-1 ring-slate-200"
                      }`}
                    >
                      {ring.label}
                    </span>
                  </motion.button>
                );
              })}
              {/* center medallion */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 grid aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-center shadow-glow ring-1 ring-brand-teal/30">
                <span className="absolute -inset-2 animate-pulse-ring rounded-full bg-brand-teal/25" />
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="relative px-2"
                >
                  <div className="font-display text-2xl font-bold leading-none text-brand-lime sm:text-3xl">
                    {current.items.length}
                  </div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 sm:text-xs">
                    {current.label}
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>

          {/* Detail */}
          <Reveal direction="left">
            <motion.div
              key={current.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="gradient-border rounded-3xl p-8"
            >
              <h3 className="font-display text-3xl font-bold text-gradient">
                {current.label}
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {current.items.map((it) => (
                  <div
                    key={it}
                    className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700"
                  >
                    {it}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                {ATTENDEE_RINGS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ring ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-8 bg-brand-teal" : "w-4 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
