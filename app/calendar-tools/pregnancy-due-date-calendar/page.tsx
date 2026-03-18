import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PregnancyDueDateCalendar from "@/components/calendar-tools/pregnancy-due-date-calendar";
import PregnancyDueDateCalendarSeo from "@/components/seo-content/calendar-tools/pregnancy-due-date-calendar";

export const metadata: Metadata = {
  title: `Pregnancy Due Date Calculator | Week by Week Calendar`,
  description: `Free pregnancy due date calculator and calendar. Calculate from LMP or conception date. See week-by-week milestones and trimesters. Printable summary.`,
  alternates: {
    canonical: `https://1000freetools.com/calendar-tools/pregnancy-due-date-calendar`,
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

export default function PregnancyDueDateCalendarPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Pregnancy Due Date Calculator & Calendar</h1>
        <p className="text-muted-foreground">Calculate your baby's due date and track your pregnancy week by week. See key milestones and trimesters. A helpful planner for expecting parents.</p>
      </header>
      <div className="mt-8"><PregnancyDueDateCalendar /></div>
      <PregnancyDueDateCalendarSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
