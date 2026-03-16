import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `JWT Expiry Checker | Convert Token Timestamps Online`,
  description: `Check JWT token expiration and convert timestamps. View iat, nbf, exp claims in local time with a countdown timer for expiry.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-expiry-checker-timestamp-converter`,
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
    name: `JWT Claim Extractor & Formatter`,
    description: `Extract & Format JWT Claims`,
    href: `/jwt-tools/jwt-claim-extractor-formatter`,
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

export default function JwtExpiryCheckerTimestampConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Check JWT Expiry & Convert Timestamps</h1>
        <p className="text-muted-foreground">Check when your JWT token expires and convert its timestamps. Our tool shows issuance, activation, and expiration times in your local timezone, with a live countdown for active tokens.</p>
      </header>
      {/* TODO: add tool component for jwt-expiry-checker-timestamp-converter */}
      {/* TODO: add seo component for jwt-expiry-checker-timestamp-converter */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
