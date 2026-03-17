import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AddSubtractTime from "@/components/date-time-tools/add-subtract-time";
import AddSubtractTimeSeo from "@/components/seo-content/date-time-tools/add-subtract-time";

export const metadata: Metadata = {
  title: `Add or Subtract Time Calculator | Hours & Minutes`,
  description: `Add or subtract hours, minutes, and seconds from any start time. Calculate future or past times easily for scheduling, cooking, or travel.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/add-subtract-time`,
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

export default function AddSubtractTimePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Add or Subtract Hours & Minutes from a Time
        </h1>
        <p className="text-muted-foreground">
          Need to know what time it will be after a certain duration? Or what
          time it was a few hours ago? This calculator adjusts any start time by
          adding or subtracting hours, minutes, and seconds.
        </p>
      </header>
      <div className="mt-8">
        <AddSubtractTime />
      </div>
      <div className="mt-8">
        <AddSubtractTimeSeo />
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
