import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import DateRangeCalculator from "@/components/date-time-tools/date-range-calculator";
import DateRangeCalculatorSeo from "@/components/seo-content/date-time-tools/date-range-calculator";

export const metadata: Metadata = {
  title: `Date Range Calculator | Calculate Period Start & End Dates`,
  description: `Calculate date ranges. Find an end date given a start and duration, or find the duration between two dates. Useful for projects and billing.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/date-range-calculator`,
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

export default function DateRangeCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Date Range Calculator: Find Start/End Date or Duration
        </h1>
        <p className="text-muted-foreground">
          Easily calculate the end date of a period or the length of a date
          range. Essential for defining billing cycles, project phases, or
          report timeframes.
        </p>
      </header>
      <div className="mt-8">
        <DateRangeCalculator />
      </div>
      <div className="mt-8">
        <DateRangeCalculatorSeo />
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
