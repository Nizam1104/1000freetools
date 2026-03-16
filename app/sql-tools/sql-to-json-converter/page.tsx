import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `SQL to JSON Converter Online | Free Tool`,
  description: `Convert SQL query results to JSON format online. Generate JSON arrays from SELECT statements. Free tool for developers and API integration.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-to-json-converter`,
  },
};

const tools = [
  {
    name: `SQL Formatter and Beautifier`,
    description: `Free SQL Formatter & Beautifier Online`,
    href: `/sql-tools/sql-formatter-beautifier`,
  },
  {
    name: `SQL Minifier and Compressor`,
    description: `SQL Minifier & Compressor Tool`,
    href: `/sql-tools/sql-minifier-compressor`,
  },
  {
    name: `SQL Query Validator and Syntax Checker`,
    description: `SQL Syntax Checker & Query Validator`,
    href: `/sql-tools/sql-query-validator-syntax-checker`,
  },
  {
    name: `JSON to SQL Converter`,
    description: `Convert JSON to SQL Insert Statements`,
    href: `/sql-tools/json-to-sql-converter`,
  },
  {
    name: `SQL Query Builder (Visual)`,
    description: `Visual SQL Query Builder - Drag & Drop`,
    href: `/sql-tools/visual-sql-query-builder`,
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

export default function SqlToJsonConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert SQL Query Results to JSON</h1>
        <p className="text-muted-foreground">Easily transform your SQL query output into JSON format. This tool is perfect for developers needing to integrate database results with web APIs and applications.</p>
      </header>
      {/* TODO: add tool component for sql-to-json-converter */}
      {/* TODO: add seo component for sql-to-json-converter */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
