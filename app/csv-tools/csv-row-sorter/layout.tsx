import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Row Sorter — Sort CSV Data by Any Column, Number, Date, or Alphabet",
  description: "Sort your CSV by any column — or chain multiple sort rules together. Numeric, alphabetic, and date-aware sorting all handled correctly, so your rows come out in exactly the order you need.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-row-sorter",
  },
};

const tools = [
  {
    "name": "CSV Row Filter",
    "description": "Extract exactly the rows you care about using intuitive conditions — filter by value, range, pattern, or date across any column. Combine rules with AND/OR logic and download the matching subset in seconds.",
    "href": "/csv-tools/csv-row-filter"
  },
  {
    "name": "CSV Row Counter",
    "description": "How many rows are actually in that file? How many are blank? What's the fill rate per column? Get a fast, complete row count and data completeness report without opening the file in Excel.",
    "href": "/csv-tools/csv-row-counter"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
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
        <h1 className="text-3xl font-semibold mb-2">CSV Row Sorter</h1>
        <p className="text-muted-foreground">
          Sort your CSV by any column — or chain multiple sort rules together. Numeric, alphabetic, and date-aware sorting all handled correctly, so your rows come out in exactly the order you need.
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
