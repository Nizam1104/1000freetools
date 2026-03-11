import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CronExpressionFromDateTimePicker from "@/components/cron-expression-tools/cron-expression-from-datetime-picker";
import CronExpressionFromDateTimePickerSEO from "@/components/seo-content/cron-expression-tools/cron-expression-from-datetime-picker";

export const metadata: Metadata = {
  title: `CRON from Date/Time Picker | Visual Schedule Tool`,
  description: `Generate a CRON expression by selecting a date and time from a picker. Create one-time or recurring schedules visually. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/cron-expression-from-datetime-picker`,
  },
};

const tools = [
  {
    name: `CRON Expression Generator`,
    description: `Free CRON Expression Generator`,
    href: `/cron-expression-tools/cron-expression-generator`,
  },
  {
    name: `CRON Expression Validator & Explainer`,
    description: `Validate & Understand CRON Expressions`,
    href: `/cron-expression-tools/cron-expression-validator-explainer`,
  },
  {
    name: `CRON to English Translator`,
    description: `CRON to English Translator`,
    href: `/cron-expression-tools/cron-to-english-translator`,
  },
  {
    name: `English to CRON Expression Converter`,
    description: `English to CRON Expression Converter`,
    href: `/cron-expression-tools/english-to-cron-converter`,
  },
  {
    name: `CRON Expression Tester (Next Run Times)`,
    description: `CRON Expression Tester - See Next Run Times`,
    href: `/cron-expression-tools/cron-expression-tester-next-run-times`,
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

export default function CronExpressionFromDatetimePickerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          CRON Expression from Date & Time Picker
        </h1>
        <p className="text-muted-foreground">
          Pick a date and time from a calendar to generate a CRON expression.
          Perfect for setting up a job to run at a specific future datetime or
          on a recurring schedule from that point.
        </p>
      </header>
      <div className="mt-8">
        <CronExpressionFromDateTimePicker />
      </div>
      <div className="mt-8">
        <CronExpressionFromDateTimePickerSEO />
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
