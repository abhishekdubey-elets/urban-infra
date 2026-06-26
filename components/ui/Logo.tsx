"use client";

import { cn } from "@/lib/utils";

/**
 * Renders the official summit logo.
 *
 * The supplied logo artwork uses dark navy text, so on the dark UI it sits on a
 * soft white "badge" to stay legible and on-brand. Drop the artwork in at
 * `public/logo.png` (transparent or white background both work).
 */
export function Logo({
  className,
  height = 40,
  badge = true,
}: {
  className?: string;
  height?: number;
  badge?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center transition-transform duration-300",
        badge &&
          "rounded-xl bg-white px-2.5 py-1.5 shadow-[0_6px_24px_-8px_rgba(31,194,201,0.45)] ring-1 ring-white/40",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Urban Infrastructure & Investment Summit, Karnataka"
        height={height}
        style={{ height, width: "auto" }}
        className="block w-auto select-none"
        draggable={false}
      />
    </span>
  );
}
