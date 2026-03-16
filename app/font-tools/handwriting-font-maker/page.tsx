import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HandwritingFontMaker from "@/components/font-tools/handwriting-font-maker";
import HandwritingFontMakerSeo from "@/components/seo-content/font-tools/handwriting-font-maker";

export const metadata: Metadata = {
  title: `Handwriting Font Maker | Create Custom Font`,
  description: `Turn your handwriting into a TrueType font. Free online tool. Draw letters or upload writing sample. Download your personal font.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/handwriting-font-maker`,
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

export default function HandwritingFontMakerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Create a Font from Your Handwriting
        </h1>
        <p className="text-muted-foreground">
          Turn your handwriting into a usable font file. Perfect for personal
          projects, signatures, or unique branding.
        </p>
      </header>
      <div className="mt-8">
        <HandwritingFontMaker />
      </div>
      <div className="mt-8">
        <HandwritingFontMakerSeo />
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
