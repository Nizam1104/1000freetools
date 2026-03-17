import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `SQL Date Function Playground Online | Test Date Queries`,
  description: `Test SQL date and time functions online. Try DATE_ADD, DATEDIFF, EXTRACT with custom inputs for MySQL, PostgreSQL. Free interactive playground for developers.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-date-function-playground`,
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

export default function SqlDateFunctionPlaygroundPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SQL Date & Time Function Playground
        </h1>
        <p className="text-muted-foreground">
          Experiment with SQL date functions in a live playground. Test
          DATE_ADD, DATEDIFF, EXTRACT, and more with your own inputs and see
          results instantly for MySQL, PostgreSQL.
        </p>
      </header>
      {/* TODO: add tool component for sql-date-function-playground */}
      {/* TODO: add seo component for sql-date-function-playground */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
