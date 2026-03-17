import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `SQL Case Converter Online | Change Keyword Case`,
  description: `Convert SQL keyword case online. Change SELECT, FROM, WHERE to UPPERCASE, lowercase, or Proper Case. Free tool for standardizing SQL code style.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-case-converter-upper-lower-proper`,
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

export default function SqlCaseConverterUpperLowerProperPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SQL Case Converter - UPPER, lower, or Proper Case
        </h1>
        <p className="text-muted-foreground">
          Change the case of SQL keywords in your queries instantly. Convert to
          UPPERCASE, lowercase, or Proper Case to match your team's coding
          standards and improve readability.
        </p>
      </header>
      {/* TODO: add tool component for sql-case-converter-upper-lower-proper */}
      {/* TODO: add seo component for sql-case-converter-upper-lower-proper */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
