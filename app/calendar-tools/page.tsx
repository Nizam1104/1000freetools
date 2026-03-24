import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const calendarTools = [
  {
    name: "Academic Calendar Maker",
    description: "Create custom academic calendars with semesters and holidays",
    href: "/calendar-tools/academic-calendar-maker",
  },
  {
    name: "Advent Calendar Creator",
    description: "Design personalized Advent calendars for the holiday season",
    href: "/calendar-tools/advent-calendar-creator",
  },
  {
    name: "Business Hours Calculator",
    description: "Calculate working hours between dates excluding weekends and holidays",
    href: "/calendar-tools/business-hours-calculator",
  },
  {
    name: "Calendar Matrix Generator",
    description: "Generate calendar grids and matrices for any year",
    href: "/calendar-tools/calendar-matrix-generator",
  },
  {
    name: "Calendar RSS Generator",
    description: "Create RSS feeds from calendar events for subscriptions",
    href: "/calendar-tools/calendar-rss-generator",
  },
  {
    name: "Calendar Sync Overlay",
    description: "Merge and overlay multiple calendar sources",
    href: "/calendar-tools/calendar-sync-overlay",
  },
  {
    name: "Date Picker Generator",
    description: "Create embeddable date picker components",
    href: "/calendar-tools/date-picker-generator",
  },
  {
    name: "Event Countdown",
    description: "Create countdown timers to specific events or dates",
    href: "/calendar-tools/event-countdown",
  },
  {
    name: "Fiscal Year Calendar",
    description: "Generate fiscal year calendars for business planning",
    href: "/calendar-tools/fiscal-year-calendar",
  },
  {
    name: "Hijri Calendar Converter",
    description: "Convert between Gregorian and Islamic Hijri calendar dates",
    href: "/calendar-tools/hijri-calendar-converter",
  },
  {
    name: "Moon Phase Calendar",
    description: "Display moon phases for any month or year",
    href: "/calendar-tools/moon-phase-calendar",
  },
  {
    name: "Online Calendar Holidays",
    description: "Browse and add public holidays from countries worldwide",
    href: "/calendar-tools/online-calendar-holidays",
  },
  {
    name: "Payday Calculator",
    description: "Calculate paydates based on pay frequency and start date",
    href: "/calendar-tools/payday-calculator",
  },
  {
    name: "Perpetual Calendar",
    description: "View any date from any year with day of week",
    href: "/calendar-tools/perpetual-calendar",
  },
  {
    name: "Pregnancy Due Date Calendar",
    description: "Calculate due dates and track pregnancy milestones",
    href: "/calendar-tools/pregnancy-due-date-calendar",
  },
  {
    name: "Printable Calendar Maker",
    description: "Design and print custom calendars in various formats",
    href: "/calendar-tools/printable-calendar-maker",
  },
  {
    name: "Seasonal Calendar",
    description: "View astronomical and meteorological season dates",
    href: "/calendar-tools/seasonal-calendar",
  },
];

export const metadata: Metadata = {
  title: "Free Calendar Tools Online - 17 Date & Calendar Utilities",
  description:
    "Free online calendar tools for date calculations, calendar generation, and event planning. Calculate business days, create calendars, convert time zones. All tools run in your browser.",
  openGraph: {
    title: "Free Calendar Tools Online - 20 Date & Calendar Utilities",
    description:
      "Free online calendar tools for date calculations, calendar generation, and event planning. Calculate business days, create calendars, convert time zones. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/calendar-tools",
  },
};

export default function CalendarToolsPage() {
  const faqsData = [
    {
      question: "Are these calendar tools really free?",
      answer:
        "Yes. All 20 calendar tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my calendar data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your calendar data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "Can I print calendars created with these tools?",
      answer:
        "Yes. The Printable Calendar Maker generates print-ready PDFs. Other calendars can be printed directly from your browser using the print function.",
    },
    {
      question: "Do these tools work offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "What calendar systems are supported?",
      answer:
        "Tools primarily use the Gregorian calendar. The Hijri Calendar Converter also supports the Islamic lunar calendar. Week numbers follow ISO 8601 standards.",
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
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Calendar Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online calendar tools for date calculations, calendar generation, and event planning.
              Calculate business days, create custom calendars, convert time zones — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={calendarTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Date Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our date-time tools for more date utilities, or explore all available tools.
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
              What These Calendar Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 17 free calendar tools that run entirely in your browser. No software installation, no subscriptions, no waiting. You pick a date or upload events, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: calculating dates and durations (add days, find business hours, calculate paydays), generating calendars (printable, academic, fiscal year, moon phases), converting between systems (time zones, Hijri calendar), and planning events (countdowns, holiday calendars, sync overlays).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Select a date using the picker or enter manually</li>
              <li>Choose your calculation or output format</li>
              <li>Adjust settings like holidays, weekends, or time zones</li>
              <li>View results, print, or download as PDF/ICS</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your calendar data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Project managers</strong> calculate business days between milestones, generate Gantt-style fiscal calendars, or plan around international holidays for distributed teams.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>HR and payroll teams</strong> compute paydates for biweekly or monthly schedules, track employee vacation days, or generate onboarding calendars for new hires.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Teachers and administrators</strong> create academic calendars with semester dates, plan around school holidays, or generate printable calendars for classroom use.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Event planners</strong> build countdown timers for weddings or conferences, check moon phases for outdoor events, or overlay multiple calendar sources for venue scheduling.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Date Calculations</h3>
            <p className="text-muted-foreground mb-4">
              Date Calculator adds or subtracts days, weeks, months, and years. Business Hours Calculator counts working days excluding weekends and holidays. Week Number Calculator returns the ISO 8601 week number. Payday Calculator projects paydates based on frequency.
            </p>

            <h3 className="text-xl font-semibold mb-3">Calendar Generation</h3>
            <p className="text-muted-foreground mb-4">
              Printable Calendar Maker produces PDFs in monthly, weekly, or yearly formats. Academic Calendar Maker builds semester-based calendars. Fiscal Year Calendar generates business year views. Moon Phase Calendar displays lunar cycles. Advent Calendar Creator designs holiday countdowns.
            </p>

            <h3 className="text-xl font-semibold mb-3">Time and Zone Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Time Zone Converter translates times between geographic zones. Hijri Calendar Converter maps Gregorian dates to Islamic lunar calendar dates. Seasonal Calendar shows equinox and solstice dates.
            </p>

            <h3 className="text-xl font-semibold mb-3">Event Planning</h3>
            <p className="text-muted-foreground mb-4">
              Event Countdown creates timers to target dates. Online Calendar Holidays browses public holidays by country. Calendar RSS Generator produces subscribable event feeds. Calendar Sync Overlay merges multiple calendar sources.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Calendars</h3>
            <p className="text-muted-foreground mb-4">
              Pregnancy Due Date Calendar tracks gestation milestones. Perpetual Calendar displays any historical or future date. Calendar Matrix Generator produces grid layouts for custom applications. Date Picker Generator creates embeddable calendar widgets.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Holiday data:</strong> Holiday calendars are provided as reference only. Official holiday dates vary by jurisdiction and may change.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Time zones:</strong> DST transitions can shift UTC offsets. Always verify times near DST boundaries.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Hijri calendar:</strong> Islamic calendar dates depend on moon sightings and vary by region. Conversions are approximate.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Print formatting:</strong> Browser print settings affect output. Use landscape orientation for wide calendars and check "background graphics" for colors.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Calendar software often means buying expensive subscriptions or wrestling with bloated productivity suites. But sometimes you just need to know what date it will be in 90 days, print a calendar for your classroom, or check if a date falls on a bank holiday. These tools exist because calendar math shouldn't require a PhD or a credit card. Everything runs in your browser — no account, no sync, no upsells.
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
