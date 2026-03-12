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
  title: "CSV Splitter — Break Large CSV Files Into Smaller Chunks by Rows or Groups",
  description: "A 500,000-row CSV doesn't fit in most tools. Split it into equally sized chunks, or divide it by the values in a key column — each output file gets its own header and can be downloaded as a ZIP.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-splitter",
  },
};

const tools = [
  {
    "name": "CSV File Merger",
    "description": "Monthly exports, regional data splits, batch outputs — merge them all into one clean CSV. Handles mismatched column sets intelligently and optionally tags each row with its source file.",
    "href": "/csv-tools/csv-file-merger"
  },
  {
    "name": "CSV Column Splitter",
    "description": "Full names jammed into one column? Addresses that should be five fields? Split any column into as many parts as you need using delimiters, regex, or fixed positions — no formulas, no fuss.",
    "href": "/csv-tools/csv-column-splitter"
  },
  {
    "name": "CSV Join / Merge Tool",
    "description": "Join two CSV files on a shared key column — just like a SQL JOIN, but without a database. Inner, left, right, or full outer join — pick your type, map your key columns, and get a merged file instantly.",
    "href": "/csv-tools/csv-join-merge"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
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
              <BreadcrumbLink href="/csv-tools/csv-splitter">Csv Splitter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Splitter</h1>
        <p className="text-muted-foreground">
          A 500,000-row CSV doesn't fit in most tools. Split it into equally sized chunks, or divide it by the values in a key column — each output file gets its own header and can be downloaded as a ZIP.
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
