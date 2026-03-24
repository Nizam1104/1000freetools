import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelPivotTableBuilder from "@/components/excel-tools/excel-pivot-table-builder";
import ExcelPivotTableBuilderSeo from "@/components/seo-content/excel-tools/excel-pivot-table-builder";

export const metadata: Metadata = {
  title: `Online Pivot Table Builder for Excel | Free Tool`,
  description: `Create pivot tables from Excel data in your browser. Drag and drop fields to summarize data. Get a preview and steps to build the same pivot in Excel.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-pivot-table-builder`,
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

export default function ExcelPivotTableBuilderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Build a Pivot Table from Excel Data Online
        </h1>
        <p className="text-muted-foreground">
          Summarize large datasets without opening Excel. Upload your file, drag
          fields to create rows, columns, and values, and instantly see your
          pivot table summary. Get instructions to replicate it.
        </p>
      </header>
      <div className="mt-8">
        <ExcelPivotTableBuilder />
      </div>
      <div className="mt-8">
        <ExcelPivotTableBuilderSeo />
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
