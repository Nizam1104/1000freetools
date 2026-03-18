import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import SqlEscapeString from "@/components/sql-tools/sql-escape-string";
import SqlEscapeUnescapeToolSeo from "@/components/seo-content/sql-tools/sql-escape-unescape-tool";

export const metadata: Metadata = {
  title: `SQL Escape Tool Online | Escape/Unescape Strings for SQL`,
  description: `Escape and unescape strings for SQL queries online. Prevent SQL injection by escaping quotes and special characters. Free tool for MySQL, PostgreSQL, SQL Server.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-escape-unescape-tool`,
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

export default function SqlEscapeUnescapeToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SQL Escape & Unescape Special Characters
        </h1>
        <p className="text-muted-foreground">
          Escape special characters in strings to prevent SQL injection and
          syntax errors. This tool also unescapes strings, making data safe for
          queries in MySQL, PostgreSQL, and more.
        </p>
      </header>
      <div className="mt-8">
        <SqlEscapeString />
      </div>
      <SqlEscapeUnescapeToolSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
