import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TimeDurationCalculator from "@/components/date-time-tools/time-duration-calculator";
import TimeDurationCalculatorSeo from "@/components/seo-content/date-time-tools/time-duration-calculator";

export const metadata: Metadata = {
  title: `Time Duration Calculator | Hours Between Times | Timesheet`,
  description: `Calculate the duration between two clock times. Perfect for calculating work hours, meeting length, or elapsed time for timesheets and logs.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/time-duration-calculator`,
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

export default function TimeDurationCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Time Duration Calculator: Hours & Minutes Between Times
        </h1>
        <p className="text-muted-foreground">
          Need to calculate hours worked or time elapsed? Enter start and end
          times to get the total duration in hours, minutes, and seconds
          instantly.
        </p>
      </header>
      <div className="mt-8">
        <TimeDurationCalculator />
      </div>
      <div className="mt-8">
        <TimeDurationCalculatorSeo />
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
