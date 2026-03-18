import type { Metadata } from "next";
import TimeZoneDifferenceCalculatorSeo from "@/components/seo-content/timezone-tools/time-zone-difference-calculator";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TimezoneConverter from "@/components/timezone-tools/timezone-converter";

export const metadata: Metadata = {
  title: `Time Difference Calculator | Hours Between Time Zones`,
  description: `Calculate the exact time difference between two cities or time zones. See how many hours one location is ahead or behind another, accounting for daylight saving.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/time-zone-difference-calculator`,
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
    name: `Daylight Saving Time (DST) Calculator & Schedule`,
    description: `Daylight Saving Time Calculator & Schedule`,
    href: `/timezone-tools/daylight-saving-time-calculator-schedule`,
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

export default function TimeZoneDifferenceCalculatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Time Difference Calculator Between Cities</h1>
        <p className="text-muted-foreground">Quickly calculate the exact time difference between any two cities in the world. See how many hours one is ahead or behind the other, now or on a future date.</p>
      </header>
      <div className="mt-8">
        <TimezoneConverter />
      </div>
      <div className="mt-16">
        <TimeZoneDifferenceCalculatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
