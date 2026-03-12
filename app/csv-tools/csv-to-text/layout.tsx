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
  title: "CSV to Text Converter — Generate Plain Text Content From CSV Rows Using Templates",
  description: "Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-text",
  },
};

const tools = [
  {
    "name": "CSV to Markdown Table",
    "description": "Stop manually formatting Markdown tables character by character. Paste your CSV and get perfectly aligned Markdown table syntax — ready to drop into a README, wiki, or pull request description.",
    "href": "/csv-tools/csv-to-markdown"
  },
  {
    "name": "CSV to TSV Converter",
    "description": "Some tools demand tabs, not commas. Our converter safely swaps delimiters while correctly handling fields that contain commas — no manual find-and-replace nightmares, no corrupted columns.",
    "href": "/csv-tools/csv-to-tsv"
  },
  {
    "name": "CSV to Array Converter",
    "description": "Stop copy-pasting data into code by hand. Convert any CSV column or full table into a native array literal for JavaScript, Python, PHP, or Ruby — correctly formatted and ready to paste into your project.",
    "href": "/csv-tools/csv-to-array"
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
              <BreadcrumbLink href="/csv-tools/csv-to-text">Csv To Text</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to Text Converter</h1>
        <p className="text-muted-foreground">
          Transform rows of data into natural-language text using your own template. Merge field values into sentences, bullets, or custom formats — ideal for generating personalized messages, reports, or content at scale.
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
