import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Gray Code Converter | Binary to Gray Code Tool`,
  description: `Convert binary to Gray code and Gray code to binary instantly. Supports custom bit lengths. Free online tool for digital encoding.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/gray-code-encoder-decoder`,
  },
};

const tools = [
  {
    name: `URL Encoder/Decoder`,
    description: `URL Encoder and Decoder`,
    href: `/encoding-tools/url-encoder-decoder`,
  },
  {
    name: `Base64 Encoder/Decoder`,
    description: `Base64 Encode and Decode Online`,
    href: `/encoding-tools/base64-encoder-decoder`,
  },
  {
    name: `UTF-8 Encoder/Decoder`,
    description: `UTF-8 Encoder and Decoder`,
    href: `/encoding-tools/utf8-encoder-decoder`,
  },
  {
    name: `Binary Encoder/Decoder`,
    description: `Binary Encoder and Decoder`,
    href: `/encoding-tools/binary-encoder-decoder`,
  },
  {
    name: `Hex Encoder/Decoder`,
    description: `Hexadecimal Encoder and Decoder`,
    href: `/encoding-tools/hex-encoder-decoder`,
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

export default function GrayCodeEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Gray Code Encoder and Decoder</h1>
        <p className="text-muted-foreground">Convert binary numbers to Gray code, where adjacent values differ by only one bit, or convert Gray code back to binary. This encoding is used in rotary encoders and error correction.</p>
      </header>
      {/* TODO: add tool component for gray-code-encoder-decoder */}
      {/* TODO: add seo component for gray-code-encoder-decoder */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
