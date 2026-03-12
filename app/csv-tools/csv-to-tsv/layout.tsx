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
  title: "CSV to TSV Converter — Switch Delimiters From Commas to Tabs Safely",
  description: "Some tools demand tabs, not commas. Our converter safely swaps delimiters while correctly handling fields that contain commas — no manual find-and-replace nightmares, no corrupted columns.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-tsv",
  },
};

const tools = [
  {
    "name": "CSV Delimiter Converter",
    "description": "European exports use semicolons. Your tool expects pipes. Our converter switches delimiters in seconds — and automatically adds proper quoting around any fields that contain the new separator character.",
    "href": "/csv-tools/csv-delimiter-converter"
  },
  {
    "name": "CSV to Text Converter",
    "description": "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.",
    "href": "/csv-tools/csv-to-text"
  },
  {
    "name": "CSV to HTML Table",
    "description": "Publish your data on the web without touching a spreadsheet plugin. Convert any CSV into a clean HTML table — styled, responsive, and ready to paste directly into your website or CMS.",
    "href": "/csv-tools/csv-to-html"
  },
  {
    "name": "CSV to Markdown Table",
    "description": "Stop manually formatting Markdown tables character by character. Paste your CSV and get perfectly aligned Markdown table syntax — ready to drop into a README, wiki, or pull request description.",
    "href": "/csv-tools/csv-to-markdown"
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
              <BreadcrumbLink href="/csv-tools/csv-to-tsv">Csv To Tsv</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to TSV Converter</h1>
        <p className="text-muted-foreground">
          Some tools demand tabs, not commas. Our converter safely swaps delimiters while correctly handling fields that contain commas — no manual find-and-replace nightmares, no corrupted columns.
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
