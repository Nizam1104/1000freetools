import type { Metadata } from "next";
import SqlMinifierSeo from "@/components/seo-content/minifier-tools/sql-minifier";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { SqlMinifier } from "@/components/minifier-tools/sql-minifier";

export const metadata: Metadata = {
  title: `SQL Minifier - Compress & Minify SQL Queries Online`,
  description: `Free SQL minifier tool to compress SQL scripts by removing whitespace and comments. Optimize your database queries for embedding in code or reducing log size.`,
  alternates: {
    canonical: `https://1000freetools.com/minifier-tools/sql-minifier`,
  },
};

const tools = [
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `CSS Minifier`,
    description: `CSS Minifier & Compressor Online`,
    href: `/minifier-tools/css-minifier`,
  },
  {
    name: `JavaScript Minifier`,
    description: `JavaScript Minifier & Compressor Tool`,
    href: `/minifier-tools/javascript-minifier`,
  },
  {
    name: `JSON Minifier`,
    description: `JSON Minifier & Compressor Online`,
    href: `/minifier-tools/json-minifier`,
  },
  {
    name: `XML Minifier`,
    description: `XML Minifier & Compressor Tool`,
    href: `/minifier-tools/xml-minifier`,
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

export default function SqlMinifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">SQL Minifier & Compressor Tool</h1>
        <p className="text-muted-foreground">Minify SQL queries to reduce their footprint in application code or logs. This tool removes comments and unnecessary spacing while preserving the query's execution logic.</p>
      </header>
      {<SqlMinifier />}
      <div className="mt-16">
        <SqlMinifierSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
