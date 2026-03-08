import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Delimiter Converter — Change CSV Delimiter to Comma, Semicolon, Pipe, or Tab",
  description: "European exports use semicolons. Your tool expects pipes. Our converter switches delimiters in seconds — and automatically adds proper quoting around any fields that contain the new separator character.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-delimiter-converter",
  },
};

const tools = [
  {
    "name": "CSV to TSV Converter",
    "description": "Some tools demand tabs, not commas. Our converter safely swaps delimiters while correctly handling fields that contain commas — no manual find-and-replace nightmares, no corrupted columns.",
    "href": "/csv-tools/csv-to-tsv"
  },
  {
    "name": "CSV Column Splitter",
    "description": "Full names jammed into one column? Addresses that should be five fields? Split any column into as many parts as you need using delimiters, regex, or fixed positions — no formulas, no fuss.",
    "href": "/csv-tools/csv-column-splitter"
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
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Delimiter Converter</h1>
        <p className="text-muted-foreground">
          European exports use semicolons. Your tool expects pipes. Our converter switches delimiters in seconds — and automatically adds proper quoting around any fields that contain the new separator character.
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
