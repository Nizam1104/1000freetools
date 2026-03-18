import type { Metadata } from "next";
import JwtTokenDiffCompareSeo from "@/components/seo-content/jwt-tools/jwt-token-diff-compare";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { JwtTokenDiffCompare } from "@/components/jwt-tools/jwt-token-diff-compare.tsx";

export const metadata: Metadata = {
  title: `JWT Compare Tool | Diff Two Tokens Online`,
  description: `Compare two JWT tokens online. See differences in headers, payload claims, and signatures with a visual diff tool for debugging.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-token-diff-compare`,
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

export default function JwtTokenDiffComparePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Compare Two JWT Tokens Side-by-Side</h1>
        <p className="text-muted-foreground">Compare two JSON Web Tokens to spot differences in headers, payloads, or signatures. Perfect for debugging inconsistencies in token generation or verifying claim updates.</p>
      </header>
      {<JwtTokenDiffCompare />}
      <div className="mt-16">
        <JwtTokenDiffCompareSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
