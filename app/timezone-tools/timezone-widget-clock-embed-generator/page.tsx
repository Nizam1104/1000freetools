import type { Metadata } from "next";
import TimezoneWidgetClockEmbedGeneratorSeo from "@/components/seo-content/timezone-tools/timezone-widget-clock-embed-generator";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { TimezoneWidgetClockEmbedGenerator } from "@/components/timezone-tools/timezone-widget-clock-embed-generator.tsx";

export const metadata: Metadata = {
  title: `Free Time Zone Widget Generator | Embed Live Clock`,
  description: `Generate free HTML code to embed a live world clock or time zone converter on your website. Customize cities, design, and update frequency easily.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/timezone-widget-clock-embed-generator`,
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

export default function TimezoneWidgetClockEmbedGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free Time Zone Widget & Embed Code Generator</h1>
        <p className="text-muted-foreground">Add a live world clock or time zone converter to your website. Generate free, customizable embed code in seconds with no coding skills required.</p>
      </header>
      {<TimezoneWidgetClockEmbedGenerator />}
      <div className="mt-16">
        <TimezoneWidgetClockEmbedGeneratorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
