import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JsonToSqlConverter from "@/components/sql-tools/json-to-sql-converter";
import JsonToSqlConverterSeo from "@/components/seo-content/sql-tools/json-to-sql-converter";

export const metadata: Metadata = {
  title: `JSON to SQL Converter Online | Generate INSERT Statements`,
  description: `Convert JSON to SQL INSERT statements online. Generate SQL code from JSON data to insert into databases like MySQL, PostgreSQL. Free and easy.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/json-to-sql-converter`,
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

export default function JsonToSqlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert JSON to SQL Insert Statements
        </h1>
        <p className="text-muted-foreground">
          Transform JSON data into ready-to-use SQL INSERT commands. Quickly
          populate your database tables from JSON objects or arrays with this
          free conversion tool.
        </p>
      </header>
      <div className="mt-8">
        <JsonToSqlConverter />
      </div>
      <div className="mt-8">
        <JsonToSqlConverterSeo />
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
