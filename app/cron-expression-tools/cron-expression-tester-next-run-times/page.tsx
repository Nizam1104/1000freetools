import type { Metadata } from "next";
import CronExpressionTesterNextRunTimesSeo from "@/components/seo-content/cron-expression-tools/cron-expression-tester-next-run-times";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CronExpressionTester from "@/components/cron-expression-tools/cron-expression-tester";

export const metadata: Metadata = {
  title: `CRON Expression Tester | Find Next Run Times`,
  description: `Test CRON expressions and see future run times. Enter your cron syntax to get a list of next scheduled executions. Verify your cron job timing for free.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/cron-expression-tester-next-run-times`,
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

export default function CronExpressionTesterNextRunTimesPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">CRON Expression Tester - See Next Run Times</h1>
        <p className="text-muted-foreground">Test your CRON expression by seeing exactly when it will run next. Enter your cron and a start date to get a list of upcoming execution times. Essential for debugging cron schedules.</p>
      </header>
      <div className="mt-8">
        <CronExpressionTester />
      </div>
      <div className="mt-16">
        <CronExpressionTesterNextRunTimesSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
