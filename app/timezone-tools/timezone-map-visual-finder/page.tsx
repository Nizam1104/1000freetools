import type { Metadata } from "next";
import TimezoneMapVisualFinderSeo from "@/components/seo-content/timezone-tools/timezone-map-visual-finder";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TimezoneMapVisualFinder from "@/components/timezone-tools/timezone-map-visual-finder";

export const metadata: Metadata = {
  title: `Interactive Time Zone Map | Visual Time Zone Finder`,
  description: `Use our clickable time zone map to find local times and UTC offsets globally. Visually compare time zones and understand geographical time zone boundaries.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/timezone-map-visual-finder`,
  },
};

const tools = [
  {
    name: `World Clock & Time Zone Converter`,
    description: `World Clock & Time Zone Converter`,
    href: `/timezone-tools/world-clock-time-zone-converter`,
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

export default function TimezoneMapVisualFinderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Interactive Time Zone Map</h1>
        <p className="text-muted-foreground">
          Find any time zone visually on our interactive map. Click on a country
          or city to see its current time, UTC offset, and daylight saving rules
          in a clear, graphical format.
        </p>
      </header>
      {<TimezoneMapVisualFinder />}
      <div className="mt-16">
        <TimezoneMapVisualFinderSeo />
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
