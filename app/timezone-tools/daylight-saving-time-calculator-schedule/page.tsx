import type { Metadata } from "next";
import DaylightSavingTimeCalculatorScheduleSeo from "@/components/seo-content/timezone-tools/daylight-saving-time-calculator-schedule";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { DaylightSavingTimeCalculatorSchedule } from "@/components/timezone-tools/daylight-saving-time-calculator-schedule";

export const metadata: Metadata = {
  title: `Daylight Saving Time Calculator | DST Dates & Changes`,
  description: `Check Daylight Saving Time status for any location. See DST start/end dates, calculate time change impacts, and get reminders for upcoming transitions.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/daylight-saving-time-calculator-schedule`,
  },
};

const tools = [
  {
    name: `World Clock & Time Zone Converter`,
    description: `World Clock & Time Zone Converter`,
    href: `/timezone-tools/world-clock-time-zone-converter`,
  },
  {
    name: `Timezone Map & Visual Time Zone Finder`,
    description: `Interactive Time Zone Map`,
    href: `/timezone-tools/timezone-map-visual-finder`,
  },
  {
    name: `Meeting Planner Across Time Zones`,
    description: `Meeting Planner for Multiple Time Zones`,
    href: `/timezone-tools/meeting-planner-across-time-zones`,
  },
  {
    name: `Time Zone Abbreviation Lookup & Decoder`,
    description: `Time Zone Abbreviation Lookup`,
    href: `/timezone-tools/time-zone-abbreviation-lookup-decoder`,
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

export default function DaylightSavingTimeCalculatorSchedulePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Daylight Saving Time Calculator & Schedule
        </h1>
        <p className="text-muted-foreground">
          Check if a location is currently on Daylight Saving Time and see the
          exact dates for the spring forward and fall back transitions. Never
          miss a time change again.
        </p>
      </header>
      {<DaylightSavingTimeCalculatorSchedule />}
      <div className="mt-16">
        <DaylightSavingTimeCalculatorScheduleSeo />
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
