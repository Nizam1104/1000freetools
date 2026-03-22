import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AsciiArtGenerator from "@/components/ascii-tools/ascii-art-generator";
import AsciiArtGeneratorSeo from "@/components/seo-content/ascii-tools/ascii-art-generator";

export const metadata: Metadata = {
  title: `ASCII Art Generator: Convert Images to Text Art Online Free`,
  description: `Create ASCII art from images instantly. Upload JPG/PNG, adjust settings, and generate detailed text-based artwork. Perfect for retro designs, code comments, and social media.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii-art-generator`,
  },
};

const tools = [
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `ASCII to Decimal Converter`,
    description: `ASCII to Decimal Converter: Text to Decimal Numbers`,
    href: `/ascii-tools/ascii-to-decimal-converter`,
  },
  {
    name: `ASCII to Octal Converter`,
    description: `ASCII to Octal Converter: Text to Base-8 Translator`,
    href: `/ascii-tools/ascii-to-octal-converter`,
  },
  {
    name: `ASCII Code Table`,
    description: `ASCII Table: Complete ASCII Code Reference (0-127)`,
    href: `/ascii-tools/ascii-code-table`,
  },
  {
    name: `Lorem Ipsum Generator`,
    description: `Lorem Ipsum Generator: Placeholder Text for Designers`,
    href: `/ascii-tools/lorem-ipsum-generator`,
  },
  {
    name: `ASCII to Braille Converter`,
    description: `ASCII to Braille Converter: Text to Braille Translator`,
    href: `/ascii-tools/ascii-to-braille-converter`,
  },
];

export default function AsciiArtGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free ASCII Art Generator - Convert Images to Text Art
        </h1>
        <p className="text-muted-foreground">
          Transform any image into stunning ASCII art instantly. Our free online
          tool converts photos, logos, and graphics into text-based artwork
          using customizable character sets. Perfect for forums, README files,
          retro designs, and creative coding projects.
        </p>
      </header>
      <div className="mt-8">
        <AsciiArtGenerator />
      </div>
      <div className="mt-8">
        <AsciiArtGeneratorSeo />
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
