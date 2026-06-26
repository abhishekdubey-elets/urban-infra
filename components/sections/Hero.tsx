"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, CalendarDays, ArrowDown } from "lucide-react";
import { SUMMIT, HERO_STATS } from "@/lib/content";
import { SkylineScene } from "@/components/hero/SkylineScene";
import { Particles } from "@/components/hero/Particles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Counter } from "@/components/ui/Counter";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Subtle mouse-parallax for floating glass chips
  const onMouse = (e: React.MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    const rx = (e.clientX / w - 0.5) * 2;
    const ry = (e.clientY / h - 0.5) * 2;
    ref.current?.style.setProperty("--px", `${rx}`);
    ref.current?.style.setProperty("--py", `${ry}`);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouse}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Skyline backdrop */}
      <motion.div
        style={{ y: skylineY }}
        className="absolute inset-x-0 bottom-0 h-[62%] opacity-90"
      >
        <SkylineScene />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </motion.div>

      <Particles />

      {/* floating glass info chips with mouse parallax */}
      <FloatingChip
        className="left-[6%] top-[26%] hidden xl:flex"
        depth={1.4}
        title="Net-Zero Districts"
        sub="Climate-ready by design"
      />
      <FloatingChip
        className="right-[7%] top-[32%] hidden xl:flex"
        depth={-1.8}
        title="$840B Pipeline"
        sub="Investment-ready cities"
      />
      <FloatingChip
        className="right-[14%] bottom-[20%] hidden xl:flex"
        depth={1.1}
        title="Digital Twins"
        sub="AI-led urban operations"
      />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-px relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              {SUMMIT.edition} · {SUMMIT.organizer}
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.4rem]">
            <RevealLine text="Financing the Future of" delay={0.4} />
            <span className="mt-1 block">
              <RevealLine
                text="Resilient, Smart & Investment-Ready Cities"
                delay={0.55}
                gradient
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            The 9th Elets National Urban Infrastructure & Investment Summit unites
            policymakers, investors and innovators to shape India&apos;s urban future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-teal" /> {SUMMIT.location}
            </span>
            <span className="h-4 w-px bg-white/15" />
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-teal" /> {SUMMIT.date}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href={SUMMIT.cta.register}>Register Now</MagneticButton>
            <MagneticButton href={SUMMIT.cta.partner} variant="ghost">
              Become a Partner
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="gradient-border rounded-2xl px-5 py-6 text-center backdrop-blur-md"
              >
                <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                  <Counter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    plain={(s as { plain?: boolean }).plain}
                  />
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-white/55">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-brand-teal"
          />
        </motion.div>
      </motion.a>
    </section>
  );
}

function RevealLine({
  text,
  delay = 0,
  gradient = false,
}: {
  text: string;
  delay?: number;
  gradient?: boolean;
}) {
  return (
    <span className="block overflow-hidden py-1">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={gradient ? "block text-gradient animate-gradient-pan" : "block"}
      >
        {text}
      </motion.span>
    </span>
  );
}

function FloatingChip({
  className,
  title,
  sub,
  depth,
}: {
  className: string;
  title: string;
  sub: string;
  depth: number;
}) {
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      style={{
        transform: `translate3d(calc(var(--px,0) * ${depth * 14}px), calc(var(--py,0) * ${depth * 14}px), 0)`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
    >
      <div className="animate-float rounded-2xl glass-strong px-4 py-3 shadow-glass">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-white/55">{sub}</div>
      </div>
    </motion.div>
  );
}
