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
  title: "CSV Unquote Tool — Remove Unnecessary Quotes From Over-Quoted CSV Files",
  description: "Some exporters wrap every single field in quotes — even plain integers and booleans that don't need it. Strip the clutter, reduce file size, and get a clean CSV where quotes only appear when they matter.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-unquote",
  },
};

const tools = [
  {
    "name": "CSV Quote Escaper",
    "description": "Unquoted fields with embedded commas or newlines corrupt CSV parsers. Our tool applies proper RFC 4180 quoting across every field that needs it — so your file parses correctly everywhere it's used.",
    "href": "/csv-tools/csv-quote-escaper"
  },
  {
    "name": "CSV Formatter",
    "description": "Every data source has its own quirks — inconsistent quotes, mixed delimiters, rogue whitespace. Our CSV Formatter irons them all out and hands you back a file that plays nicely with every tool in your stack.",
    "href": "/csv-tools/csv-formatter"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
  },
  {
    "name": "CSV Delimiter Converter",
    "description": "European exports use semicolons. Your tool expects pipes. Our converter switches delimiters in seconds — and automatically adds proper quoting around any fields that contain the new separator character.",
    "href": "/csv-tools/csv-delimiter-converter"
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
              <BreadcrumbLink href="/csv-tools/csv-unquote">Csv Unquote</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Unquote Tool</h1>
        <p className="text-muted-foreground">
          Some exporters wrap every single field in quotes — even plain integers and booleans that don't need it. Strip the clutter, reduce file size, and get a clean CSV where quotes only appear when they matter.
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
