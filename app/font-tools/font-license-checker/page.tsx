import type { Metadata } from "next";
import FontLicenseCheckerSeo from "@/components/seo-content/font-tools/font-license-checker";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { FontLicenseChecker } from "@/components/font-tools/font-license-checker.tsx";

export const metadata: Metadata = {
  title: `Font License Checker | Usage Rights Verifier`,
  description: `Check font licensing and usage permissions. Commercial vs free font identifier. Web embedding rights checker. Avoid legal issues.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-license-checker`,
  },
};

const tools = [
  {
    name: `Font Generator`,
    description: `Free Font Generator`,
    href: `/font-tools/font-generator`,
  },
  {
    name: `Font Identifier`,
    description: `What Font Is This?`,
    href: `/font-tools/font-identifier`,
  },
  {
    name: `Font Converter`,
    description: `Font File Converter`,
    href: `/font-tools/font-converter`,
  },
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Generator`,
    href: `/font-tools/font-pairing`,
  },
  {
    name: `Font Size Calculator`,
    description: ``,
    href: `/font-tools/font-size-calculator`,
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

export default function FontLicenseCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Font License Information Checker</h1>
        <p className="text-muted-foreground">Check if you can legally use a font for your project. Understand commercial, personal, and web embedding licenses.</p>
      </header>
      {<FontLicenseChecker />}
      <div className="mt-16">
        <FontLicenseCheckerSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
