"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { MATTERS } from "@/lib/content";

export function WhyMatters() {
  return (
    <section id="why-matters" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why This Summit Matters"
          title="India's urban moment is now"
          highlight={["now"]}
          subtitle="The largest urban transition in human history is underway. The decisions made this decade will define the next century of Indian cities."
          align="center"
          className="mx-auto"
        />

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MATTERS.map((m) => (
            <StaggerItem key={m.title}>
              <TiltCard className="h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="gradient-border group relative h-full overflow-hidden rounded-3xl p-7"
                  style={{ transform: "translateZ(0)" }}
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-teal/10 blur-2xl transition-all duration-500 group-hover:bg-brand-teal/25" />
                  <div className="font-display text-4xl font-bold text-gradient">
                    {m.stat}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {m.body}
                  </p>
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
