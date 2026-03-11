import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AgeCalculator from "@/components/date-time-tools/age-calculator";
import AgeCalculatorSeo from "@/components/seo-content/date-time-tools/age-calculator";

export const metadata: Metadata = {
  title: `Free Age Calculator | How Old Am I? | Exact Age Finder`,
  description: `Calculate your exact age in years, months, and days. Find out how old you are or will be on any date with our free and precise age calculator.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/age-calculator`,
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

export default function AgeCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Age Calculator: Find Your Exact Age in Years & Days
        </h1>
        <p className="text-muted-foreground">
          Find out exactly how old you are, down to the minute. Our age
          calculator uses your birth date to compute your age in various units.
          Useful for legal forms, milestone tracking, or simple curiosity.
        </p>
      </header>
      <div className="mt-8">
        <AgeCalculator />
      </div>
      <div className="mt-8">
        <AgeCalculatorSeo />
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
