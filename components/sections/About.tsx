"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

const points = [
  "A flagship national convening on urban infrastructure & finance",
  "Government, investors and industry leaders under one roof",
  "From policy dialogue to a bankable project pipeline",
  "Two immersive days of high-impact sessions and dealmaking",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-px grid items-center gap-14 lg:grid-cols-2">
        {/* Left: content */}
        <div>
          <SectionHeading
            eyebrow="About the Summit"
            title="Where India's urban future is financed and built"
            highlight={["financed", "built"]}
            subtitle="As India urbanises at unprecedented speed, the gap between ambition and capital defines the decade ahead. This summit is the platform where that gap closes."
          />
          <div className="mt-8 space-y-4">
            {points.map((p, i) => (
              <Reveal key={p} direction="left" delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-teal" />
                  <p className="text-white/75">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: animated illustration */}
        <div ref={ref} className="relative">
          <motion.div style={{ y }} className="relative mx-auto max-w-md">
            <motion.div
              style={{ rotate }}
              className="gradient-border relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-teal/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-purple/30 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { k: "2 Days", v: "Programme" },
                  { k: "40+", v: "Sessions" },
                  { k: "120+", v: "Speakers" },
                  { k: "1500+", v: "Delegates" },
                ].map((b) => (
                  <div key={b.v} className="rounded-2xl glass p-5">
                    <div className="font-display text-2xl font-bold text-white">
                      {b.k}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/50">
                      {b.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-4 rounded-2xl bg-brand-gradient p-5 text-ink">
                <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  Vision
                </div>
                <div className="mt-1 font-display text-lg font-bold">
                  Viksit Bharat 2047
                </div>
                <p className="mt-1 text-sm opacity-80">
                  Building the resilient, smart and investment-ready cities of a
                  developed India.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
