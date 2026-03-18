import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { VisualSqlQueryBuilder } from "@/components/sql-tools/visual-sql-query-builder.tsx";
import VisualSqlQueryBuilderSeo from "@/components/seo-content/sql-tools/visual-sql-query-builder";

export const metadata: Metadata = {
  title: `Visual SQL Query Builder Online | Drag & Drop Tool`,
  description: `Build SQL queries visually with our free drag-and-drop query builder. Generate SELECT, JOIN, WHERE statements without coding. Perfect for beginners and prototyping.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/visual-sql-query-builder`,
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

export default function VisualSqlQueryBuilderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Visual SQL Query Builder - Drag & Drop
        </h1>
        <p className="text-muted-foreground">
          Build complex SQL queries visually without writing code. Use our
          drag-and-drop interface to select tables, apply joins, filters, and
          sorting, then generate the SQL instantly.
        </p>
      </header>
      {<VisualSqlQueryBuilder />}
      <VisualSqlQueryBuilderSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
