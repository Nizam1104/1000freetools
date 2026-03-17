import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Base64EncoderDecoder from "@/components/encoding-tools/base64-encoder-decoder";
import Base64EncoderDecoderSeo from "@/components/seo-content/encoding-tools/base64-encoder-decoder";

export const metadata: Metadata = {
  title: `Base64 Encoder Decoder | Free Online Tool`,
  description: `Encode text or files to Base64 and decode Base64 strings instantly. Supports file uploads and is perfect for developers. Fast and secure.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/base64-encoder-decoder`,
  },
};

const tools = [
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
    name: `ASCII Code Converter`,
    description: `ASCII Code Converter and Table`,
    href: `/encoding-tools/ascii-code-converter`,
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

export default function Base64EncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Base64 Encode and Decode Online
        </h1>
        <p className="text-muted-foreground">
          Encode any text or file to Base64 for safe data transmission, or
          decode Base64 strings to retrieve the original content. This tool is
          essential for web development, email attachments, and data storage.
        </p>
      </header>
      <div className="mt-8">
        <Base64EncoderDecoder />
      </div>
      <div className="mt-8">
        <Base64EncoderDecoderSeo />
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
