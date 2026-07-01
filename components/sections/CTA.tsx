"use client";

import { motion } from "framer-motion";
import { SkylineScene } from "@/components/hero/SkylineScene";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SUMMIT } from "@/lib/content";

export function CTA() {
  return (
    <section id="register" className="relative overflow-hidden py-28 sm:py-36">
      {/* skyline backdrop */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] opacity-40">
        <SkylineScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-200 to-transparent" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[140px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-px relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              {SUMMIT.location} · {SUMMIT.date}
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
              Join policymakers, investors and urban leaders shaping the{" "}
              <span className="text-gradient animate-gradient-pan">future of cities</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
              Be part of the conversations that turn ambition into resilient,
              sustainable and investment-ready cities.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={SUMMIT.cta.register}>Register</MagneticButton>
              <MagneticButton href={SUMMIT.cta.partner} variant="ghost">
                Sponsor
              </MagneticButton>
              <MagneticButton href={SUMMIT.cta.speak} variant="ghost">
                Speak
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
