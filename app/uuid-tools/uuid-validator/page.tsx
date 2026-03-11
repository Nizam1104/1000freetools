import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidValidator from "@/components/uuid-tools/uuid-validator";
import UuidValidatorSEO from "@/components/seo-content/uuid-tools/uuid-validator";

export const metadata: Metadata = {
  title: `UUID Validator | Check UUID Format Online`,
  description: `Validate any UUID string instantly. Ensure it follows RFC 4122 standards for format, version, and variant. Get detailed error reports for invalid identifiers.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-validator`,
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

export default function UuidValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UUID Validator & Checker</h1>
        <p className="text-muted-foreground">
          Quickly check if your string is a valid UUID. This validator ensures
          your identifier follows the official RFC 4122 format, checking length,
          hex characters, hyphens, and version/variant bits. Get immediate
          feedback on any errors.
        </p>
      </header>
      <div className="mt-8">
        <UuidValidator />
      </div>
      <div className="mt-8">
        <UuidValidatorSEO />
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
