import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AsciiCodeTable from "@/components/ascii-tools/ascii-code-table";
import AsciiCodeTableSeo from "@/components/seo-content/ascii-tools/ascii-code-table";

export const metadata: Metadata = {
  title: `ASCII Table: Complete ASCII Character Codes and Values`,
  description: `Complete ASCII reference table with decimal, hex, octal, and binary values for characters 0-127. Includes control characters, printable characters, and extended ASCII. Searchable and sortable.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii-code-table`,
  },
};

const tools = [
  {
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
  },
  {
    name: `Leet Speak Converter`,
    description: `Leet Speak Converter: Convert Text to 1337 Online`,
    href: `/ascii-tools/leet-speak-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
];

export default function AsciiCodeTablePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ASCII Table: Complete ASCII Code Reference (0-127)
        </h1>
        <p className="text-muted-foreground">
          Comprehensive ASCII reference table showing decimal, hex, octal, and
          binary values for all 128 ASCII characters. Includes control
          characters (NUL, SOH, STX), printable characters, and extended ASCII.
          Search and filter by character or code.
        </p>
      </header>
      <div className="mt-8">
        <AsciiCodeTable />
      </div>
      <div className="mt-8">
        <AsciiCodeTableSeo />
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
