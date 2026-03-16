import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidGenerator from "@/components/uuid-tools/uuid-generator";
import UuidGeneratorSEO from "@/components/seo-content/uuid-tools/uuid-generator";

export const metadata: Metadata = {
  title: `Free UUID Generator | Create Random UUIDs Online`,
  description: `Generate random UUIDs (v4) instantly. Create one or thousands of unique identifiers for software, databases, and applications. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-generator`,
  },
};

const tools = [
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
    name: `Nil/Empty UUID Generator`,
    description: `Nil UUID & Custom Pattern Generator`,
    href: `/uuid-tools/nil-uuid-generator`,
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

export default function UuidGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free UUID Generator</h1>
        <p className="text-muted-foreground">
          Create random UUIDs (v4) instantly. This tool generates universally
          unique identifiers for your software projects, databases, or any
          application requiring a unique key. Simply choose how many you need
          and copy them with one click.
        </p>
      </header>
      <div className="mt-8">
        <UuidGenerator />
      </div>
      <div className="mt-8">
        <UuidGeneratorSEO />
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
