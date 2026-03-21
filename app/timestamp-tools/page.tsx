import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const timestampTools = [
  {
    name: "Add/Subtract Time Timestamp",
    description: "Add or subtract time from timestamp values",
    href: "/timestamp-tools/add-subtract-time-timestamp",
  },
  {
    name: "Batch Timestamp Converter",
    description: "Convert multiple timestamps at once",
    href: "/timestamp-tools/batch-timestamp-converter",
  },
  {
    name: "Countdown Timer from Timestamp",
    description: "Create countdown timers from Unix timestamps",
    href: "/timestamp-tools/countdown-timer-from-timestamp",
  },
  {
    name: "Current Unix Timestamp",
    description: "Get the current Unix timestamp in seconds and milliseconds",
    href: "/timestamp-tools/current-unix-timestamp",
  },
  {
    name: "Discord Timestamp Generator",
    description: "Generate Discord-formatted timestamps",
    href: "/timestamp-tools/discord-timestamp-generator",
  },
  {
    name: "Epoch Timestamp Generator",
    description: "Generate epoch timestamps for various use cases",
    href: "/timestamp-tools/epoch-timestamp-generator",
  },
  {
    name: "File Timestamp Converter",
    description: "Convert file modification timestamps",
    href: "/timestamp-tools/file-timestamp-converter",
  },
  {
    name: "GPS Timestamp Converter",
    description: "Convert GPS timestamps to readable dates",
    href: "/timestamp-tools/gps-timestamp-converter",
  },
  {
    name: "Human Date to Timestamp",
    description: "Convert readable dates to Unix timestamps",
    href: "/timestamp-tools/human-date-to-timestamp",
  },
  {
    name: "ISO 8601 Timestamp Converter",
    description: "Convert between ISO 8601 and Unix timestamps",
    href: "/timestamp-tools/iso-8601-timestamp-converter",
  },
  {
    name: "Leap Year Timestamp Calculator",
    description: "Calculate timestamps accounting for leap years",
    href: "/timestamp-tools/leap-year-timestamp-calculator",
  },
  {
    name: "Milliseconds Timestamp Converter",
    description: "Convert between seconds and milliseconds timestamps",
    href: "/timestamp-tools/milliseconds-timestamp-converter",
  },
  {
    name: "Random Timestamp Generator",
    description: "Generate random timestamps within a date range",
    href: "/timestamp-tools/random-timestamp-generator",
  },
  {
    name: "RFC Timestamp Converter",
    description: "Convert between RFC formats and Unix timestamps",
    href: "/timestamp-tools/rfc-timestamp-converter",
  },
  {
    name: "Social Media Timestamp Converter",
    description: "Convert timestamps from social media platforms",
    href: "/timestamp-tools/social-media-timestamp-converter",
  },
  {
    name: "Timestamp Difference Calculator",
    description: "Calculate duration between two timestamps",
    href: "/timestamp-tools/timestamp-difference-calculator",
  },
  {
    name: "Timestamp to Readable Date",
    description: "Convert Unix timestamps to human-readable dates",
    href: "/timestamp-tools/timestamp-to-readable-date",
  },
  {
    name: "Timestamp Validator/Formatter",
    description: "Validate and format timestamp values",
    href: "/timestamp-tools/timestamp-validator-formatter",
  },
  {
    name: "Timezone Timestamp Converter",
    description: "Convert timestamps between timezones",
    href: "/timestamp-tools/timezone-timestamp-converter",
  },
  {
    name: "Unix Timestamp Converter",
    description: "Convert Unix timestamps to dates and back",
    href: "/timestamp-tools/unix-timestamp-converter",
  },
];

export const metadata: Metadata = {
  title: "Free Timestamp Tools Online - 20 Unix Time Converter Tools",
  description:
    "Free online timestamp tools for converting Unix timestamps to dates. Epoch converter, ISO 8601, Discord timestamps, timezone conversion. All tools run in your browser.",
  openGraph: {
    title: "Free Timestamp Tools Online - 20 Unix Time Converter Tools",
    description:
      "Free online timestamp tools for converting Unix timestamps to dates. Epoch converter, ISO 8601, Discord timestamps, timezone conversion. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/timestamp-tools",
  },
};

export default function TimestampToolsPage() {
  const faqsData = [
    {
      question: "Are these timestamp tools really free?",
      answer:
        "Yes. All 20 timestamp tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your timestamp data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What is a Unix timestamp?",
      answer:
        "A Unix timestamp (also called epoch time) is the number of seconds (or milliseconds) since January 1, 1970, 00:00:00 UTC. It's a universal way to represent points in time across computer systems.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "What's the difference between seconds and milliseconds timestamps?",
      answer:
        "Unix timestamps can be expressed in seconds (10 digits) or milliseconds (13 digits). JavaScript uses milliseconds, while most Unix systems use seconds. Tools handle both formats.",
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
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Timestamp Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online timestamp tools for converting Unix timestamps to dates.
              Epoch converter, ISO 8601, Discord timestamps — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={timestampTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Time Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our date-time tools or timezone tools for more utilities.
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
              What These Timestamp Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 20 free timestamp tools that run entirely in your browser. No software installation, no server uploads, no waiting. You enter timestamps or dates, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting between timestamps and readable dates, converting between timestamp formats (seconds, milliseconds, ISO 8601, RFC), calculating with timestamps (add/subtract time, find differences), and generating timestamps (current, random, Discord-formatted, epoch).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your timestamp or select a date</li>
              <li>Select the conversion or operation type</li>
              <li>Choose timezone if applicable</li>
              <li>Copy the result</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> debug timestamp issues, convert between formats for APIs, generate test timestamps, or calculate time differences in logs.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Data analysts</strong> convert database timestamps to readable dates, parse timestamps from various sources, or batch convert large datasets.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Discord users</strong> generate dynamic timestamps for messages that display in each user's local time.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>System administrators</strong> interpret file timestamps, convert GPS timestamps from devices, or analyze log file timestamps.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Basic Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Unix Timestamp Converter converts between timestamps and dates. Timestamp to Readable Date shows human-friendly output. Human Date to Timestamp does the reverse.
            </p>

            <h3 className="text-xl font-semibold mb-3">Format Conversion</h3>
            <p className="text-muted-foreground mb-4">
              ISO 8601 Timestamp Converter handles ISO format. RFC Timestamp Converter works with RFC 2822/5322. Milliseconds Timestamp Converter switches between seconds and milliseconds.
            </p>

            <h3 className="text-xl font-semibold mb-3">Timestamp Generation</h3>
            <p className="text-muted-foreground mb-4">
              Current Unix Timestamp shows the current time. Epoch Timestamp Generator creates epoch values. Random Timestamp Generator produces timestamps within ranges. Discord Timestamp Generator creates Discord-formatted timestamps.
            </p>

            <h3 className="text-xl font-semibold mb-3">Timestamp Calculation</h3>
            <p className="text-muted-foreground mb-4">
              Add/Subtract Time Timestamp modifies timestamps. Timestamp Difference Calculator finds duration between two points. Leap Year Timestamp Calculator handles leap year edge cases.
            </p>

            <h3 className="text-xl font-semibold mb-3">Specialized Conversion</h3>
            <p className="text-muted-foreground mb-4">
              File Timestamp Converter handles file metadata. GPS Timestamp Converter parses GPS time format. Social Media Timestamp Converter interprets platform-specific formats. Timezone Timestamp Converter adjusts for timezones.
            </p>

            <h3 className="text-xl font-semibold mb-3">Utilities</h3>
            <p className="text-muted-foreground mb-4">
              Batch Timestamp Converter processes multiple values. Timestamp Validator/Formatter checks and formats timestamps. Countdown Timer from Timestamp creates live countdowns.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Year 2038 problem:</strong> 32-bit Unix timestamps overflow on January 19, 2038. JavaScript uses 64-bit numbers so handles dates beyond this.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Timezone handling:</strong> Unix timestamps are always UTC. Display conversions depend on correct timezone data.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Milliseconds vs seconds:</strong> JavaScript uses milliseconds, Unix uses seconds. Tools detect format but verify your input.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Leap seconds:</strong> Unix timestamps don't account for leap seconds. For most applications this doesn't matter.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Timestamp tools are scattered across programming languages, command-line utilities, and online converters. But sometimes you need to quickly convert a log timestamp, generate a Discord timestamp, or figure out what date 1609459200 represents. These tools exist because working with time shouldn't require remembering format strings or timezone offsets. Everything runs in your browser — no installation, no configuration, no confusion.
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
