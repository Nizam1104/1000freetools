import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontGenerator from "@/components/font-tools/font-generator";
import FontGeneratorSeo from "@/components/seo-content/font-tools/font-generator";

export const metadata: Metadata = {
  title: `Font Generator | Create Cool Text Styles Online`,
  description: `Generate stylish fonts for Instagram, TikTok, and more. Free online tool with hundreds of fancy text styles. Copy and paste instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-generator`,
  },
};

const tools = [
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
    name: `Font Subsetter`,
    description: `Web Font Subsetter`,
    href: `/font-tools/font-subsetter`,
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

export default function FontGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Free Font Generator</h1>
        <p className="text-muted-foreground">
          Create unique text styles in seconds with our free font generator.
          Perfect for social media, gaming usernames, and creative projects. No
          download or registration required.
        </p>
      </header>
      <div className="mt-8">
        <FontGenerator />
      </div>
      <div className="mt-8">
        <FontGeneratorSeo />
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
