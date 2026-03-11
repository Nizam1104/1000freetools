import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Time Zone Abbreviation Decoder | PST, GMT, IST Explained`,
  description: `Decode time zone abbreviations instantly. Look up PST, CEST, IST, and more to see their full name, UTC offset, and geographical usage. Clarify ambiguous abbreviations.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/time-zone-abbreviation-lookup-decoder`,
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
    name: `Daylight Saving Time (DST) Calculator & Schedule`,
    description: `Daylight Saving Time Calculator & Schedule`,
    href: `/timezone-tools/daylight-saving-time-calculator-schedule`,
  },
  {
    name: `Unix Timestamp Converter & Epoch Time Tool`,
    description: `Unix Timestamp & Epoch Time Converter`,
    href: `/timezone-tools/unix-timestamp-converter-epoch-time`,
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

export default function TimeZoneAbbreviationLookupDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Time Zone Abbreviation Lookup</h1>
        <p className="text-muted-foreground">Confused by time zone abbreviations like EST, GMT, or IST? Use our decoder to find out what they mean, their UTC offset, and the regions that use them.</p>
      </header>
      {/* TODO: add tool component for time-zone-abbreviation-lookup-decoder */}
      {/* TODO: add seo component for time-zone-abbreviation-lookup-decoder */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
