"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CloudRain,
  Droplets,
  Home,
  TramFront,
  Recycle,
  Landmark,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_NOW } from "@/lib/content";

const icons = {
  Climate: CloudRain,
  Water: Droplets,
  Housing: Home,
  Mobility: TramFront,
  Waste: Recycle,
  Finance: Landmark,
};

export function WhyNow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Now"
          title="Six converging challenges demand action today"
          highlight={["today"]}
          subtitle="The cost of inaction compounds every year. These interlocking pressures make this the decisive decade for India's cities."
        />

        <div ref={ref} className="relative mt-16">
          {/* Center line */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-brand-gradient"
            />
          </div>

          <div className="space-y-8 md:space-y-2">
            {WHY_NOW.map((item, i) => {
              const Icon = icons[item.key as keyof typeof icons];
              const left = i % 2 === 0;
              return (
                <div
                  key={item.key}
                  className={`relative flex md:items-center ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-gradient shadow-glow">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      left ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="gradient-border group rounded-2xl p-6 transition-shadow hover:shadow-glow"
                    >
                      <div className="flex items-center gap-4">
                        <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-white/5 text-brand-teal transition-colors group-hover:bg-brand-teal/15">
                          <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="font-display text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-h-0 overflow-hidden text-sm text-white/0 transition-all duration-500 group-hover:max-h-32 group-hover:text-white/65 md:text-white/65 md:max-h-32">
                        {item.body}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
