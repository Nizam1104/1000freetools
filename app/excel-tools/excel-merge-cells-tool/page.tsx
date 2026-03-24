import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelMergeCellsTool from "@/components/excel-tools/excel-merge-cells-tool";
import ExcelMergeCellsToolSeo from "@/components/seo-content/excel-tools/excel-merge-cells-tool";

export const metadata: Metadata = {
  title: `Merge Excel Cells Online | Combine Cell Contents`,
  description: `Merge multiple Excel cells into one with custom separators (comma, space). Also unmerge cells. Free online utility for formatting spreadsheets.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-merge-cells-tool`,
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

export default function ExcelMergeCellsToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Merge or Combine Excel Cells Online
        </h1>
        <p className="text-muted-foreground">
          Need to combine data from several cells? Merge them into one with your
          choice of separator. We also have a tool to unmerge cells and
          distribute the content.
        </p>
      </header>
      <div className="mt-8">
        <ExcelMergeCellsTool />
      </div>
      <div className="mt-8">
        <ExcelMergeCellsToolSeo />
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
