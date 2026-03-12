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
  title: "CSV Join / Merge Tool — SQL-Style Joins for CSV Files Without a Database",
  description: "Join two CSV files on a shared key column — just like a SQL JOIN, but without a database. Inner, left, right, or full outer join — pick your type, map your key columns, and get a merged file instantly.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-join-merge",
  },
};

const tools = [
  {
    "name": "CSV File Merger",
    "description": "Monthly exports, regional data splits, batch outputs — merge them all into one clean CSV. Handles mismatched column sets intelligently and optionally tags each row with its source file.",
    "href": "/csv-tools/csv-file-merger"
  },
  {
    "name": "CSV Column Merger",
    "description": "Concatenate first name + last name, city + state + zip, or any set of columns into one using any separator you choose. Merge columns with a custom template and optionally remove the originals — instantly.",
    "href": "/csv-tools/csv-column-merger"
  },
  {
    "name": "CSV Column Extractor",
    "description": "When you only need three columns from a fifty-column export, don't wrestle with Excel. Select exactly the columns you want, rename them if needed, and download a clean, trimmed CSV in seconds.",
    "href": "/csv-tools/csv-column-extractor"
  },
  {
    "name": "CSV Splitter",
    "description": "A 500,000-row CSV doesn't fit in most tools. Split it into equally sized chunks, or divide it by the values in a key column — each output file gets its own header and can be downloaded as a ZIP.",
    "href": "/csv-tools/csv-splitter"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
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
              <BreadcrumbLink href="/csv-tools/csv-join-merge">Csv Join Merge</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Join / Merge Tool</h1>
        <p className="text-muted-foreground">
          Join two CSV files on a shared key column — just like a SQL JOIN, but without a database. Inner, left, right, or full outer join — pick your type, map your key columns, and get a merged file instantly.
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
