"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
};

export function MagneticButton({
  children,
  href,
  className,
  variant = "primary",
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.25, y: y * 0.35 });
  };

  const base =
    "btn-shine relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "text-ink bg-brand-gradient bg-[length:200%_200%] hover:bg-[position:100%_50%] shadow-glow"
      : "text-ink glass hover:bg-slate-100";

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.3 }}
      className="inline-block"
      data-cursor="hover"
    >
      <span className={cn(base, styles, className)}>{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {Inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="inline-block">
      {Inner}
    </button>
  );
}
