"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Cpu,
  TramFront,
  Droplets,
  Leaf,
  Home,
  Handshake,
  Coins,
  Boxes,
  LineChart,
  Sun,
  Train,
  Plug,
  Map,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SECTORS } from "@/lib/content";

const icons = [
  Building2,
  Cpu,
  TramFront,
  Droplets,
  Leaf,
  Home,
  Handshake,
  Coins,
  Boxes,
  LineChart,
  Sun,
  Train,
  Plug,
  Map,
];

export function FocusSectors() {
  return (
    <section id="sectors" className="relative py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="Focus Sectors"
          title="The full spectrum of urban transformation"
          highlight={["urban", "transformation"]}
          subtitle="From hard infrastructure to digital twins and green finance — every lever of the investment-ready city."
          align="center"
          className="mx-auto"
        />

        <Stagger
          stagger={0.05}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {SECTORS.map((label, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={label} direction="scale">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="gradient-border group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl p-5"
                  data-cursor="hover"
                >
                  <div className="absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-teal/25 blur-2xl" />
                  </div>
                  <span className="relative grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/5 text-brand-teal transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-teal/15 group-hover:text-brand-lime">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="relative text-sm font-medium leading-tight text-white/85">
                    {label}
                  </span>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
