import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { LiveCountdownTimerAcrossTimeZones } from "@/components/timezone-tools/live-countdown-timer-across-time-zones";

export const metadata: Metadata = {
  title: `Live Countdown Timer | Synced Across Time Zones`,
  description: `Create a live countdown timer that syncs across time zones. Set an event time once, and share a link that shows the time remaining in everyone's local time.`,
  alternates: {
    canonical: `https://1000freetools.com/timezone-tools/live-countdown-timer-across-time-zones`,
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

export default function LiveCountdownTimerAcrossTimeZonesPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Live Countdown Timer for Any Time Zone</h1>
        <p className="text-muted-foreground">Create a countdown to a global event that everyone can see in their own local time. Perfect for product launches, webinars, or New Year's Eve celebrations worldwide.</p>
      </header>
      {<LiveCountdownTimerAcrossTimeZones />}
      {/* TODO: add seo component for live-countdown-timer-across-time-zones */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
