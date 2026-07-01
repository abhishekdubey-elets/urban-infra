"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { WHY_ATTEND } from "@/lib/content";
import { cn } from "@/lib/utils";

const span: Record<string, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-2",
  sm: "sm:col-span-1",
};

export function WhyAttend() {
  return (
    <section id="attend" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why Attend"
          title="Five reasons leaders never miss it"
          highlight={["leaders"]}
          subtitle="A return on attention measured in policy influence, partnerships and pipeline."
        />

        <Stagger
          stagger={0.07}
          className="mt-12 grid auto-rows-[150px] grid-cols-1 gap-4 sm:grid-cols-4"
        >
          {WHY_ATTEND.map((c) => (
            <StaggerItem
              key={c.title}
              direction="scale"
              className={cn(span[c.size])}
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/80 p-6"
                data-cursor="hover"
              >
                {/* morphing background */}
                <div className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-10 -top-10 h-40 w-40 animate-float-slow rounded-full bg-brand-teal/20 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 h-40 w-40 animate-float rounded-full bg-brand-purple/20 blur-3xl" />
                </div>
                <Sparkles className="relative h-6 w-6 text-brand-teal" />
                <div className="relative">
                  <h3
                    className={cn(
                      "font-display font-semibold text-slate-900",
                      c.size === "lg" ? "text-2xl" : "text-lg"
                    )}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed text-slate-600",
                      c.size === "sm" && "hidden sm:block"
                    )}
                  >
                    {c.body}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
