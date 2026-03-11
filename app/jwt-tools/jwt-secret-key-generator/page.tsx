import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JwtSecretKeyGenerator from "@/components/jwt-tools/jwt-secret-key-generator";
import JwtSecretKeyGeneratorSEO from "@/components/seo-content/jwt-tools/jwt-secret-key-generator";

export const metadata: Metadata = {
  title: `Free JWT Key Generator | Create Secrets & Key Pairs`,
  description: `Generate secure JWT signing secrets and key pairs online. Create HS256 secrets, RSA/ECDSA keys in PEM format for token security.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-secret-key-generator`,
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

export default function JwtSecretKeyGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Generate JWT Secrets & Key Pairs
        </h1>
        <p className="text-muted-foreground">
          Create secure secrets and cryptographic key pairs for signing JWTs.
          Generate HS256 secrets, RSA, or ECDSA keys in PEM format instantly for
          use in your authentication setup.
        </p>
      </header>
      <div className="mt-8">
        <JwtSecretKeyGenerator />
      </div>
      <div className="mt-8">
        <JwtSecretKeyGeneratorSEO />
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
