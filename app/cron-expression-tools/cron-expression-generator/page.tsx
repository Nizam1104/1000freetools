import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CronExpressionGenerator from "@/components/cron-expression-tools/cron-expression-generator";
import CronExpressionGeneratorSeo from "@/components/seo-content/cron-expression-tools/cron-expression-generator";

export const metadata: Metadata = {
  title: `CRON Expression Generator | Free Online Tool`,
  description: `Generate CRON expressions visually. Select time/date parameters, get valid syntax, and see a human-readable schedule explanation. No sign-up required.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/cron-expression-generator`,
  },
};

const tools = [
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

export default function CronExpressionGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free CRON Expression Generator
        </h1>
        <p className="text-muted-foreground">
          Create CRON expressions instantly with our visual selector. Choose
          your schedule parameters and get a valid expression with a plain
          English explanation. Perfect for scheduling tasks in Linux, Java, or
          any cron-based system.
        </p>
      </header>
      <div className="mt-8">
        <CronExpressionGenerator />
      </div>
      <div className="mt-8">
        <CronExpressionGeneratorSeo />
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
