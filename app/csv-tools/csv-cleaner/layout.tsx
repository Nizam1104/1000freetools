import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Cleaner — Automatically Fix Common CSV Issues in One Pass",
  description: "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-cleaner",
  },
};

const tools = [
  {
    "name": "CSV Data Normalizer",
    "description": "Mixed date formats, inconsistent phone number styles, 'Yes/yes/YES/1/true' in the same column — our normalizer applies consistent formatting rules across your data so every value speaks the same language.",
    "href": "/csv-tools/csv-data-normalizer"
  },
  {
    "name": "CSV Formatter",
    "description": "Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack.",
    "href": "/csv-tools/csv-formatter"
  },
  {
    "name": "CSV Validator",
    "description": "Malformed CSVs silently corrupt imports and crash scripts. Run your file through our validator to expose mismatched columns, rogue delimiters, and encoding gremlins before they cause real damage.",
    "href": "/csv-tools/csv-validator"
  },
  {
    "name": "CSV Deduplicator",
    "description": "Exact duplicates are easy. But what about 'Jon Smith' vs 'John Smith'? Our deduplicator catches near-duplicates using fuzzy matching and phonetic algorithms — so your data is clean even when humans weren't consistent.",
    "href": "/csv-tools/csv-deduplicator"
  },
  {
    "name": "CSV Duplicate Remover",
    "description": "Duplicate rows contaminate analysis, bloat databases, and silently inflate metrics. Remove them in one step — deduplicate on all columns or just a key field, keeping the first or last occurrence as you choose.",
    "href": "/csv-tools/csv-duplicate-remover"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Cleaner</h1>
        <p className="text-muted-foreground">
          Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.
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
