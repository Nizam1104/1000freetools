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
  title: "CSV to HTML Table — Convert CSV Data Into Embeddable HTML Tables",
  description: "Publish your data on the web without touching a spreadsheet plugin. Convert any CSV into a clean HTML table — styled, responsive, and ready to paste directly into your website or CMS.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-html",
  },
};

const tools = [
  {
    "name": "CSV to Excel Converter",
    "description": "Not everyone speaks CSV. Convert your data to a properly formatted Excel workbook — with styled headers, auto-sized columns, and .xlsx compatibility that opens perfectly in every version of Excel.",
    "href": "/csv-tools/csv-to-excel"
  },
  {
    "name": "CSV to JSON Converter",
    "description": "Bridge the gap between flat files and modern APIs. Convert any CSV into clean JSON objects in one click — with smart type inference, optional nesting, and output that's ready to plug straight into your codebase.",
    "href": "/csv-tools/csv-to-json"
  },
  {
    "name": "CSV to Markdown Table",
    "description": "Stop manually formatting Markdown tables character by character. Paste your CSV and get perfectly aligned Markdown table syntax — ready to drop into a README, wiki, or pull request description.",
    "href": "/csv-tools/csv-to-markdown"
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
              <BreadcrumbLink href="/csv-tools/csv-to-html">Csv To Html</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to HTML Table</h1>
        <p className="text-muted-foreground">
          Publish your data on the web without touching a spreadsheet plugin. Convert any CSV into a clean HTML table — styled, responsive, and ready to paste directly into your website or CMS.
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
