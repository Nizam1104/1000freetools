import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { SqlQueryValidatorSyntaxChecker } from "@/components/sql-tools/sql-query-validator-syntax-checker";
import SqlQueryValidatorSyntaxCheckerSeo from "@/components/seo-content/sql-tools/sql-query-validator-syntax-checker";

export const metadata: Metadata = {
  title: `SQL Syntax Checker Online | Validate SQL Queries Free`,
  description: `Check your SQL query syntax for errors online. Free validator for MySQL, PostgreSQL, SQL Server. Find missing keywords and structural mistakes before execution.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-query-validator-syntax-checker`,
  },
};

const tools = [
  {
    name: `SQL Formatter and Beautifier`,
    description: `Free SQL Formatter & Beautifier Online`,
    href: `/sql-tools/sql-formatter-beautifier`,
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

export default function SqlQueryValidatorSyntaxCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SQL Syntax Checker & Query Validator
        </h1>
        <p className="text-muted-foreground">
          Validate your SQL code for syntax errors instantly. This checker helps
          you find and fix mistakes before running queries, saving time and
          preventing database errors.
        </p>
      </header>
      {<SqlQueryValidatorSyntaxChecker />}
      <SqlQueryValidatorSyntaxCheckerSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
