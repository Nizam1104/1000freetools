import type { Metadata } from "next";
import CronExpressionDataSyncEtlSeo from "@/components/seo-content/cron-expression-tools/cron-expression-data-sync-etl";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CronExpressionDataSync from "@/components/cron-expression-tools/cron-expression-data-sync";

export const metadata: Metadata = {
  title: `CRON for Data Sync & ETL | Pipeline Scheduler`,
  description: `Generate CRON expressions for data synchronization and ETL jobs. Schedule nightly updates, hourly syncs, or incremental loads. Free tool for data engineers.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/cron-expression-data-sync-etl`,
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

export default function CronExpressionDataSyncEtlPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">CRON Expressions for Data Sync & ETL Jobs</h1>
        <p className="text-muted-foreground">Automate your data pipelines with CRON. Generate expressions for nightly ETL jobs, hourly data syncs, or incremental updates. Keep your data fresh on schedule.</p>
      </header>
      <div className="mt-8">
        <CronExpressionDataSync />
      </div>
      <div className="mt-16">
        <CronExpressionDataSyncEtlSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
