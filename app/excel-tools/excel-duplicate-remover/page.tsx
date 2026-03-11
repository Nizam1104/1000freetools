import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelDuplicateRemover from "@/components/excel-tools/excel-duplicate-remover";
import ExcelDuplicateRemoverSeo from "@/components/seo-content/excel-tools/excel-duplicate-remover";

export const metadata: Metadata = {
  title: `Remove Duplicates from Excel | Free Online Tool`,
  description: `Find and delete duplicate rows in Excel files online. Select specific columns, highlight or remove duplicates. Free, secure, and works in your browser.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-duplicate-remover`,
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

export default function ExcelDuplicateRemoverPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Find and Remove Duplicates in Excel Online
        </h1>
        <p className="text-muted-foreground">
          Clean your data fast. Upload your Excel file, select the columns, and
          let our tool find and remove duplicate rows. Keep your first unique
          entry or highlight all duplicates for review.
        </p>
      </header>
      <div className="mt-8">
        <ExcelDuplicateRemover />
      </div>
      <div className="mt-8">
        <ExcelDuplicateRemoverSeo />
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
