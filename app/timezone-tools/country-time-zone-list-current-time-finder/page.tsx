import type { Metadata } from "next";
import CountryTimeZoneListCurrentTimeFinderSeo from "@/components/seo-content/timezone-tools/country-time-zone-list-current-time-finder";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { CountryTimeZoneListCurrentTimeFinder } from "@/components/timezone-tools/country-time-zone-list-current-time-finder";

export const metadata: Metadata = {
  title: `Time Zones by Country | Current Local Time in Every Country`,
  description: `See all time zones used in any country and their current local times. Browse our complete list of countries and their respective time zones with major cities.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/country-time-zone-list-current-time-finder`,
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

export default function CountryTimeZoneListCurrentTimeFinderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Time Zones by Country & Current Times</h1>
        <p className="text-muted-foreground">Find all the time zones used in any country and see the current local time in each. A quick reference for travelers, businesses, and the curious.</p>
      </header>
      {<CountryTimeZoneListCurrentTimeFinder />}
      <div className="mt-16">
        <CountryTimeZoneListCurrentTimeFinderSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
