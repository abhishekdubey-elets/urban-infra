"use client";

import { Reveal } from "@/components/ui/Reveal";

const partners = [
  "Smart City Mission",
  "NITI Aayog",
  "HUDCO",
  "World Bank",
  "ADB",
  "BBMP",
  "KUIDFC",
  "NIUA",
  "AMRUT",
  "Urban Dev. Dept.",
  "C40 Cities",
  "GIZ",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex w-max">
      <div
        className={`flex shrink-0 items-center gap-4 ${
          reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"
        }`}
      >
        {[...partners, ...partners].map((p, i) => (
          <div
            key={i}
            className="group flex h-16 min-w-[180px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-7 transition-colors hover:border-white/25"
          >
            <span className="font-display text-sm font-semibold text-white/40 transition-all duration-300 group-hover:text-gradient">
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PastPartners() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-px">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              Past Partners & Supporters
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
              Trusted by the institutions{" "}
              <span className="text-gradient">building India&apos;s cities</span>
            </h2>
          </div>
        </Reveal>
      </div>

      <div className="group mt-12 space-y-4 mask-fade-x [&:hover_*]:[animation-play-state:paused]">
        <div className="overflow-hidden">
          <Row />
        </div>
        <div className="overflow-hidden">
          <Row reverse />
        </div>
      </div>
    </section>
  );
}
