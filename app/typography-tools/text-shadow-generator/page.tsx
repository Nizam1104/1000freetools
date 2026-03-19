import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { TextShadowGenerator } from "@/components/text-tools/text-shadow-generator";
import TextShadowGeneratorSeo from "@/components/seo-content/typography-tools/text-shadow-generator";

export const metadata: Metadata = {
  title: `Text Shadow Generator | Create CSS Text Shadows`,
  description: `Design and generate CSS text-shadow effects online. Adjust blur, offset, and color with a live preview. Free for web developers.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/text-shadow-generator`,
  },
};

const tools = [
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Tool for Designers`,
    href: `/typography-tools/font-pairing-tool`,
  },
  {
    name: `Letter Spacing Tool`,
    description: `Letter Spacing & Kerning Tool`,
    href: `/typography-tools/letter-spacing-tool`,
  },
  {
    name: `Line Height Generator`,
    description: `Line Height Calculator`,
    href: `/typography-tools/line-height-generator`,
  },
  {
    name: `Font Size Converter`,
    description: `Font Size Unit Converter`,
    href: `/typography-tools/font-size-converter`,
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

export default function TextShadowGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">CSS Text Shadow Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful text shadow effects for your website headlines.
          Adjust settings in real-time and copy the CSS code with one click.
        </p>
      </header>
      {<TextShadowGenerator />}
      <div className="mt-8"><TextShadowGeneratorSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
