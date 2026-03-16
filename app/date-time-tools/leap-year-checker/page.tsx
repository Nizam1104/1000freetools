import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import LeapYearChecker from "@/components/date-time-tools/leap-year-checker";
import LeapYearCheckerSeo from "@/components/seo-content/date-time-tools/leap-year-checker";

export const metadata: Metadata = {
  title: `Leap Year Checker | Is 2024 a Leap Year? | List of Leap Years`,
  description: `Check if any year is a leap year. Understand the rules and see a list of past and future leap years. Simple and free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/leap-year-checker`,
  },
};

const tools = [
  {
    name: `Date Calculator`,
    description: `Date Calculator: Find Days Between Dates & Add/Subtract Days`,
    href: `/date-time-tools/date-calculator`,
  },
  {
    name: `Time Zone Converter`,
    description: `World Time Zone Converter & Clock`,
    href: `/date-time-tools/time-zone-converter`,
  },
  {
    name: `Age Calculator`,
    description: `Age Calculator: Find Your Exact Age in Years & Days`,
    href: `/date-time-tools/age-calculator`,
  },
  {
    name: `Day of the Week Finder`,
    description: `What Day of the Week Was That? Day Finder Tool`,
    href: `/date-time-tools/day-of-week-finder`,
  },
  {
    name: `Countdown Timer`,
    description: `Free Countdown Timer to Any Event`,
    href: `/date-time-tools/countdown-timer`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function LeapYearCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Leap Year Checker: Is This Year a Leap Year?
        </h1>
        <p className="text-muted-foreground">
          Quickly verify if a year has 366 days. Our tool checks the standard
          leap year rules and shows you upcoming leap years for planning.
        </p>
      </header>
      <div className="mt-8">
        <LeapYearChecker />
      </div>
      <div className="mt-8">
        <LeapYearCheckerSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
