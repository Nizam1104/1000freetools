import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Clock3, ArrowRight } from "lucide-react";

const dateTimeTools = [
  {
    name: "Add/Subtract Time",
    description: "Add or subtract hours, minutes, seconds from a time",
    href: "/date-time-tools/add-subtract-time",
  },
  {
    name: "Age Calculator",
    description: "Calculate exact age from birthdate in years, months, days",
    href: "/date-time-tools/age-calculator",
  },
  {
    name: "Business Days Calculator",
    description: "Count business days between two dates",
    href: "/date-time-tools/business-days-calculator",
  },
  {
    name: "Calendar Generator",
    description: "Generate printable calendars for any month or year",
    href: "/date-time-tools/calendar-generator",
  },
  {
    name: "Countdown Timer",
    description: "Create countdown timers to specific dates and times",
    href: "/date-time-tools/countdown-timer",
  },
  {
    name: "Date Calculator",
    description: "Add or subtract days, weeks, months, years from dates",
    href: "/date-time-tools/date-calculator",
  },
  {
    name: "Date Difference in Units",
    description: "Calculate difference between dates in years, months, days",
    href: "/date-time-tools/date-difference-in-units",
  },
  {
    name: "Date Pattern Finder",
    description: "Find repeating patterns in date sequences",
    href: "/date-time-tools/date-pattern-finder",
  },
  {
    name: "Date Range Calculator",
    description: "Calculate start and end dates for given ranges",
    href: "/date-time-tools/date-range-calculator",
  },
  {
    name: "Day Counter",
    description: "Count days between two dates including exclusions",
    href: "/date-time-tools/day-counter",
  },
  {
    name: "Day of Week Finder",
    description: "Find what day of the week any date falls on",
    href: "/date-time-tools/day-of-week-finder",
  },
  {
    name: "Leap Year Checker",
    description: "Check if a year is a leap year",
    href: "/date-time-tools/leap-year-checker",
  },
  {
    name: "Military Time Converter",
    description: "Convert between 12-hour and 24-hour time formats",
    href: "/date-time-tools/military-time-converter",
  },
  {
    name: "Seconds Converter",
    description: "Convert seconds to hours, minutes, days format",
    href: "/date-time-tools/seconds-converter",
  },
  {
    name: "Sunrise/Sunset Calculator",
    description: "Calculate sunrise and sunset times for any location",
    href: "/date-time-tools/sunrise-sunset-calculator",
  },
  {
    name: "Time Duration Calculator",
    description: "Calculate duration between two times",
    href: "/date-time-tools/time-duration-calculator",
  },
  {
    name: "Time Until Calculator",
    description: "Calculate time remaining until a future date",
    href: "/date-time-tools/time-until-calculator",
  },
  {
    name: "Week Number Calculator",
    description: "Find ISO week number for any date",
    href: "/date-time-tools/week-number-calculator",
  },
];

export const metadata: Metadata = {
  title: "Free Date & Time Tools Online - 18 DateTime Calculators",
  description:
    "Free online date and time tools for calculations, conversions, and planning. Calculate age, count days, convert timestamps, find day of week. All tools run in your browser.",
  openGraph: {
    title: "Free Date & Time Tools Online - 19 DateTime Calculators",
    description:
      "Free online date and time tools for calculations, conversions, and planning. Calculate age, count days, convert timestamps, find day of week. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/date-time-tools",
  },
};

export default function DateTimeToolsPage() {
  const faqsData = [
    {
      question: "Are these date and time tools really free?",
      answer:
        "Yes. All 19 date and time tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your dates and times never leave your device or get uploaded to any server.",
    },
    {
      question: "What date formats are supported?",
      answer:
        "Tools accept multiple formats including MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD (ISO 8601), and natural language dates like 'next Friday' or 'in 30 days'.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "How accurate is the age calculator?",
      answer:
        "The Age Calculator computes exact age down to the day, accounting for leap years and varying month lengths. It shows years, months, and days.",
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
              <Clock3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Date & Time Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online date and time tools for calculations, conversions, and planning.
              Calculate age, count days, convert timestamps — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={dateTimeTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Time Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our timestamp tools, timezone tools, or calendar tools for more utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/timestamp-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Timestamp Tools
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
              What These Date & Time Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 18 free date and time tools that run entirely in your browser. No software installation, no subscriptions, no waiting. You pick dates or times, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: calculating durations and differences (age, business days, time between dates), adding and subtracting time (days, hours, seconds), converting between formats (Unix timestamp, military time, seconds), and finding date information (day of week, week number, leap year, sunrise/sunset).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Select a date using the picker or enter manually</li>
              <li>Choose your calculation or conversion type</li>
              <li>Adjust settings like time format or exclusions</li>
              <li>View results and copy or download</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>HR and payroll teams</strong> calculate employee age for benefits, count business days for PTO requests, or determine tenure for anniversaries.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Project managers</strong> compute project durations, find end dates from start dates, or calculate time remaining until milestones.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> convert Unix timestamps for debugging, calculate time differences for logging, or validate date calculations in code.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Event planners</strong> create countdown timers, find day of week for venue booking, or calculate sunrise/sunset for outdoor events.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Age and Duration</h3>
            <p className="text-muted-foreground mb-4">
              Age Calculator computes exact age from birthdate. Day Counter counts days between dates. Time Duration Calculator finds duration between two times. Date Difference in Units breaks down differences into years, months, and days.
            </p>

            <h3 className="text-xl font-semibold mb-3">Date Arithmetic</h3>
            <p className="text-muted-foreground mb-4">
              Date Calculator adds or subtracts days, weeks, months, and years. Add/Subtract Time handles hours, minutes, and seconds. Business Days Calculator counts weekdays excluding weekends and holidays.
            </p>

            <h3 className="text-xl font-semibold mb-3">Date Information</h3>
            <p className="text-muted-foreground mb-4">
              Day of Week Finder returns the weekday for any date. Week Number Calculator gives ISO week numbers. Leap Year Checker identifies leap years. Date Pattern Finder detects repeating sequences. Sunrise/Sunset Calculator computes solar times by location.
            </p>

            <h3 className="text-xl font-semibold mb-3">Time Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Unix Timestamp Converter translates between epoch timestamps and readable dates. Military Time Converter switches between 12-hour and 24-hour formats. Seconds Converter transforms raw seconds into hours, minutes, days.
            </p>

            <h3 className="text-xl font-semibold mb-3">Planning and Countdowns</h3>
            <p className="text-muted-foreground mb-4">
              Countdown Timer creates live timers to events. Time Until Calculator shows remaining time to future dates. Calendar Generator produces monthly/yearly calendars. Date Range Calculator determines start and end dates for periods.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Time zones:</strong> Tools use your browser's local time zone by default. For UTC calculations, specify explicitly.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Business days:</strong> Holiday calendars vary by country. Tools use a generic weekend exclusion — add your own holiday list for accuracy.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Sunrise/sunset:</strong> Calculations are approximate and don't account for atmospheric conditions or elevation.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Unix timestamps:</strong> JavaScript uses milliseconds since epoch. Some systems use seconds. Tools handle both but verify your input format.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Date math is harder than it looks. How many days between March 15 and June 3? What date is 90 days from today? Is 2028 a leap year? You could open a calendar app, fire up a spreadsheet, or write a quick script. Or you could use these tools — focused utilities that do one calculation well without requiring software installation or exposing your data. Everything runs in your browser. No account, no sync, no upsells.
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
