import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/providers/Cursor";
import ScrollProgress from "@/components/providers/ScrollProgress";
import Loader from "@/components/providers/Loader";
import { Ambience } from "@/components/ui/Ambience";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { WhyMatters } from "@/components/sections/WhyMatters";
import { WhyKarnataka } from "@/components/sections/WhyKarnataka";
import { WhyNow } from "@/components/sections/WhyNow";
import { FocusSectors } from "@/components/sections/FocusSectors";
import { Tracks } from "@/components/sections/Tracks";
import { Speakers } from "@/components/sections/Speakers";
import { WhoWillAttend } from "@/components/sections/WhoWillAttend";
import { WhyAttend } from "@/components/sections/WhyAttend";
import { PastPartners } from "@/components/sections/PastPartners";
import { PastGlimpses } from "@/components/sections/PastGlimpses";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SUMMIT } from "@/lib/content";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: SUMMIT.name,
    description: SUMMIT.theme,
    startDate: "2026-08",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Bengaluru",
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
    },
    organizer: { "@type": "Organization", name: SUMMIT.organizer },
  };

  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Ambience />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <StatsStrip />
        <WhyMatters />
        <WhyKarnataka />
        <WhyNow />
        <FocusSectors />
        <Tracks />
        <Speakers />
        <WhoWillAttend />
        <WhyAttend />
        <PastPartners />
        <PastGlimpses />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </SmoothScroll>
  );
}
