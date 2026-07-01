"use client";

import { useState } from "react";
import { Linkedin, Twitter, Youtube, Instagram, ArrowUp, Send } from "lucide-react";
import { NAV_LINKS, SUMMIT } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter / X" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative border-t border-slate-200 pt-16">
      <div className="container-px">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand + newsletter */}
          <div>
            <Logo height={52} />
            <p className="mt-4 max-w-sm text-sm text-slate-600">
              {SUMMIT.theme}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1.5"
            >
              <input
                type="email"
                required
                placeholder="Subscribe for updates"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-9 w-9 flex-none place-items-center rounded-full bg-brand-gradient text-ink"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-brand-lime">Subscribed — thank you!</p>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">
              Participate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                ["Register", SUMMIT.cta.register],
                ["Become a Partner", SUMMIT.cta.partner],
                ["Become a Speaker", SUMMIT.cta.speak],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-slate-600 transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizer + social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800">
              Organised by
            </h4>
            <p className="mt-4 text-sm text-slate-600">
              {SUMMIT.organizer}
              <br />
              Driving public-sector innovation across India.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-brand-teal/40 hover:text-brand-teal"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 {SUMMIT.organizer}. All rights reserved. · {SUMMIT.name}
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-ink"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
