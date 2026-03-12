import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "CSV Data Normalizer — Standardize Dates, Phone Numbers, and Values Across CSV Columns",
  description: "Mixed date formats, inconsistent phone number styles, 'Yes/yes/YES/1/true' in the same column — our normalizer applies consistent formatting rules across your data so every value speaks the same language.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-data-normalizer",
  },
};

const tools = [
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
    "name": "CSV Minifier",
    "description": "Bloated CSVs slow down uploads, APIs, and imports. Our minifier strips every unnecessary byte — trailing spaces, redundant quotes, blank lines — giving you the leanest possible file with all your data intact.",
    "href": "/csv-tools/csv-minifier"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/csv-tools">Csv Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/csv-tools/csv-data-normalizer">Csv Data Normalizer</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Data Normalizer</h1>
        <p className="text-muted-foreground">
          Mixed date formats, inconsistent phone number styles, 'Yes/yes/YES/1/true' in the same column — our normalizer applies consistent formatting rules across your data so every value speaks the same language.
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
