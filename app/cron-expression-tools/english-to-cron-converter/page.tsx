import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import EnglishToCronConverter from "@/components/cron-expression-tools/english-to-cron-converter";
import EnglishToCronConverterSEO from "@/components/seo-content/cron-expression-tools/english-to-cron-converter";

export const metadata: Metadata = {
  title: `English to CRON Converter | Natural Language to Cron`,
  description: `Convert plain English schedules to CRON expressions. Type 'every day at 5pm' and get the cron syntax. Free tool for easy cron job creation.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/english-to-cron-converter`,
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
    name: `CRON Expression Tester (Next Run Times)`,
    description: `CRON Expression Tester - See Next Run Times`,
    href: `/cron-expression-tools/cron-expression-tester-next-run-times`,
  },
  {
    name: `CRON Expression Editor with GUI`,
    description: `CRON Expression Editor (GUI)`,
    href: `/cron-expression-tools/cron-expression-editor-gui`,
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

export default function EnglishToCronConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          English to CRON Expression Converter
        </h1>
        <p className="text-muted-foreground">
          Type a schedule in plain English and get the correct CRON expression.
          Convert phrases like 'every weekday at midnight' or 'on the 1st of
          every month' into working cron syntax.
        </p>
      </header>
      <div className="mt-8">
        <EnglishToCronConverter />
      </div>
      <div className="mt-8">
        <EnglishToCronConverterSEO />
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
