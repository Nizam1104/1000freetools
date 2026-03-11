import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JwtGeneratorSigner from "@/components/jwt-tools/jwt-generator-signer";
import JwtGeneratorSignerSEO from "@/components/seo-content/jwt-tools/jwt-generator-signer";

export const metadata: Metadata = {
  title: `Free JWT Generator | Create & Sign Custom Tokens`,
  description: `Generate and sign custom JSON Web Tokens online. Set claims, choose algorithm (HS256, RS256), and create secure JWTs for API testing and development.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-generator-signer`,
  },
};

const tools = [
  {
    name: `JWT Decoder & Validator`,
    description: `Decode & Validate JWT Tokens Instantly`,
    href: `/jwt-tools/jwt-decoder-validator`,
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

export default function JwtGeneratorSignerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Generate & Sign Custom JWT Tokens
        </h1>
        <p className="text-muted-foreground">
          Create secure JSON Web Tokens for testing and development. Define
          custom claims, choose signing algorithms, and generate signed JWTs
          instantly with our free generator. Perfect for mocking authentication
          in APIs and web apps.
        </p>
      </header>
      <div className="mt-8">
        <JwtGeneratorSigner />
      </div>
      <div className="mt-8">
        <JwtGeneratorSignerSEO />
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
