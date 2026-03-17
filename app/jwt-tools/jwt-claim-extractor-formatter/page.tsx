import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { JwtClaimExtractorFormatter } from "@/components/jwt-tools/jwt-claim-extractor-formatter.tsx";

export const metadata: Metadata = {
  title: `JWT Claim Extractor | View & Format Token Claims`,
  description: `Extract and format JWT claims online. View standard and custom payload claims with formatted dates from any JSON Web Token.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-claim-extractor-formatter`,
  },
};

const tools = [
  {
    name: `JWT Decoder & Validator`,
    description: `Decode & Validate JWT Tokens Instantly`,
    href: `/jwt-tools/jwt-decoder-validator`,
  },
  {
    name: `JWT Generator & Signer`,
    description: `Generate & Sign Custom JWT Tokens`,
    href: `/jwt-tools/jwt-generator-signer`,
  },
  {
    name: `JWT Debugger & Tester`,
    description: `Debug & Test JWT Tokens Step-by-Step`,
    href: `/jwt-tools/jwt-debugger-tester`,
  },
  {
    name: `JWT Secret & Key Generator`,
    description: `Generate JWT Secrets & Key Pairs`,
    href: `/jwt-tools/jwt-secret-key-generator`,
  },
  {
    name: `JWT Expiry Checker & Timestamp Converter`,
    description: `Check JWT Expiry & Convert Timestamps`,
    href: `/jwt-tools/jwt-expiry-checker-timestamp-converter`,
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

export default function JwtClaimExtractorFormatterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Extract & Format JWT Claims</h1>
        <p className="text-muted-foreground">Quickly extract and format claims from any JWT payload. View standard and custom claims in a clean, searchable list with human-readable dates for easier debugging and analysis.</p>
      </header>
      {<JwtClaimExtractorFormatter />}
      {/* TODO: add seo component for jwt-claim-extractor-formatter */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
