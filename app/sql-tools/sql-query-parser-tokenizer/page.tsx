import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `SQL Parser Online | Tokenize & Breakdown SQL Queries`,
  description: `Parse and tokenize SQL queries online. Break down SQL statements into keywords, identifiers, and literals. Free tool for learning and debugging SQL syntax.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-query-parser-tokenizer`,
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

export default function SqlQueryParserTokenizerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SQL Query Parser & Tokenizer - Breakdown Tool</h1>
        <p className="text-muted-foreground">Parse any SQL query to see its tokens and structure. This tool breaks down SELECT, FROM, WHERE clauses into components, helping you understand and debug complex SQL.</p>
      </header>
      {/* TODO: add tool component for sql-query-parser-tokenizer */}
      {/* TODO: add seo component for sql-query-parser-tokenizer */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
