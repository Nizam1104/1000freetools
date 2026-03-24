import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelFormulaExtractor from "@/components/excel-tools/excel-formula-extractor";
import ExcelFormulaExtractorSeo from "@/components/seo-content/excel-tools/excel-formula-extractor";

export const metadata: Metadata = {
  title: `Extract Excel Formulas | List All Formulas in Workbook`,
  description: `Upload an Excel file to extract and list every formula used. See cell references, formulas, and sheet names. Great for auditing or learning from templates.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-formula-extractor`,
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

export default function ExcelFormulaExtractorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Extract All Formulas from an Excel File
        </h1>
        <p className="text-muted-foreground">
          Reverse-engineer a complex spreadsheet. Upload an Excel workbook, and
          we'll pull out every single formula, showing you the cell reference,
          the formula, and which sheet it's on.
        </p>
      </header>
      <div className="mt-8">
        <ExcelFormulaExtractor />
      </div>
      <div className="mt-8">
        <ExcelFormulaExtractorSeo />
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
