import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelColumnSplitter from "@/components/excel-tools/excel-column-splitter";
import ExcelColumnSplitterSeo from "@/components/seo-content/excel-tools/excel-column-splitter";

export const metadata: Metadata = {
  title: `Split Excel Column by Delimiter | Free Online Tool`,
  description: `Split data in an Excel column into multiple columns using a delimiter or fixed width. Free online tool for separating names, addresses, and combined data.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-column-splitter`,
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

export default function ExcelColumnSplitterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Split One Excel Column into Multiple Columns
        </h1>
        <p className="text-muted-foreground">
          Got data crammed into one column? Split it into separate columns by
          commas, spaces, or any custom character. Perfect for separating first
          and last names or splitting addresses.
        </p>
      </header>
      <div className="mt-8">
        <ExcelColumnSplitter />
      </div>
      <div className="mt-8">
        <ExcelColumnSplitterSeo />
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
