import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HexToBase64EncoderDecoder from "@/components/hex-tools/hex-to-base64-encoder-decoder";
import HexToBase64EncoderDecoderSeo from "@/components/seo-content/hex-tools/hex-to-base64-encoder-decoder";

export const metadata: Metadata = {
  title: `Hex to Base64 Converter | Encode/Decode Online`,
  description: `Encode hex to Base64 and decode Base64 to hex. URL-safe support. Free tool for web development and data encoding.`,
  alternates: {
    canonical: `https://1000freetools.com/hex-tools/hex-to-base64-encoder-decoder`,
  },
};

const tools = [
  {
    name: `Hex to Text Converter`,
    description: `Free Hex to Text Converter Online`,
    href: `/hex-tools/hex-to-text-converter`,
  },
  {
    name: `Text to Hex Converter`,
    description: `Text to Hex Converter Online`,
    href: `/hex-tools/text-to-hex-converter`,
  },
  {
    name: `Hex to Decimal Converter`,
    description: `Hex to Decimal Converter Tool`,
    href: `/hex-tools/hex-to-decimal-converter`,
  },
  {
    name: `Decimal to Hex Converter`,
    description: `Decimal to Hex Converter Online`,
    href: `/hex-tools/decimal-to-hex-converter`,
  },
  {
    name: `Hex to Binary Converter`,
    description: `Hex to Binary Converter Online`,
    href: `/hex-tools/hex-to-binary-converter`,
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

export default function HexToBase64EncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Hex to Base64 Encoder and Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode hex data to Base64 for web transmission, or decode Base64 back
          to hex. Supports URL-safe encoding. A versatile tool for web
          developers and data serialization tasks.
        </p>
      </header>
      <div className="mt-8">
        <HexToBase64EncoderDecoder />
      </div>
      <div className="mt-8">
        <HexToBase64EncoderDecoderSeo />
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
