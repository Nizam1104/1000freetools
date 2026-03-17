import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import DateCalculator from "@/components/date-time-tools/date-calculator";
import DateCalculatorSeo from "@/components/seo-content/date-time-tools/date-calculator";

export const metadata: Metadata = {
  title: `Free Date Calculator | Days Between Dates | Add/Subtract Days`,
  description: `Calculate days between two dates or add/subtract days from a date. Free, accurate date calculator for project planning, deadlines, and event scheduling.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/date-calculator`,
  },
};

const tools = [
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
    name: `Business Days Calculator`,
    description: `Business Day Calculator: Exclude Weekends & Holidays`,
    href: `/date-time-tools/business-days-calculator`,
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

export default function DateCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Date Calculator: Find Days Between Dates & Add/Subtract Days
        </h1>
        <p className="text-muted-foreground">
          Our free date calculator quickly computes the duration between any two
          dates. Easily add or subtract days to find target dates for planning,
          deadlines, or historical research. It's an essential tool for project
          management, legal matters, and personal events.
        </p>
      </header>
      <div className="mt-8">
        <DateCalculator />
      </div>
      <div className="mt-8">
        <DateCalculatorSeo />
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
