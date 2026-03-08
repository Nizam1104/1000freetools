import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Viewer — Instant Table Rendering for Any CSV File",
  description: "Stop squinting at raw comma-separated text. Drop your CSV and watch it transform into a crisp, sortable table in milliseconds — no spreadsheet software, no signups, no nonsense.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-viewer",
  },
};

const tools = [
  {
    "name": "CSV Editor",
    "description": "A lightweight, no-install CSV editor that feels like a spreadsheet. Click any cell, make your changes, and download a clean file — your data stays on your machine the entire time.",
    "href": "/csv-tools/csv-editor"
  },
  {
    "name": "CSV Pretty Print",
    "description": "Raw CSV is for machines. Pretty-printed CSV is for humans. Instantly convert your file into a neatly padded, column-aligned text table perfect for documentation, Slack messages, or terminal output.",
    "href": "/csv-tools/csv-pretty-print"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
  },
  {
    "name": "CSV Formatter",
    "description": "Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack.",
    "href": "/csv-tools/csv-formatter"
  },
  {
    "name": "CSV Row Filter",
    "description": "Extract exactly the rows you care about using intuitive conditions — filter by value, range, pattern, or date across any column. Combine rules with AND/OR logic and download the matching subset in seconds.",
    "href": "/csv-tools/csv-row-filter"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Viewer</h1>
        <p className="text-muted-foreground">
          Stop squinting at raw comma-separated text. Drop your CSV and watch it transform into a crisp, sortable table in milliseconds — no spreadsheet software, no signups, no nonsense.
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
