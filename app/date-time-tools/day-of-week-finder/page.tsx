import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import DayOfWeekFinder from "@/components/date-time-tools/day-of-week-finder";
import DayOfWeekFinderSeo from "@/components/seo-content/date-time-tools/day-of-week-finder";

export const metadata: Metadata = {
  title: `Day of the Week Finder | What Day Was a Date?`,
  description: `Find out what day of the week any date falls on. Discover your birth day, plan events, or solve historical date puzzles instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/day-of-week-finder`,
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

export default function DayOfWeekFinderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          What Day of the Week Was That? Day Finder Tool
        </h1>
        <p className="text-muted-foreground">
          Quickly discover the weekday for any date in history or the future.
          This simple tool answers questions like 'What day was I born?' or
          'What day will Christmas be on next year?'
        </p>
      </header>
      <div className="mt-8">
        <DayOfWeekFinder />
      </div>
      <div className="mt-8">
        <DayOfWeekFinderSeo />
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
