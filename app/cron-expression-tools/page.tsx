import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const cronExpressionTools = [
  {
    name: "Cron Expression Generator",
    description: "Generate cron expressions from human-readable schedules",
    href: "/cron-expression-tools/cron-expression-generator",
  },
  {
    name: "Cron Expression Tester/Next Run Times",
    description: "Test cron expressions and see upcoming execution times",
    href: "/cron-expression-tools/cron-expression-tester-next-run-times",
  },
  {
    name: "Cron Expression Validator/Explainer",
    description: "Validate and explain cron syntax in plain English",
    href: "/cron-expression-tools/cron-expression-validator-explainer",
  },
  {
    name: "Cron Expression Cheat Sheet",
    description: "Quick reference for cron syntax and common patterns",
    href: "/cron-expression-tools/cron-expression-cheat-sheet",
  },
  {
    name: "Cron to English Translator",
    description: "Convert cron expressions to readable English descriptions",
    href: "/cron-expression-tools/cron-to-english-translator",
  },
  {
    name: "English to Cron Converter",
    description: "Convert English schedule descriptions to cron expressions",
    href: "/cron-expression-tools/english-to-cron-converter",
  },
  {
    name: "Cron Expression Difference Checker",
    description: "Compare two cron expressions and highlight differences",
    href: "/cron-expression-tools/cron-expression-difference-checker",
  },
  {
    name: "Cron Expression from DateTime Picker",
    description: "Build cron expressions by selecting dates and times visually",
    href: "/cron-expression-tools/cron-expression-from-datetime-picker",
  },
  {
    name: "Cron Expression for SSL Certificate Renewal",
    description: "Schedule SSL/TLS certificate renewal reminders",
    href: "/cron-expression-tools/cron-expression-ssl-certificate-renewal",
  },
  {
    name: "Cron Expression for Log Rotation",
    description: "Configure automated log rotation schedules",
    href: "/cron-expression-tools/cron-expression-log-rotation",
  },
  {
    name: "Cron Expression for Email Scheduling",
    description: "Set up cron patterns for email newsletter delivery",
    href: "/cron-expression-tools/cron-expression-email-scheduling",
  },
  {
    name: "Cron Expression for Social Media Posting",
    description: "Schedule social media posts with cron patterns",
    href: "/cron-expression-tools/cron-expression-social-media-posting",
  },
  {
    name: "Cron Expression for Monitoring & Alerts",
    description: "Configure health check and alerting schedules",
    href: "/cron-expression-tools/cron-expression-monitoring-alerts",
  },
  {
    name: "Cron Expression for Data Sync/ETL",
    description: "Schedule data synchronization and ETL jobs",
    href: "/cron-expression-tools/cron-expression-data-sync-etl",
  },
  {
    name: "Cron Expression for API Polling/Webhooks",
    description: "Set up API polling intervals and webhook checks",
    href: "/cron-expression-tools/cron-expression-api-polling-webhooks",
  },
  {
    name: "Cron Expression for WordPress Cron Jobs",
    description: "Configure WP-Cron schedules for WordPress tasks",
    href: "/cron-expression-tools/cron-expression-wordpress-cron-jobs",
  },
  {
    name: "Cron Expression for Kubernetes CronJobs",
    description: "Generate cron schedules for Kubernetes CronJob resources",
    href: "/cron-expression-tools/cron-expression-kubernetes-cronjobs",
  },
  {
    name: "Cron Expression for AWS CloudWatch Events",
    description: "Create cron expressions for AWS CloudWatch scheduled events",
    href: "/cron-expression-tools/cron-expression-aws-cloudwatch-events",
  },
];

export const metadata: Metadata = {
  title: "Free Cron Expression Tools Online - 19 Cron Schedule Generators",
  description:
    "Free online cron expression tools for generating, validating, and testing cron schedules. Convert cron to English, test next run times, build schedules visually. All tools run in your browser.",
  openGraph: {
    title: "Free Cron Expression Tools Online - 20 Cron Schedule Generators",
    description:
      "Free online cron expression tools for generating, validating, and testing cron schedules. Convert cron to English, test next run times, build schedules visually. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/cron-expression-tools",
  },
};

export default function CronExpressionToolsPage() {
  const faqsData = [
    {
      question: "Are these cron tools really free?",
      answer:
        "Yes. All 20 cron expression tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my cron data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your cron expressions never leave your device or get uploaded to any server.",
    },
    {
      question: "What cron syntax formats are supported?",
      answer:
        "Tools support standard 5-field cron (minute, hour, day, month, weekday) and 6/7-field extensions with seconds and year. Special strings like @daily, @weekly, @monthly are also supported.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "Do these tools work with cloud scheduler formats?",
      answer:
        "Yes. Specific tools handle AWS CloudWatch Events, Kubernetes CronJobs, and other cloud scheduler formats that use cron-like syntax.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free Cron Expression Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online cron expression tools for generating, validating, and testing scheduled tasks.
              Convert cron to English, test next run times, build schedules visually — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={cronExpressionTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Developer Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our developer tools for more utilities, or explore all available tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/developer-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Developer Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These Cron Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 19 free cron expression tools that run entirely in your browser. No software installation, no server calls, no waiting. You enter a schedule or cron expression, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: generating cron expressions from human input, validating and testing cron syntax, converting between cron and plain English, and providing pre-built schedules for common tasks (backups, monitoring, ETL jobs).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Enter your cron expression or describe your schedule</li>
              <li>Use the visual editor or cheat sheet for reference</li>
              <li>Validate syntax and preview next run times</li>
              <li>Copy the expression or export to your scheduler</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript. Your cron expressions stay in your browser tab and never touch any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>DevOps engineers</strong> configure cron schedules for backups, log rotation, SSL renewal reminders, or infrastructure monitoring tasks.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Backend developers</strong> set up cron jobs for data synchronization, API polling, email delivery, or cleanup scripts.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>System administrators</strong> schedule maintenance windows, health checks, report generation, or automated deployments.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Data engineers</strong> configure ETL job schedules, data warehouse refresh cycles, or batch processing windows using cron syntax.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Generation and Building</h3>
            <p className="text-muted-foreground mb-4">
              Cron Expression Generator creates cron syntax from human-readable input. Cron Expression Editor (GUI) provides checkboxes and visual controls. Cron Expression from DateTime Picker lets you select dates and times on a calendar interface.
            </p>

            <h3 className="text-xl font-semibold mb-3">Validation and Testing</h3>
            <p className="text-muted-foreground mb-4">
              Cron Expression Validator/Explainer checks syntax and explains each field. Cron Expression Tester/Next Run Times shows upcoming execution dates. Cron Expression Difference Checker compares two expressions side by side.
            </p>

            <h3 className="text-xl font-semibold mb-3">Translation and Conversion</h3>
            <p className="text-muted-foreground mb-4">
              Cron to English Translator converts cron expressions to readable descriptions. English to Cron Converter does the reverse. Cron Expression Cheat Sheet provides quick syntax reference.
            </p>

            <h3 className="text-xl font-semibold mb-3">Pre-built Schedules</h3>
            <p className="text-muted-foreground mb-4">
              Tools provide ready-made cron patterns for common tasks: Database Backups, SSL Certificate Renewal, Log Rotation, Email Scheduling, Social Media Posting, Monitoring & Alerts, Data Sync/ETL, API Polling/Webhooks.
            </p>

            <h3 className="text-xl font-semibold mb-3">Platform-Specific</h3>
            <p className="text-muted-foreground mb-4">
              Cron Expression for WordPress Cron Jobs handles WP-Cron scheduling. Cron Expression for Kubernetes CronJobs generates K8s-compatible schedules. Cron Expression for AWS CloudWatch Events creates CloudWatch Events cron syntax.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Time zones:</strong> Cron runs in server time (usually UTC). Adjust expressions for your server's time zone.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Daylight saving:</strong> Cron doesn't handle DST automatically. Jobs scheduled at 2:00 AM may skip or repeat during DST transitions.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Special characters:</strong> Support for L, W, #, and ? varies by cron implementation. Test in your target environment.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Cloud variations:</strong> AWS CloudWatch, Kubernetes, and other platforms have slight syntax differences. Use platform-specific tools when available.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              Cron syntax is cryptic. Five fields of asterisks, commas, and slashes that determine whether your backup runs at 3 AM or 3 PM. You shouldn't need to memorize whether day-of-week is 0-6 or 1-7, or whether L means "last" or "load." These tools exist because scheduling a job should be about the when, not the syntax. Everything runs in your browser — no account, no server calls, no guesswork.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
