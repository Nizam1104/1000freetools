import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { SqlPasswordHashGeneratorMd5Sha } from "@/components/sql-tools/sql-password-hash-generator-md5-sha.tsx";
import SqlPasswordHashGeneratorMd5ShaSeo from "@/components/seo-content/sql-tools/sql-password-hash-generator-md5-sha";

export const metadata: Metadata = {
  title: `SQL Password Hash Generator Online | MD5, SHA1, SHA2`,
  description: `Generate SQL INSERT/UPDATE statements for password hashes. Use MD5, SHA1, SHA2 functions for MySQL, PostgreSQL. Free tool for secure password storage in SQL.`,
  alternates: {
    canonical: `https://1000freetools.com/sql-tools/sql-password-hash-generator-md5-sha`,
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

export default function SqlPasswordHashGeneratorMd5ShaPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          SQL Password Hash Generator for INSERT/UPDATE
        </h1>
        <p className="text-muted-foreground">
          Generate SQL code to store hashed passwords in your database. Input a
          password, choose MD5, SHA1, SHA2, and get ready-to-use INSERT or
          UPDATE statements instantly.
        </p>
      </header>
      {<SqlPasswordHashGeneratorMd5Sha />}
      <SqlPasswordHashGeneratorMd5ShaSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
