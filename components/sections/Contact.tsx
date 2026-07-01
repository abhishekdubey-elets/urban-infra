"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-px grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Let's build the future of cities together"
            highlight={["future"]}
            subtitle="Reach out for delegate passes, speaking opportunities and partnership packages."
          />

          <div className="mt-8 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "summit@elets.in", href: "mailto:summit@elets.in" },
              { icon: Phone, label: "Phone", value: "+91 88606 00000", href: "tel:+918860600000" },
              { icon: MapPin, label: "Venue", value: "Bengaluru, Karnataka, India" },
            ].map((c, i) => (
              <Reveal key={c.label} direction="left" delay={i * 0.08}>
                <a
                  href={c.href ?? "#"}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-brand-teal/40"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-teal/10 text-brand-teal">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">
                      {c.label}
                    </span>
                    <span className="font-medium text-ink">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Stylised map */}
          <Reveal direction="up" delay={0.2}>
            <div className="relative mt-6 h-44 overflow-hidden rounded-2xl border border-slate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/15 via-ink to-brand-purple/15" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative grid h-4 w-4 place-items-center">
                  <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-brand-teal/60" />
                  <MapPin className="h-6 w-6 text-brand-lime" />
                </span>
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-slate-100/90 px-3 py-1 text-xs text-slate-700 backdrop-blur">
                Bengaluru · Karnataka
              </span>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal direction="left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="gradient-border rounded-3xl p-7 sm:p-9"
          >
            <h3 className="font-display text-xl font-semibold text-ink">
              Register your interest
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              We&apos;ll get back to you with delegate and partnership details.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" placeholder="Your name" />
              <Field label="Organisation" placeholder="Company / Department" />
              <Field label="Email" type="email" placeholder="you@org.com" />
              <Field label="Phone" placeholder="+91" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs uppercase tracking-wider text-slate-500">
                I&apos;m interested in
              </label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-ink outline-none transition-colors focus:border-brand-teal/60">
                <option className="bg-ink">Attending as a delegate</option>
                <option className="bg-ink">Sponsorship / partnership</option>
                <option className="bg-ink">Speaking opportunity</option>
                <option className="bg-ink">Media & press</option>
              </select>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn-shine mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient bg-[length:200%_200%] px-6 py-3.5 font-semibold text-ink transition-all hover:bg-[position:100%_50%]"
            >
              {sent ? (
                <>
                  <Check className="h-5 w-5" /> Thank you — we&apos;ll be in touch
                </>
              ) : (
                <>
                  Submit <Send className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-brand-teal/60"
      />
    </label>
  );
}
