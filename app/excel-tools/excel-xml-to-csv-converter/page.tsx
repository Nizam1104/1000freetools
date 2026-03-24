import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import ExcelXmlToCsvConverter from "@/components/excel-tools/excel-xml-to-csv-converter";
import ExcelXmlToCsvConverterSeo from "@/components/seo-content/excel-tools/excel-xml-to-csv-converter";

export const metadata: Metadata = {
  title: `XML to CSV Converter for Excel | Free Online`,
  description: `Convert XML files to CSV format for easy import into Excel. Handles nested structures. Free online converter with column mapping.`,
  alternates: {
    canonical: `https://1000freetools.com/excel-tools/excel-xml-to-csv-converter`,
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

export default function ExcelXmlToCsvConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert XML to CSV for Excel
        </h1>
        <p className="text-muted-foreground">
          Turn complex XML files into simple CSV spreadsheets ready for Excel.
          Our tool flattens nested XML structures, letting you map data points
          to clean column headers.
        </p>
      </header>
      <div className="mt-8">
        <ExcelXmlToCsvConverter />
      </div>
      <div className="mt-8">
        <ExcelXmlToCsvConverterSeo />
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
