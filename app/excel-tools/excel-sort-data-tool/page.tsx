import type { Metadata } from "next";
import ExcelSortDataToolSeo from "@/components/seo-content/excel-tools/excel-sort-data-tool";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { ExcelSortDataTool } from "@/components/utils-tools/excel-sort-data-tool";

export const metadata: Metadata = {
  title: `Sort Excel Data Online | Multi-Column Sorter`,
  description: `Sort Excel files by one or multiple columns, ascending or descending. Keep headers intact. Free online sorting tool for spreadsheets.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-sort-data-tool`,
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

export default function ExcelSortDataToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Sort Excel Data by Columns Online</h1>
        <p className="text-muted-foreground">Organize your spreadsheet with a multi-level sort. Upload your Excel file, choose which columns to sort by and in what order, and download a neatly organized version.</p>
      </header>
      {<ExcelSortDataTool />}
      <div className="mt-16">
        <ExcelSortDataToolSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
