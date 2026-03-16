import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CronExpressionCheatSheet from "@/components/cron-expression-tools/cron-expression-cheat-sheet";
import CronExpressionCheatSheetSeo from "@/components/seo-content/cron-expression-tools/cron-expression-cheat-sheet";

export const metadata: Metadata = {
  title: `CRON Expression Cheat Sheet | Quick Reference`,
  description: `Free CRON expression cheat sheet with common examples and syntax rules. Quick reference for schedules like daily, weekly, hourly. Bookmark for easy access.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/cron-expression-cheat-sheet`,
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

export default function CronExpressionCheatSheetPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          CRON Expression Cheat Sheet & Quick Reference
        </h1>
        <p className="text-muted-foreground">
          Find the CRON expression you need fast. Browse our cheat sheet with
          common patterns, syntax rules, and examples. A quick reference for
          developers and system administrators.
        </p>
      </header>
      <div className="mt-8">
        <CronExpressionCheatSheet />
      </div>
      <div className="mt-8">
        <CronExpressionCheatSheetSeo />
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
