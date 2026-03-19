import type { Metadata } from "next";
import JwtAlgorithmConverterSwitcherSeo from "@/components/seo-content/jwt-tools/jwt-algorithm-converter-switcher";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JwtAlgorithmConverterSwitcher from "@/components/jwt-tools/jwt-algorithm-converter-switcher";

export const metadata: Metadata = {
  title: `JWT Algorithm Converter | Switch Token Signing Method`,
  description: `Convert JWT signing algorithm online. Switch from HS256 to RS256 or other algorithms by re-signing the token with a new key.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-algorithm-converter-switcher`,
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

export default function JwtAlgorithmConverterSwitcherPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Convert JWT Signing Algorithm</h1>
        <p className="text-muted-foreground">Switch your JWT's signing algorithm seamlessly. Convert tokens from HS256 to RS256, or between other algorithms, by re-signing with a new key—ideal for auth system migration.</p>
      </header>
      {<JwtAlgorithmConverterSwitcher />}
      <div className="mt-16">
        <JwtAlgorithmConverterSwitcherSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
