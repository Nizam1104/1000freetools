import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { CronExpressionKubernetesCronjobs } from "@/components/cron-tools/cron-expression-kubernetes-cronjobs.tsx";

export const metadata: Metadata = {
  title: `CRON for Kubernetes CronJobs | K8s Scheduler`,
  description: `Generate CRON expressions for Kubernetes CronJobs. Create schedules for batch jobs, backups, or cleanup in your cluster. Free tool for DevOps and K8s admins.`,
  alternates: {
    canonical: `https://1000freetools.com/cron-expression-tools/cron-expression-kubernetes-cronjobs`,
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

export default function CronExpressionKubernetesCronjobsPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">CRON Expressions for Kubernetes CronJobs</h1>
        <p className="text-muted-foreground">Create CRON expressions for Kubernetes CronJobs. Generate schedules for containerized tasks, batch jobs, or cluster maintenance with syntax validated for K8s. A must for Kubernetes users.</p>
      </header>
      {<CronExpressionKubernetesCronjobs />}
      {/* TODO: add seo component for cron-expression-kubernetes-cronjobs */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
