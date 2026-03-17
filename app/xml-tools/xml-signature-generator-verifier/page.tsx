import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import XmlSignatureGeneratorVerifier from "@/components/xml-tools/xml-signature-generator-verifier";

export const metadata: Metadata = {
  title: `XML Digital Signature Tool | Sign & Verify XML Online`,
  description: `Generate and verify W3C XML digital signatures. Sign entire documents or elements. Check integrity and authenticity. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/xml-tools/xml-signature-generator-verifier`,
  },
};

const tools = [
  {
    name: `XML Formatter and Validator`,
    description: `Format and Validate Your XML Instantly`,
    href: `/xml-tools/xml-formatter-validator`,
  },
  {
    name: `XML to JSON Converter`,
    description: `Convert XML to JSON Online`,
    href: `/xml-tools/xml-to-json-converter`,
  },
  {
    name: `JSON to XML Converter`,
    description: `Convert JSON to XML in Seconds`,
    href: `/xml-tools/json-to-xml-converter`,
  },
  {
    name: `XML Minifier and Compressor`,
    description: `Minify and Compress XML Files`,
    href: ``,
  },
  {
    name: `XML Viewer and Editor`,
    description: `View and Edit XML Online`,
    href: `/xml-tools/xml-viewer-editor`,
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

export default function XmlSignatureGeneratorVerifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Generate & Verify XML Digital Signatures
        </h1>
        <p className="text-muted-foreground">
          Add secure digital signatures to your XML documents or verify existing
          ones. This tool implements the W3C XML Signature standard for data
          integrity and authentication.
        </p>
      </header>
      <div className="mt-8"><XmlSignatureGeneratorVerifier /></div>
      {/* TODO: add seo component for xml-signature-generator-verifier */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
