import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidCaseFormatter from "@/components/uuid-tools/uuid-case-formatter";
import UuidCaseFormatterSEO from "@/components/seo-content/uuid-tools/uuid-case-formatter";

export const metadata: Metadata = {
  title: `UUID Formatter | Change Case & Hyphen Format`,
  description: `Reformat any UUID. Convert to uppercase or lowercase, and add/remove hyphens to standardize its appearance. Essential for data normalization.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-case-formatter`,
  },
};

const tools = [
  {
    name: `UUID Generator`,
    description: `Free UUID Generator`,
    href: `/uuid-tools/uuid-generator`,
  },
  {
    name: `UUID Decoder`,
    description: `UUID Decoder & Analyzer`,
    href: `/uuid-tools/uuid-decoder`,
  },
  {
    name: `UUID Validator`,
    description: `UUID Validator & Checker`,
    href: `/uuid-tools/uuid-validator`,
  },
  {
    name: `UUID Version Converter`,
    description: `UUID Version Converter (v3, v5)`,
    href: `/uuid-tools/uuid-version-converter`,
  },
  {
    name: `Bulk UUID Generator`,
    description: `Bulk UUID Generator for Mass Production`,
    href: `/uuid-tools/bulk-uuid-generator`,
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

export default function UuidCaseFormatterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          UUID Case Converter & Hyphen Formatter
        </h1>
        <p className="text-muted-foreground">
          Standardize your UUIDs' format. Convert between uppercase and
          lowercase, and add or remove hyphens to match your system's
          requirements. Accepts UUIDs with or without braces.
        </p>
      </header>
      <div className="mt-8">
        <UuidCaseFormatter />
      </div>
      <div className="mt-8">
        <UuidCaseFormatterSEO />
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
