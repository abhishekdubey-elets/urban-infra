"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SPEAKERS } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

const avatarGradients = [
  "from-brand-green to-brand-teal",
  "from-brand-teal to-brand-blue",
  "from-brand-blue to-brand-purple",
  "from-brand-purple to-brand-green",
];

export function Speakers() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
  }, [embla, onSelect]);

  return (
    <section id="speakers" className="relative py-24 sm:py-32">
      <div className="container-px">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Leading Voices from the Past"
            title="The leaders who shape the conversation"
            highlight={["leaders"]}
            subtitle="Ministers, commissioners, global financiers and innovators who have graced past editions."
          />
          <div className="flex gap-3">
            <button
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous"
              className="grid h-12 w-12 place-items-center rounded-full glass transition-all hover:bg-slate-100 disabled:opacity-30"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              aria-label="Next"
              className="grid h-12 w-12 place-items-center rounded-full glass transition-all hover:bg-slate-100 disabled:opacity-30"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden mask-fade-x" ref={emblaRef}>
          <div className="flex gap-6 px-1 pb-4">
            {SPEAKERS.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className={`group relative flex-none ${
                  s.featured ? "w-72" : "w-60"
                }`}
              >
                <div className="gradient-border h-full rounded-3xl p-6 text-center">
                  <div className="relative mx-auto">
                    <span
                      className={`absolute inset-0 mx-auto rounded-full bg-gradient-to-br ${
                        avatarGradients[i % avatarGradients.length]
                      } opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
                      style={{ width: s.featured ? 128 : 104, height: s.featured ? 128 : 104, left: 0, right: 0 }}
                    />
                    {s.image ? (
                      <div
                        className="relative mx-auto overflow-hidden rounded-full ring-2 ring-white/70 shadow-md"
                        style={{ width: s.featured ? 128 : 104, height: s.featured ? 128 : 104 }}
                      >
                        <Image
                          src={s.image}
                          alt={s.name}
                          fill
                          sizes="128px"
                          unoptimized
                          className="object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div
                        className={`relative mx-auto grid place-items-center rounded-full bg-gradient-to-br ${
                          avatarGradients[i % avatarGradients.length]
                        } font-display font-bold text-ink grayscale transition-all duration-500 group-hover:grayscale-0`}
                        style={{
                          width: s.featured ? 128 : 104,
                          height: s.featured ? 128 : 104,
                          fontSize: s.featured ? 38 : 30,
                        }}
                      >
                        {initials(s.name)}
                      </div>
                    )}
                    {s.featured && (
                      <span className="absolute -right-1 top-2 rounded-full bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-lime ring-1 ring-brand-lime/40">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                    {s.name}
                  </h3>
                  <div className="mt-1 overflow-hidden">
                    <p className="text-sm text-slate-600 transition-colors duration-300 group-hover:text-brand-teal">
                      {s.role}
                    </p>
                  </div>
                  <Quote className="mx-auto mt-4 h-5 w-5 text-slate-400 transition-colors group-hover:text-brand-teal/50" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Drag to explore · 2026 speaker line-up to be announced
        </p>
      </div>
    </section>
  );
}
