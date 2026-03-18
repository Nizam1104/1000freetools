import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CalendarSyncOverlay from "@/components/calendar-tools/calendar-sync-overlay";
import CalendarSyncOverlaySeo from "@/components/seo-content/calendar-tools/calendar-sync-overlay";

export const metadata: Metadata = {
  title: `Calendar Overlay Tool | Sync Multiple Calendars View`,
  description: `Overlay and compare multiple calendar feeds. View Google, iCal, Outlook together to find free time. No login required. Free calendar sync viewer.`,
  alternates: {
    canonical: `https://1000freetools.com/calendar-tools/calendar-sync-overlay`,
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
    name: `Event Countdown Timer`,
    description: `Create a Countdown to Your Event`,
    href: `/calendar-tools/event-countdown`,
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

export default function CalendarSyncOverlayPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Overlay & Compare Multiple Calendars</h1>
        <p className="text-muted-foreground">See all your calendars in one view. Overlay Google, iCal, and Outlook feeds to find common free time. Perfect for scheduling across teams or personal accounts.</p>
      </header>
      <div className="mt-8"><CalendarSyncOverlay /></div>
      <CalendarSyncOverlaySeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
