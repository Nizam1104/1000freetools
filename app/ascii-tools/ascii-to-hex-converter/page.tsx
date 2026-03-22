import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import AsciiToHexConverter from "@/components/ascii-tools/ascii-to-hex-converter";
import AsciiToHexConverterSeo from "@/components/seo-content/ascii-tools/ascii-to-hex-converter";

export const metadata: Metadata = {
  title: `ASCII to Hex Converter | Text to Hexadecimal Translator Online`,
  description: `Free ASCII to hex converter. Translate text to hexadecimal instantly. Perfect for debugging, memory analysis, and network programming. Supports hex prefixes and byte grouping.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/ascii-to-hex-converter`,
  },
};

const tools = [
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
  {
    name: `Markdown to HTML Converter`,
    description: `Free Markdown to HTML Converter`,
    href: `/markdown-tools/markdown-to-html-converter`,
  },
  {
    name: `URL Encoder`,
    description: `URL Encoder: Encode Special Characters for Web URLs`,
    href: `/url-tools/url-encoder`,
  },
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
  {
    name: `SVG to PNG Converter`,
    description: `Free SVG to PNG Converter`,
    href: `/svg-tools/svg-to-png-converter`,
  },
  {
    name: `AES Encryption Tool`,
    description: `Free AES Encryption & Decryption Online`,
    href: `/encryption-tools/aes-encryption`,
  },
];

export default function AsciiToHexConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ASCII to Hex Converter: Text to Hexadecimal Translator
        </h1>
        <p className="text-muted-foreground">
          Quickly convert ASCII characters to hexadecimal values. Essential for
          developers working with memory addresses, network protocols, or binary
          file analysis. Supports hex to text conversion and multiple output
          formats.
        </p>
      </header>
      <div className="mt-8">
        <AsciiToHexConverter />
      </div>
      <div className="mt-8">
        <AsciiToHexConverterSeo />
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
