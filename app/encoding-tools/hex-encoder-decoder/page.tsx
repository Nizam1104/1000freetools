import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import HexEncoderDecoder from "@/components/encoding-tools/hex-encoder-decoder";
import HexEncoderDecoderSEO from "@/components/seo-content/encoding-tools/hex-encoder-decoder";

export const metadata: Metadata = {
  title: `Hex Encoder Decoder | Text to Hex Converter Online`,
  description: `Encode text to hexadecimal or decode hex strings to text. Supports multiple formats and is ideal for developers and security professionals.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/hex-encoder-decoder`,
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
    name: `Binary Encoder/Decoder`,
    description: `Binary Encoder and Decoder`,
    href: `/encoding-tools/binary-encoder-decoder`,
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

export default function HexEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Hexadecimal Encoder and Decoder
        </h1>
        <p className="text-muted-foreground">
          Convert text to hexadecimal (hex) codes or decode hex strings back to
          original text. This tool is handy for debugging, network analysis, and
          cryptographic applications.
        </p>
      </header>
      <div className="mt-8">
        <HexEncoderDecoder />
      </div>
      <div className="mt-8">
        <HexEncoderDecoderSEO />
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
