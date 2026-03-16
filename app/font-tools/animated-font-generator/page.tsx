import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AnimatedFontGenerator from "@/components/font-tools/animated-font-generator";
import AnimatedFontGeneratorSeo from "@/components/seo-content/font-tools/animated-font-generator";

export const metadata: Metadata = {
  title: `Animated Font Generator | Moving Text Maker`,
  description: `Create animated text with effects. Export as GIF or video. Free online tool for social media content and web design.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/animated-font-generator`,
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

export default function AnimatedFontGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Animated Text Creator</h1>
        <p className="text-muted-foreground">
          Make your text move, glow, or shimmer. Create eye-catching animated
          fonts for social media stories, banners, and websites.
        </p>
      </header>
      <div className="mt-8">
        <AnimatedFontGenerator />
      </div>
      <div className="mt-8">
        <AnimatedFontGeneratorSeo />
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
