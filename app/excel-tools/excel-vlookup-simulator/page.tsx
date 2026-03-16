import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelVlookupSimulator from "@/components/excel-tools/excel-vlookup-simulator";
import ExcelVlookupSimulatorSeo from "@/components/seo-content/excel-tools/excel-vlookup-simulator";

export const metadata: Metadata = {
  title: `Excel VLOOKUP Simulator & Practice Tool | Free`,
  description: `Learn and test Excel VLOOKUP formulas. Upload data, simulate lookups, troubleshoot #N/A errors, and understand exact vs approximate match. Free interactive tool.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-vlookup-simulator`,
  },
};

const tools = [
  {
    name: `Excel to PDF Converter`,
    description: `Convert Excel to PDF Online for Free`,
    href: `/excel-tools/excel-to-pdf-converter`,
  },
  {
    name: `CSV to Excel Converter`,
    description: `Convert CSV to Excel Spreadsheet Online`,
    href: `/excel-tools/csv-to-excel-converter`,
  },
  {
    name: `Excel Formula Generator`,
    description: `Generate Excel Formulas from Plain English`,
    href: `/excel-tools/excel-formula-generator`,
  },
  {
    name: `Excel Duplicate Remover`,
    description: `Find and Remove Duplicates in Excel Online`,
    href: `/excel-tools/excel-duplicate-remover`,
  },
  {
    name: `Excel Column Splitter`,
    description: `Split One Excel Column into Multiple Columns`,
    href: `/excel-tools/excel-column-splitter`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function ExcelVlookupSimulatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Practice and Test Excel VLOOKUP Formulas
        </h1>
        <p className="text-muted-foreground">
          Master the VLOOKUP function. Upload your own data or use our examples
          to see how it works, find why you get #N/A errors, and learn the
          difference between exact and approximate match.
        </p>
      </header>
      <div className="mt-8">
        <ExcelVlookupSimulator />
      </div>
      <div className="mt-8">
        <ExcelVlookupSimulatorSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
