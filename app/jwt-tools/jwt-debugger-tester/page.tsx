import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `JWT Debugger Online | Test & Fix Token Validation`,
  description: `Debug and test JSON Web Tokens online. Simulate validation, check for errors, and get code snippets to fix JWT issues in your app.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-debugger-tester`,
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

export default function JwtDebuggerTesterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Debug & Test JWT Tokens Step-by-Step</h1>
        <p className="text-muted-foreground">Debug JWT validation issues and test tokens against custom rules. Our tool simulates verification, highlights errors, and provides code snippets to help you fix authentication problems in your application.</p>
      </header>
      {/* TODO: add tool component for jwt-debugger-tester */}
      {/* TODO: add seo component for jwt-debugger-tester */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
