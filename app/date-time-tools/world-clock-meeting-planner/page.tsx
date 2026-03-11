import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import WorldClockMeetingPlanner from "@/components/date-time-tools/world-clock-meeting-planner";
import WorldClockMeetingPlannerSeo from "@/components/seo-content/date-time-tools/world-clock-meeting-planner";

export const metadata: Metadata = {
  title: `World Clock Meeting Planner | Schedule International Calls`,
  description: `Plan meetings across time zones. Compare business hours in multiple cities visually to find the best time for all participants.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/world-clock-meeting-planner`,
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

export default function WorldClockMeetingPlannerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          World Clock Meeting Planner: Find Best Time for All
        </h1>
        <p className="text-muted-foreground">
          Schedule global meetings with ease. See working hours across multiple
          cities at once to find a time slot that works for everyone, regardless
          of location.
        </p>
      </header>
      <div className="mt-8">
        <WorldClockMeetingPlanner />
      </div>
      <div className="mt-8">
        <WorldClockMeetingPlannerSeo />
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
