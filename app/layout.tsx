import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SUMMIT } from "@/lib/content";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://urban-infra-summit.example"),
  title: {
    default: `${SUMMIT.name}`,
    template: `%s | ${SUMMIT.shortName}`,
  },
  description: `${SUMMIT.theme}. ${SUMMIT.location}, ${SUMMIT.date}. The flagship national platform uniting government, investors and innovators to finance the future of resilient, smart and investment-ready cities.`,
  keywords: [
    "urban infrastructure",
    "smart cities",
    "investment summit",
    "Karnataka",
    "Bengaluru",
    "municipal finance",
    "Elets",
    "sustainable cities",
  ],
  openGraph: {
    title: SUMMIT.name,
    description: SUMMIT.theme,
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
