import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CalendarGenerator from "@/components/date-time-tools/calendar-generator";
import CalendarGeneratorSeo from "@/components/seo-content/date-time-tools/calendar-generator";

export const metadata: Metadata = {
  title: `Free Calendar Generator | Create & Print Custom Monthly Calendar`,
  description: `Generate a free, printable monthly calendar for any month and year. Customize, highlight dates, and download as PDF. Perfect for personal or office use.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/calendar-generator`,
  },
};

const tools = [
  {
    name: `Date Calculator`,
    description: `Date Calculator: Find Days Between Dates & Add/Subtract Days`,
    href: `/date-time-tools/date-calculator`,
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

export default function CalendarGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free Custom Calendar Generator & Printer
        </h1>
        <p className="text-muted-foreground">
          Create and print a clean, customized monthly calendar. Choose any
          month and year, highlight important dates, and download a PDF for
          planning or posting.
        </p>
      </header>
      <div className="mt-8">
        <CalendarGenerator />
      </div>
      <div className="mt-8">
        <CalendarGeneratorSeo />
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
