import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

const timezoneTools = [
  {
    name: "Add/Subtract Time Across Zones Calculator",
    description: "Add or subtract time considering timezone differences",
    href: "/timezone-tools/add-subtract-time-across-zones-calculator",
  },
  {
    name: "Country Time Zone List/Current Time Finder",
    description: "Browse time zones by country with current times",
    href: "/timezone-tools/country-time-zone-list-current-time-finder",
  },
  {
    name: "Daylight Saving Time Calculator/Schedule",
    description: "Check DST transitions and schedules worldwide",
    href: "/timezone-tools/daylight-saving-time-calculator-schedule",
  },
  {
    name: "Flight Time/Time Zone Arrival Calculator",
    description: "Calculate arrival times across time zones",
    href: "/timezone-tools/flight-time-time-zone-arrival-calculator",
  },
  {
    name: "Historical Time Zone Converter",
    description: "Convert times using historical timezone rules",
    href: "/timezone-tools/historical-time-zone-converter",
  },
  {
    name: "International Phone Call Time Finder",
    description: "Find good times to call across time zones",
    href: "/timezone-tools/international-phone-call-time-finder",
  },
  {
    name: "Live Countdown Timer Across Time Zones",
    description: "Create countdowns that show multiple timezones",
    href: "/timezone-tools/live-countdown-timer-across-time-zones",
  },
  {
    name: "Meeting Planner Across Time Zones",
    description: "Find meeting times that work across timezones",
    href: "/timezone-tools/meeting-planner-across-time-zones",
  },
  {
    name: "Military Time Converter (24-Hour Clock)",
    description: "Convert between 12-hour and 24-hour time formats",
    href: "/timezone-tools/military-time-converter-24-hour-clock",
  },
  {
    name: "Time Zone Abbreviation Lookup/Decoder",
    description: "Look up timezone abbreviations like EST, PST, CET",
    href: "/timezone-tools/time-zone-abbreviation-lookup-decoder",
  },
  {
    name: "Time Zone Difference Calculator",
    description: "Calculate time difference between two zones",
    href: "/timezone-tools/time-zone-difference-calculator",
  },
  {
    name: "Timezone Database (IANA) Lookup",
    description: "Search the IANA timezone database",
    href: "/timezone-tools/timezone-database-iana-lookup",
  },
  {
    name: "Timezone Map/Visual Finder",
    description: "Find timezones visually on a world map",
    href: "/timezone-tools/timezone-map-visual-finder",
  },
  {
    name: "Timezone Widget/Clock Embed Generator",
    description: "Generate embeddable timezone widgets for websites",
    href: "/timezone-tools/timezone-widget-clock-embed-generator",
  },
  {
    name: "World Clock/Time Zone Converter",
    description: "View current times in multiple cities worldwide",
    href: "/timezone-tools/world-clock-time-zone-converter",
  },
];

export const metadata: Metadata = {
  title: "Free Timezone Tools Online - 15 Time Zone Converter Tools",
  description:
    "Free online timezone tools for converting times between time zones. Meeting planner, world clock, DST calculator, flight time calculator. All tools run in your browser.",
  openGraph: {
    title: "Free Timezone Tools Online - 15 Time Zone Converter Tools",
    description:
      "Free online timezone tools for converting times between time zones. Meeting planner, world clock, DST calculator, flight time calculator. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/timezone-tools",
  },
};

export default function TimezoneToolsPage() {
  const faqsData = [
    {
      question: "Are these timezone tools really free?",
      answer:
        "Yes. All 15 timezone tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your time and location data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "How accurate are these timezone conversions?",
      answer:
        "Tools use the IANA Time Zone Database (tz database) which is the standard for timezone information. Data is updated regularly to reflect DST changes and timezone rule updates.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Do these tools account for Daylight Saving Time?",
      answer:
        "Yes. All conversions automatically account for DST rules based on the date and location. Historical and future DST transitions are included.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Timezone Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online timezone tools for converting times between time zones.
              Meeting planner, world clock, DST calculator — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={timezoneTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Time Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our date-time tools or timestamp tools for more utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/date-time-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Date & Time Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These Timezone Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 15 free timezone tools that run entirely in your browser. No software installation, no server calls, no waiting. You select cities or timezones, enter times, and get conversions instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting times between timezones, planning across timezones (meetings, calls, flights), understanding timezone information (abbreviations, DST, differences), and displaying time globally (world clock, country lists, maps).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Select source and target timezones or cities</li>
              <li>Enter the time or date to convert</li>
              <li>View the converted time with DST information</li>
              <li>Copy or share the result</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript and the IANA timezone database. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Remote workers</strong> schedule meetings across timezones, find good times for international calls, or coordinate with distributed teams.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Travelers</strong> calculate flight arrival times, check local times at destinations, or understand DST transitions during trips.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Customer support teams</strong> determine business hours across regions, schedule callbacks, or coordinate with international offices.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Event organizers</strong> plan webinars for global audiences, create countdown timers showing multiple timezones, or schedule broadcasts.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Time Conversion</h3>
            <p className="text-muted-foreground mb-4">
              World Clock/Time Zone Converter converts between any timezones. Time Zone Difference Calculator shows hour differences. Historical Time Zone Converter uses past timezone rules.
            </p>

            <h3 className="text-xl font-semibold mb-3">Meeting Planning</h3>
            <p className="text-muted-foreground mb-4">
              Meeting Planner Across Time Zones finds overlapping business hours. International Phone Call Time Finder suggests good call times. Live Countdown Timer shows countdowns in multiple zones.
            </p>

            <h3 className="text-xl font-semibold mb-3">Travel & Transportation</h3>
            <p className="text-muted-foreground mb-4">
              Flight Time/Time Zone Arrival Calculator computes arrival times. Add/Subtract Time Across Zones handles duration calculations.
            </p>

            <h3 className="text-xl font-semibold mb-3">Timezone Reference</h3>
            <p className="text-muted-foreground mb-4">
              Country Time Zone List shows zones by country. Time Zone Abbreviation Lookup decodes EST, PST, CET, etc. Timezone Database (IANA) Lookup searches the official database. Daylight Saving Time Calculator shows DST transitions.
            </p>

            <h3 className="text-xl font-semibold mb-3">Visual Tools</h3>
            <p className="text-muted-foreground mb-4">
              Timezone Map/Visual Finder shows zones on a world map. Timezone Widget/Clock Embed Generator creates embeddable clocks. Military Time Converter switches between 12/24 hour formats.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>DST transitions:</strong> Some countries change DST rules frequently. Tools use current IANA database but verify for critical planning.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Timezone abbreviations:</strong> Abbreviations like "CT" are ambiguous (Central Time, China Time, Cuba Time). Use full timezone names when possible.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Half-hour offsets:</strong> Some timezones use 30 or 45-minute offsets (India +5:30, Nepal +5:45). Tools handle these correctly.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Historical dates:</strong> Timezone rules have changed throughout history. Historical conversions use best-available data but may not reflect local practices.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Timezone tools often mean checking multiple websites, using phone world clock apps, or calculating offsets manually. But scheduling a call between London, New York, and Sydney shouldn't require mental math or DST research. These tools exist because coordinating across timezones is hard enough without fighting your tools. Everything runs in your browser — no installation, no account, no confusion about what time it is in Tokyo.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
