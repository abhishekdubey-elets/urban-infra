"use client";

import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  highlight = [],
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal direction="up">
        <span className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
          {eyebrow}
        </span>
      </Reveal>
      <TextReveal
        text={title}
        highlight={highlight}
        className={cn(
          "max-w-4xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl",
          align === "center" && "justify-center"
        )}
      />
      {subtitle && (
        <Reveal direction="up" delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
