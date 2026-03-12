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
  title: "CSV to JSON Converter — Transform Spreadsheet Data Into API-Ready JSON",
  description: "Bridge the gap between flat files and modern APIs. Convert any CSV into clean JSON objects in one click — with smart type inference, optional nesting, and output that's ready to plug straight into your codebase.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-json",
  },
};

const tools = [
  {
    "name": "CSV to Array Converter",
    "description": "Stop copy-pasting data into code by hand. Convert any CSV column or full table into a native array literal for JavaScript, Python, PHP, or Ruby — correctly formatted and ready to paste into your project.",
    "href": "/csv-tools/csv-to-array"
  },
  {
    "name": "CSV to YAML Converter",
    "description": "From data tables to config files in one step. Convert CSV into clean YAML mappings with automatic type detection — ideal for seeding configuration files, test fixtures, or deployment manifests.",
    "href": "/csv-tools/csv-to-yaml"
  },
  {
    "name": "CSV to HTML Table",
    "description": "Publish your data on the web without touching a spreadsheet plugin. Convert any CSV into a clean HTML table — styled, responsive, and ready to paste directly into your website or CMS.",
    "href": "/csv-tools/csv-to-html"
  },
  {
    "name": "CSV to XML Converter",
    "description": "Convert flat CSV data into well-formed XML with full control over element names, attribute vs child node structure, and indentation. Generate XML that's ready for legacy systems, APIs, or data interchange pipelines.",
    "href": "/csv-tools/csv-to-xml"
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
              <BreadcrumbLink href="/csv-tools/csv-to-json">Csv To Json</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to JSON Converter</h1>
        <p className="text-muted-foreground">
          Bridge the gap between flat files and modern APIs. Convert any CSV into clean JSON objects in one click — with smart type inference, optional nesting, and output that's ready to plug straight into your codebase.
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
