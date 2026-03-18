import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import MoonPhaseCalendar from "@/components/calendar-tools/moon-phase-calendar";
import MoonPhaseCalendarSeo from "@/components/seo-content/calendar-tools/moon-phase-calendar";

export const metadata: Metadata = {
  title: `Moon Phase Calendar | Daily Moon Tracker`,
  description: `Free interactive moon phase calendar. See daily moon phase, illumination percentage, and moonrise times. Find next full moon, new moon dates.`,
  alternates: {
    canonical: `https://1000freetools.com/calendar-tools/moon-phase-calendar`,
  },
};

const tools = [
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

export default function MoonPhaseCalendarPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Moon Phase Calendar & Tracker</h1>
        <p className="text-muted-foreground">Track the moon's phases on a visual calendar. See daily moon phase, illumination, and moonrise times. Find dates for the next full moon or new moon.</p>
      </header>
      <div className="mt-8"><MoonPhaseCalendar /></div>
      <MoonPhaseCalendarSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
