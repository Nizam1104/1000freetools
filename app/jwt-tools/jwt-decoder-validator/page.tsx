import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JwtDecoderValidator from "@/components/jwt-tools/jwt-decoder-validator";
import JwtDecoderValidatorSEO from "@/components/seo-content/jwt-tools/jwt-decoder-validator";

export const metadata: Metadata = {
  title: `Free JWT Decoder & Validator | Check Token Signature`,
  description: `Decode and validate JSON Web Tokens online. Verify JWT signatures, check expiration, inspect claims, and ensure token security with our free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-decoder-validator`,
  },
};

const tools = [
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

export default function JwtDecoderValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Decode & Validate JWT Tokens Instantly
        </h1>
        <p className="text-muted-foreground">
          Paste any JWT to decode its contents and verify its signature. Our
          free tool instantly shows the header, payload, and validation status,
          checking for expiration, issuer, and algorithm security. Ensure your
          tokens are valid and secure before using them in your applications.
        </p>
      </header>
      <div className="mt-8">
        <JwtDecoderValidator />
      </div>
      <div className="mt-8">
        <JwtDecoderValidatorSEO />
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
