import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UuidToGuidConverter from "@/components/uuid-tools/uuid-to-guid-converter";
import UuidToGuidConverterSEO from "@/components/seo-content/uuid-tools/uuid-to-guid-converter";

export const metadata: Metadata = {
  title: `UUID to GUID Converter | Microsoft GUID Format`,
  description: `Convert UUIDs to Microsoft GUID format and back. Add or remove braces to make identifiers compatible with Windows, .NET, and COM. Handle byte-order nuances.`,
  alternates: {
    canonical: `https://1000freetools.com/uuid-tools/uuid-to-guid-converter`,
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

export default function UuidToGuidConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          UUID to GUID Converter (Windows Format)
        </h1>
        <p className="text-muted-foreground">
          Convert standard UUID strings to Microsoft GUID format (with braces)
          and vice versa. This tool handles the formatting differences, making
          identifiers compatible with Windows systems, .NET, and COM
          applications.
        </p>
      </header>
      <div className="mt-8">
        <UuidToGuidConverter />
      </div>
      <div className="mt-8">
        <UuidToGuidConverterSEO />
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
