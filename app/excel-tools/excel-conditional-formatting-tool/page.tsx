import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelConditionalFormattingTool from "@/components/excel-tools/excel-conditional-formatting-tool";
import ExcelConditionalFormattingToolSeo from "@/components/seo-content/excel-tools/excel-conditional-formatting-tool";

export const metadata: Metadata = {
  title: `Excel Conditional Formatting Online | Highlight Cells`,
  description: `Apply conditional formatting to Excel files online. Highlight cells based on value, text, or duplicates. Download the formatted .xlsx file instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-conditional-formatting-tool`,
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

export default function ExcelConditionalFormattingToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Apply Conditional Formatting to Excel Online
        </h1>
        <p className="text-muted-foreground">
          Make your data stand out. Upload your spreadsheet and add color rules
          to highlight important cells, duplicates, or values in a range.
          Download the visually formatted Excel file.
        </p>
      </header>
      <div className="mt-8">
        <ExcelConditionalFormattingTool />
      </div>
      <div className="mt-8">
        <ExcelConditionalFormattingToolSeo />
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
