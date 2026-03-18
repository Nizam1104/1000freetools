import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CalendarMatrixGenerator from "@/components/calendar-tools/calendar-matrix-generator";
import CalendarMatrixGeneratorSeo from "@/components/seo-content/calender-tools/calendar-matrix-generator";

export const metadata: Metadata = {
  title: `Calendar Grid Generator | Month Matrix for Excel`,
  description: `Free calendar grid/matrix generator. Create a monthly calendar table for spreadsheets or docs. Export as CSV, HTML, text. Customize start day of week.`,
  alternates: {
    canonical: `https://1000freetools.com/calendar-tools/calendar-matrix-generator`,
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
    name: `Calendar Sync & Overlay Viewer`,
    description: `Overlay & Compare Multiple Calendars`,
    href: `/calendar-tools/calendar-sync-overlay`,
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

export default function CalendarMatrixGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Generate a Calendar Grid for Spreadsheets</h1>
        <p className="text-muted-foreground">Create a clean calendar matrix for any month. Copy the grid as CSV, HTML, or text into Excel, Google Sheets, or docs. Customize the starting weekday.</p>
      </header>
      <div className="mt-8"><CalendarMatrixGenerator /></div>
      <div className="mt-8"><CalendarMatrixGeneratorSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
