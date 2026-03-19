import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { SqlStoredProcedureGenerator } from "@/components/sql-tools/sql-stored-procedure-generator";
import SqlStoredProcedureGeneratorSeo from "@/components/seo-content/sql-tools/sql-stored-procedure-generator";

export const metadata: Metadata = {
  title: `SQL Stored Procedure Generator Online | Create Procedures`,
  description: `Generate SQL stored procedure and function code online. Create boilerplate CREATE PROCEDURE/FUNCTION statements for MySQL, SQL Server. Free code generator.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-stored-procedure-generator`,
  },
};

const tools = [
  {
    name: `SQL Formatter and Beautifier`,
    description: `Free SQL Formatter & Beautifier Online`,
    href: `/sql-tools/sql-formatter-beautifier`,
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

export default function SqlStoredProcedureGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SQL Stored Procedure & Function Generator
        </h1>
        <p className="text-muted-foreground">
          Generate boilerplate SQL code for stored procedures, functions, and
          triggers. Define parameters and logic to get ready-to-use CREATE
          statements for MySQL, SQL Server, and more.
        </p>
      </header>
      {<SqlStoredProcedureGenerator />}
      <SqlStoredProcedureGeneratorSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
