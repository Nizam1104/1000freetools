import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelCsvToExcelConverter from "@/components/excel-tools/csv-to-excel-converter";
import CsvToExcelConverterSeo from "@/components/seo-content/excel-tools/csv-to-excel-converter";

export const metadata: Metadata = {
  title: `CSV to Excel Converter | Free Online Tool`,
  description: `Convert CSV files to Excel (.xlsx) online for free. Supports custom delimiters, large files, and data preview. No registration needed.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/csv-to-excel-converter`,
  },
};

const tools = [
  {
    name: `Excel to PDF Converter`,
    description: `Convert Excel to PDF Online for Free`,
    href: `/excel-tools/excel-to-pdf-converter`,
  },
  {
    name: `Excel Formula Generator`,
    description: `Generate Excel Formulas from Plain English`,
    href: `/excel-tools/excel-formula-generator`,
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

export default function CsvToExcelConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert CSV to Excel Spreadsheet Online
        </h1>
        <p className="text-muted-foreground">
          Easily transform your CSV data into a fully functional Excel workbook.
          Our tool handles commas, tabs, or custom delimiters, giving you a
          clean, editable spreadsheet.
        </p>
      </header>
      <div className="mt-8">
        <ExcelCsvToExcelConverter />
      </div>
      <div className="mt-8">
        <CsvToExcelConverterSeo />
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
