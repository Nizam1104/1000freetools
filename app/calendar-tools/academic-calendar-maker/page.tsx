import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AcademicCalendarMaker from "@/components/calendar-tools/academic-calendar-maker";

export const metadata: Metadata = {
  title: `Academic Calendar Maker | School Year Planner`,
  description: `Create a custom academic calendar for your school or university. Plan semesters, holidays, exams. Export as printable PDF. Free for educators.`,
  alternates: {
    canonical: `https://1000freetools.com/calendar-tools/academic-calendar-maker`,
  },
};

const tools = [
  {
    name: `Moon Phase Calendar`,
    description: `Moon Phase Calendar & Tracker`,
    href: `/calendar-tools/moon-phase-calendar`,
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

export default function AcademicCalendarMakerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Create Your School Academic Calendar</h1>
        <p className="text-muted-foreground">Plan the entire school year with this academic calendar tool. Mark semesters, holidays, exams, and breaks. Generate a printable schedule for teachers, students, and parents.</p>
      </header>
      <div className="mt-8"><AcademicCalendarMaker /></div>
      {/* TODO: add seo component for academic-calendar-maker */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
