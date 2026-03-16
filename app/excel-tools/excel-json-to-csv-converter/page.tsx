import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelJsonToCsvConverter from "@/components/excel-tools/excel-json-to-csv-converter";
import ExcelJsonToCsvConverterSeo from "@/components/seo-content/excel-tools/excel-json-to-csv-converter";

export const metadata: Metadata = {
  title: `JSON to CSV Converter for Excel | Free Online Tool`,
  description: `Convert JSON arrays to CSV format for Excel. Flattens nested objects. Free online converter, no coding required.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-json-to-csv-converter`,
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

export default function ExcelJsonToCsvConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert JSON to CSV for Excel Spreadsheets
        </h1>
        <p className="text-muted-foreground">
          Got JSON data from an API? Convert it into a structured CSV file you
          can open and analyze in Excel. Our tool flattens nested objects into
          neat rows and columns.
        </p>
      </header>
      <div className="mt-8">
        <ExcelJsonToCsvConverter />
      </div>
      <div className="mt-8">
        <ExcelJsonToCsvConverterSeo />
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
