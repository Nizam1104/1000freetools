import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CountdownTimer from "@/components/date-time-tools/countdown-timer";
import CountdownTimerSeo from "@/components/seo-content/date-time-tools/countdown-timer";

export const metadata: Metadata = {
  title: `Free Countdown Timer | Create Custom Event Countdown`,
  description: `Make a free countdown timer for any event. Share a live page showing days, hours, and minutes until your wedding, vacation, or deadline.`,
  alternates: {
    canonical: `https://1000freetools.com/date-time-tools/countdown-timer`,
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

export default function CountdownTimerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free Countdown Timer to Any Event
        </h1>
        <p className="text-muted-foreground">
          Build excitement by counting down the days, hours, and minutes until
          your big event—a wedding, vacation, product launch, or holiday. Create
          and share a live countdown page.
        </p>
      </header>
      <div className="mt-8">
        <CountdownTimer />
      </div>
      <div className="mt-8">
        <CountdownTimerSeo />
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
