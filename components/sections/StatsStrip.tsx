"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { STATS_STRIP } from "@/lib/content";

export function StatsStrip() {
  return (
    <section className="relative border-y border-slate-200 py-12">
      <div className="container-px grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATS_STRIP.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 0.08}>
            <div className="text-center">
              <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm uppercase tracking-widest text-slate-500">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
