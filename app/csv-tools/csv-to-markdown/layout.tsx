import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV to Markdown Table — Paste CSV, Get a GitHub-Ready Markdown Table",
  description: "Stop manually formatting Markdown tables character by character. Paste your CSV and get perfectly aligned Markdown table syntax — ready to drop into a README, wiki, or pull request description.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-markdown",
  },
};

const tools = [
  {
    "name": "CSV to Text Converter",
    "description": "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.",
    "href": "/csv-tools/csv-to-text"
  },
  {
    "name": "CSV to HTML Table",
    "description": "Publish your data on the web without touching a spreadsheet plugin. Convert any CSV into a clean HTML table — styled, responsive, and ready to paste directly into your website or CMS.",
    "href": "/csv-tools/csv-to-html"
  },
  {
    "name": "CSV to JSON Converter",
    "description": "Bridge the gap between flat files and modern APIs. Convert any CSV into clean JSON objects in one click — with smart type inference, optional nesting, and output that's ready to plug straight into your codebase.",
    "href": "/csv-tools/csv-to-json"
  },
  {
    "name": "CSV to SQL Converter",
    "description": "Skip the manual SQL writing. Upload your CSV and get a ready-to-run SQL script — complete with a CREATE TABLE statement and properly typed INSERT rows — in the dialect your database actually speaks.",
    "href": "/csv-tools/csv-to-sql"
  },
  {
    "name": "CSV to TSV Converter",
    "description": "Some tools demand tabs, not commas. Our converter safely swaps delimiters while correctly handling fields that contain commas — no manual find-and-replace nightmares, no corrupted columns.",
    "href": "/csv-tools/csv-to-tsv"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to Markdown Table</h1>
        <p className="text-muted-foreground">
          Stop manually formatting Markdown tables character by character. Paste your CSV and get perfectly aligned Markdown table syntax — ready to drop into a README, wiki, or pull request description.
        </p>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
