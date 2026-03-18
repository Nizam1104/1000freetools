import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import EventCountdown from "@/components/calendar-tools/event-countdown";
import EventCountdownSeo from "@/components/seo-content/calendar-tools/event-countdown";

export const metadata: Metadata = {
  title: `Event Countdown Timer | Free Countdown Creator`,
  description: `Make a free countdown timer for any event. Shows days, hours, minutes until your date. Get a shareable link or embed code. Customize and share.`,
  alternates: {
    canonical: `https://1000freetools.com/calendar-tools/event-countdown`,
  },
};

const tools = [
  {
    name: `Moon Phase Calendar`,
    description: `Moon Phase Calendar & Tracker`,
    href: `/calendar-tools/moon-phase-calendar`,
  },
  {
    name: `Academic Year & School Calendar Maker`,
    description: `Create Your School Academic Calendar`,
    href: `/calendar-tools/academic-calendar-maker`,
  },
  {
    name: `Fiscal Year & Financial Calendar`,
    description: `Fiscal Year Calendar Generator`,
    href: `/calendar-tools/fiscal-year-calendar`,
  },
  {
    name: `Calendar Sync & Overlay Viewer`,
    description: `Overlay & Compare Multiple Calendars`,
    href: `/calendar-tools/calendar-sync-overlay`,
  },
  {
    name: `Calendar Date Picker & Generator`,
    description: `Generate a Custom Date Picker Widget`,
    href: `/calendar-tools/date-picker-generator`,
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
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
  {
    name: `CRON Expression Generator`,
    description: `Free CRON Expression Generator`,
    href: `/cron-expression-tools/cron-expression-generator`,
  },
];

export default function EventCountdownPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Create a Countdown to Your Event</h1>
        <p className="text-muted-foreground">Build a live countdown timer for your wedding, holiday, or project deadline. Share the link or embed it on your website. Watch the seconds tick down.</p>
      </header>
      <div className="mt-8"><EventCountdown /></div>
      <EventCountdownSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
