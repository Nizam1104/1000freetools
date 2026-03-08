import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Email Extractor — Pull All Valid Email Addresses Out of Any CSV File",
  description: "Email addresses scattered across multiple columns, mixed in with other data? Our extractor scans every cell, validates each address, deduplicates the results, and hands you a clean list — ready for your email tool.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-email-extractor",
  },
};

const tools = [
  {
    "name": "CSV Column Extractor",
    "description": "When you only need three columns from a fifty-column export, don't wrestle with Excel. Select exactly the columns you want, rename them if needed, and download a clean, trimmed CSV in seconds.",
    "href": "/csv-tools/csv-column-extractor"
  },
  {
    "name": "CSV Row Filter",
    "description": "Extract exactly the rows you care about using intuitive conditions — filter by value, range, pattern, or date across any column. Combine rules with AND/OR logic and download the matching subset in seconds.",
    "href": "/csv-tools/csv-row-filter"
  },
  {
    "name": "CSV to Text Converter",
    "description": "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.",
    "href": "/csv-tools/csv-to-text"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
  },
  {
    "name": "CSV Column Statistics",
    "description": "Understand your data before you process it. Get count, nulls, min, max, mean, median, and top values for every column in your CSV — all in one summary report, with no code required.",
    "href": "/csv-tools/csv-column-statistics"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Email Extractor</h1>
        <p className="text-muted-foreground">
          Email addresses scattered across multiple columns, mixed in with other data? Our extractor scans every cell, validates each address, deduplicates the results, and hands you a clean list — ready for your email tool.
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
