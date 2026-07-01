"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { KARNATAKA_CITIES } from "@/lib/content";

// Stylised Karnataka silhouette (approximate, decorative).
const KARNATAKA_PATH =
  "M30,18 C40,10 58,8 70,16 C82,8 96,14 96,26 C100,38 92,46 96,58 C100,70 88,78 80,86 C70,96 58,92 50,94 C40,98 30,90 28,80 C18,76 14,64 20,54 C12,46 16,34 24,30 C22,24 26,20 30,18 Z";

export function WhyKarnataka() {
  const [active, setActive] = useState<string | null>("Bengaluru");
  const current = KARNATAKA_CITIES.find((c) => c.name === active);

  return (
    <section id="karnataka" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Karnataka"
          title="A state engineering its urban tomorrow"
          highlight={["urban", "tomorrow"]}
          subtitle="From the global tech capital of Bengaluru to fast-rising Tier-II hubs, Karnataka is one of India's most dynamic urban investment landscapes."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* Map */}
          <Reveal direction="right">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div className="absolute inset-0 rounded-[40%] bg-brand-teal/10 blur-3xl" />
              <svg viewBox="0 0 120 110" className="relative h-full w-full">
                <defs>
                  <linearGradient id="kmap" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1FC2C9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6A57A6" stopOpacity="0.18" />
                  </linearGradient>
                </defs>

                {/* connection lines from active city to others */}
                {current &&
                  KARNATAKA_CITIES.filter((c) => c.name !== active).map((c) => (
                    <motion.line
                      key={c.name}
                      x1={current.x}
                      y1={current.y}
                      x2={c.x}
                      y2={c.y}
                      stroke="#1FC2C9"
                      strokeWidth="0.4"
                      strokeDasharray="1.5 1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                    />
                  ))}

                <motion.path
                  d={KARNATAKA_PATH}
                  fill="url(#kmap)"
                  stroke="rgba(31,194,201,0.55)"
                  strokeWidth="0.7"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* city nodes */}
                {KARNATAKA_CITIES.map((c) => {
                  const isActive = c.name === active;
                  return (
                    <g
                      key={c.name}
                      onMouseEnter={() => setActive(c.name)}
                      className="cursor-pointer"
                    >
                      {isActive && (
                        <motion.circle
                          cx={c.x}
                          cy={c.y}
                          r={2}
                          fill="none"
                          stroke="#8FD14F"
                          strokeWidth="0.5"
                          animate={{ r: [2, 5], opacity: [0.8, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                        />
                      )}
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={isActive ? 2 : 1.4}
                        fill={isActive ? "#8FD14F" : "#27B6D9"}
                        style={{
                          filter: isActive
                            ? "drop-shadow(0 0 4px #8FD14F)"
                            : "none",
                          transition: "all .3s",
                        }}
                      />
                      <text
                        x={c.x}
                        y={c.y - 3}
                        textAnchor="middle"
                        className="fill-slate-600"
                        style={{
                          fontSize: 3,
                          fontWeight: isActive ? 700 : 400,
                          opacity: isActive ? 1 : 0.55,
                        }}
                      >
                        {c.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </Reveal>

          {/* Detail + list */}
          <div>
            <Reveal direction="left">
              <div className="gradient-border min-h-[140px] rounded-3xl p-7">
                <motion.div
                  key={current?.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-xs uppercase tracking-[0.25em] text-brand-teal">
                    Spotlight City
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold text-ink">
                    {current?.name}
                  </h3>
                  <p className="mt-2 text-slate-600">{current?.note}</p>
                </motion.div>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {KARNATAKA_CITIES.map((c, i) => (
                <Reveal key={c.name} direction="up" delay={i * 0.05}>
                  <button
                    onMouseEnter={() => setActive(c.name)}
                    onClick={() => setActive(c.name)}
                    data-cursor="hover"
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                      active === c.name
                        ? "border-brand-teal/60 bg-brand-teal/10 text-ink shadow-glow"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-teal/25 hover:text-ink"
                    }`}
                  >
                    {c.name}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
