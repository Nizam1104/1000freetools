import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Minifier — Shrink CSV File Size Without Losing a Single Data Point",
  description: "Bloated CSVs slow down uploads, APIs, and imports. Our minifier strips every unnecessary byte — trailing spaces, redundant quotes, blank lines — giving you the leanest possible file with all your data intact.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-minifier",
  },
};

const tools = [
  {
    "name": "CSV Formatter",
    "description": "Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack.",
    "href": "/csv-tools/csv-formatter"
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
    "name": "CSV to Text Converter",
    "description": "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.",
    "href": "/csv-tools/csv-to-text"
  },
  {
    "name": "CSV Data Normalizer",
    "description": "Mixed date formats, inconsistent phone number styles, 'Yes/yes/YES/1/true' in the same column — our normalizer applies consistent formatting rules across your data so every value speaks the same language.",
    "href": "/csv-tools/csv-data-normalizer"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Minifier</h1>
        <p className="text-muted-foreground">
          Bloated CSVs slow down uploads, APIs, and imports. Our minifier strips every unnecessary byte — trailing spaces, redundant quotes, blank lines — giving you the leanest possible file with all your data intact.
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
