import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `SQL Formatter Online | Beautify & Format SQL Code Free`,
  description: `Format and beautify your SQL code online for free. Supports MySQL, PostgreSQL, SQL Server. Make SQL readable with auto-indentation and syntax highlighting.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-formatter-beautifier`,
  },
};

const tools = [
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
    name: `SQL to JSON Converter`,
    description: `Convert SQL Query Results to JSON`,
    href: `/sql-tools/sql-to-json-converter`,
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

export default function SqlFormatterBeautifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free SQL Formatter & Beautifier Online</h1>
        <p className="text-muted-foreground">Clean up messy SQL code instantly with our free formatter. Make your queries readable and maintainable with proper indentation and keyword highlighting. Supports all major SQL dialects.</p>
      </header>
      {/* TODO: add tool component for sql-formatter-beautifier */}
      {/* TODO: add seo component for sql-formatter-beautifier */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
