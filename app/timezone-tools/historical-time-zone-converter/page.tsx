import type { Metadata } from "next";
import HistoricalTimeZoneConverterSeo from "@/components/seo-content/timezone-tools/historical-time-zone-converter";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HistoricalTimeZoneConverter from "@/components/timezone-tools/historical-time-zone-converter";

export const metadata: Metadata = {
  title: `Historical Time Zone Converter | Past Date Time Tool`,
  description: `Accurately convert times for historical dates. Account for past time zone rules, DST schedules, and regional changes that affected local time.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/historical-time-zone-converter`,
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

export default function HistoricalTimeZoneConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Historical Time Zone Converter for Past Dates</h1>
        <p className="text-muted-foreground">Convert times for dates in the past, accurately accounting for historical time zone rules and daylight saving changes that were in effect at that time.</p>
      </header>
      {<HistoricalTimeZoneConverter />}
      <div className="mt-16">
        <HistoricalTimeZoneConverterSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
