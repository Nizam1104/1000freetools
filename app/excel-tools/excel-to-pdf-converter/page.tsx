import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelToPdfConverter from "@/components/excel-tools/excel-to-pdf-converter";
import ExcelToPdfConverterSeo from "@/components/seo-content/excel-tools/excel-to-pdf-converter";

export const metadata: Metadata = {
  title: `Free Excel to PDF Converter Online | No Installation`,
  description: `Convert Excel files to PDF instantly. Preserve formatting, charts, and tables. Free online tool, no registration required. Supports .xlsx and .xls.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-to-pdf-converter`,
  },
};

const tools = [
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
    name: `Excel Merge Cells Tool`,
    description: `Merge or Combine Excel Cells Online`,
    href: `/excel-tools/excel-merge-cells-tool`,
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

export default function ExcelToPdfConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert Excel to PDF Online for Free
        </h1>
        <p className="text-muted-foreground">
          Turn your Excel spreadsheets into polished PDF documents in seconds.
          Our free online converter keeps your formatting, charts, and tables
          intact, ready for sharing or printing.
        </p>
      </header>
      <div className="mt-8">
        <ExcelToPdfConverter />
      </div>
      <div className="mt-8">
        <ExcelToPdfConverterSeo />
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
