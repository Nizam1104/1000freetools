import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import WeekNumberCalculator from "@/components/date-time-tools/week-number-calculator";
import WeekNumberCalculatorSeo from "@/components/seo-content/date-time-tools/week-number-calculator";

export const metadata: Metadata = {
  title: `Week Number Calculator | Find ISO Week of the Year`,
  description: `Calculate the week number of the year for any date (ISO standard). Also find the date range for a specific week number. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/week-number-calculator`,
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

export default function WeekNumberCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Week Number Calculator: What Week of the Year Is It?
        </h1>
        <p className="text-muted-foreground">
          Determine the ISO week number for any date, or find out which dates
          fall within a specific week number. Essential for project management
          and international scheduling.
        </p>
      </header>
      <div className="mt-8">
        <WeekNumberCalculator />
      </div>
      <div className="mt-8">
        <WeekNumberCalculatorSeo />
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
