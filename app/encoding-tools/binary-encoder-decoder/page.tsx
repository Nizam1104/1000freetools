import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryEncoderDecoder from "@/components/encoding-tools/binary-encoder-decoder";
import BinaryEncoderDecoderSEO from "@/components/seo-content/encoding-tools/binary-encoder-decoder";

export const metadata: Metadata = {
  title: `Binary Encoder Decoder | Text to Binary Converter`,
  description: `Convert text to binary code and decode binary to text instantly. Supports ASCII and UTF-8 encoding. Simple and free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/binary-encoder-decoder`,
  },
};

const tools = [
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

export default function BinaryEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Binary Encoder and Decoder</h1>
        <p className="text-muted-foreground">
          Encode any text to binary code or decode binary strings back to
          human-readable text. This tool is useful for learning, low-level
          programming, and data representation tasks.
        </p>
      </header>
      <div className="mt-8">
        <BinaryEncoderDecoder />
      </div>
      <div className="mt-8">
        <BinaryEncoderDecoderSEO />
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
