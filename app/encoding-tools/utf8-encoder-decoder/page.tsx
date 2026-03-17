import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Utf8EncoderDecoder from "@/components/encoding-tools/utf8-encoder-decoder";
import Utf8EncoderDecoderSeo from "@/components/seo-content/encoding-tools/utf8-encoder-decoder";

export const metadata: Metadata = {
  title: `UTF-8 Encoder Decoder | Convert Text to UTF-8 Bytes`,
  description: `Encode text to UTF-8 byte sequences or decode UTF-8 bytes to text. Supports hex, binary, and decimal outputs. Essential for encoding validation.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/utf8-encoder-decoder`,
  },
};

const tools = [
  {
    name: `Base64 Encoder/Decoder`,
    description: `Base64 Encode and Decode Online`,
    href: `/encoding-tools/base64-encoder-decoder`,
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

export default function Utf8EncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">UTF-8 Encoder and Decoder</h1>
        <p className="text-muted-foreground">
          Convert text to UTF-8 byte sequences in hex, binary, or decimal
          formats, or decode UTF-8 bytes back to readable text. This tool
          ensures proper character encoding for internationalization and data
          processing.
        </p>
      </header>
      <div className="mt-8">
        <Utf8EncoderDecoder />
      </div>
      <div className="mt-8">
        <Utf8EncoderDecoderSeo />
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
