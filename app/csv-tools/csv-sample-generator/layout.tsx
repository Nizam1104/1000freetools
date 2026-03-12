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
  title: "CSV Sample Generator — Extract a Random Sample From Any Large CSV File",
  description: "Working with millions of rows but only need a representative slice? Extract a random sample of any size — by row count or percentage — with optional stratification to ensure balanced representation across key columns.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-sample-generator",
  },
};

const tools = [
  {
    "name": "CSV Random Row Generator",
    "description": "Stop hand-crafting test data. Define your columns and data types, choose how many rows you need, and generate a realistic fake CSV dataset in seconds — perfect for development, QA, and load testing.",
    "href": "/csv-tools/csv-random-row-generator"
  },
  {
    "name": "CSV Row Counter",
    "description": "How many rows are actually in that file? How many are blank? What's the fill rate per column? Get a fast, complete row count and data completeness report without opening the file in Excel.",
    "href": "/csv-tools/csv-row-counter"
  },
  {
    "name": "CSV Row Filter",
    "description": "Extract exactly the rows you care about using intuitive conditions — filter by value, range, pattern, or date across any column. Combine rules with AND/OR logic and download the matching subset in seconds.",
    "href": "/csv-tools/csv-row-filter"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
  },
  {
    "name": "CSV Row Sorter",
    "description": "Sort your CSV by any column — or chain multiple sort rules together. Numeric, alphabetic, and date-aware sorting all handled correctly, so your rows come out in exactly the order you need.",
    "href": "/csv-tools/csv-row-sorter"
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
              <BreadcrumbLink href="/csv-tools/csv-sample-generator">Csv Sample Generator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Sample Generator</h1>
        <p className="text-muted-foreground">
          Working with millions of rows but only need a representative slice? Extract a random sample of any size — by row count or percentage — with optional stratification to ensure balanced representation across key columns.
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
