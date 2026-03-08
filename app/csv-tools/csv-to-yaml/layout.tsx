import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV to YAML Converter — Turn CSV Data Into Human-Readable YAML Configuration",
  description: "From data tables to config files in one step. Convert CSV into clean YAML mappings with automatic type detection — ideal for seeding configuration files, test fixtures, or deployment manifests.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-yaml",
  },
};

const tools = [
  {
    "name": "CSV to JSON Converter",
    "description": "Bridge the gap between flat files and modern APIs. Convert any CSV into clean JSON objects in one click — with smart type inference, optional nesting, and output that's ready to plug straight into your codebase.",
    "href": "/csv-tools/csv-to-json"
  },
  {
    "name": "CSV to Array Converter",
    "description": "Stop copy-pasting data into code by hand. Convert any CSV column or full table into a native array literal for JavaScript, Python, PHP, or Ruby — correctly formatted and ready to paste into your project.",
    "href": "/csv-tools/csv-to-array"
  },
  {
    "name": "CSV to XML Converter",
    "description": "Convert flat CSV data into well-formed XML with full control over element names, attribute vs child node structure, and indentation. Generate XML that's ready for legacy systems, APIs, or data interchange pipelines.",
    "href": "/csv-tools/csv-to-xml"
  },
  {
    "name": "CSV to SQL Converter",
    "description": "Skip the manual SQL writing. Upload your CSV and get a ready-to-run SQL script — complete with a CREATE TABLE statement and properly typed INSERT rows — in the dialect your database actually speaks.",
    "href": "/csv-tools/csv-to-sql"
  },
  {
    "name": "CSV to Text Converter",
    "description": "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.",
    "href": "/csv-tools/csv-to-text"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to YAML Converter</h1>
        <p className="text-muted-foreground">
          From data tables to config files in one step. Convert CSV into clean YAML mappings with automatic type detection — ideal for seeding configuration files, test fixtures, or deployment manifests.
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
