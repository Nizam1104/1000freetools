import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TomlToSqlConverter from "@/components/toml-tools/toml-to-sql-converter";
import TomlToSqlConverterSeo from "@/components/seo-content/toml-tools/toml-to-sql-converter";

export const metadata: Metadata = {
  title: `Free TOML to SQL Converter | Generate SQL from TOML`,
  description: `Convert TOML files to SQL CREATE TABLE and INSERT statements instantly. Supports MySQL, PostgreSQL, SQLite. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/toml-tools/toml-to-sql-converter`,
  },
};

const tools = [
  {
    name: `TOML to JSON Converter`,
    description: `Convert TOML to JSON Instantly`,
    href: `/toml-tools/toml-to-json-converter`,
  },
  {
    name: `JSON to TOML Converter`,
    description: `Convert JSON to TOML Online`,
    href: `/toml-tools/json-to-toml-converter`,
  },
  {
    name: `TOML Validator and Linter`,
    description: `Validate and Lint Your TOML Files`,
    href: `/toml-tools/toml-validator-linter`,
  },
  {
    name: `TOML Beautifier and Formatter`,
    description: `Beautify and Format TOML Code`,
    href: `/toml-tools/toml-beautifier-formatter`,
  },
  {
    name: `TOML to YAML Converter`,
    description: `Convert TOML to YAML Easily`,
    href: `/toml-tools/toml-to-yaml-converter`,
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

export default function TomlToSqlConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">TOML to SQL Converter</h1>
        <p className="text-muted-foreground">Easily transform your TOML configuration data into SQL schemas and insert queries. This free tool generates ready-to-use SQL for MySQL, PostgreSQL, and SQLite from any valid TOML file. Perfect for developers migrating configs to databases or setting up initial data structures.</p>
      </header>
      {<TomlToSqlConverter />}
      <div className="mt-8"><TomlToSqlConverterSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
