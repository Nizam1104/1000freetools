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
  title: "CSV Formatter — Standardize Messy CSVs to a Clean, Consistent Format",
  description: "Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-formatter",
  },
};

const tools = [
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
  },
  {
    "name": "CSV Data Normalizer",
    "description": "Mixed date formats, inconsistent phone number styles, 'Yes/yes/YES/1/true' in the same column — our normalizer applies consistent formatting rules across your data so every value speaks the same language.",
    "href": "/csv-tools/csv-data-normalizer"
  },
  {
    "name": "CSV Minifier",
    "description": "Bloated CSVs slow down uploads, APIs, and imports. Our minifier strips every unnecessary byte — trailing spaces, redundant quotes, blank lines — giving you the leanest possible file with all your data intact.",
    "href": "/csv-tools/csv-minifier"
  },
  {
    "name": "CSV Pretty Print",
    "description": "Raw CSV is for machines. Pretty-printed CSV is for humans. Instantly convert your file into a neatly padded, column-aligned text table perfect for documentation, Slack messages, or terminal output.",
    "href": "/csv-tools/csv-pretty-print"
  },
  {
    "name": "CSV Validator",
    "description": "Malformed CSVs silently corrupt imports and crash scripts. Run your file through our validator to expose mismatched columns, rogue delimiters, and encoding gremlins before they cause real damage.",
    "href": "/csv-tools/csv-validator"
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
              <BreadcrumbLink href="/csv-tools/csv-formatter">Csv Formatter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Formatter</h1>
        <p className="text-muted-foreground">
          Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack.
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
