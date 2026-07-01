"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  GraduationCap,
  Handshake,
  Landmark,
  Megaphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { WHY_ATTEND } from "@/lib/content";
import { cn } from "@/lib/utils";

const span: Record<string, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-2",
  sm: "sm:col-span-1",
};

const icons: Record<string, LucideIcon> = {
  Landmark,
  TrendingUp,
  Handshake,
  Cpu,
  Megaphone,
  GraduationCap,
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
          {WHY_ATTEND.map((c) => {
            const Icon = icons[c.icon] ?? Sparkles;
            return (
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
                {/* decorative watermark icon filling the blank space */}
                <Icon
                  aria-hidden
                  strokeWidth={1.25}
                  className={cn(
                    "pointer-events-none absolute -bottom-4 -right-4 text-brand-teal/10 transition-all duration-500 group-hover:scale-110 group-hover:text-brand-teal/20",
                    c.size === "lg" ? "h-52 w-52" : "h-32 w-32"
                  )}
                />
                <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-brand-teal/10 text-brand-teal ring-1 ring-brand-teal/20">
                  <Icon className="h-6 w-6" />
                </span>
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
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
