import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Base32EncoderDecoder from "@/components/encoding-tools/base32-encoder-decoder";
import Base32EncoderDecoderSEO from "@/components/seo-content/encoding-tools/base32-encoder-decoder";

export const metadata: Metadata = {
  title: `Base32 Encoder Decoder | Free Online Converter`,
  description: `Encode data to Base32 or decode Base32 strings instantly. Supports RFC 4648 alphabet. Useful for encoding binary data in a readable format.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/base32-encoder-decoder`,
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

export default function Base32EncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Base32 Encoder and Decoder</h1>
        <p className="text-muted-foreground">
          Encode text or binary data to Base32 format for human-readable
          encoding, or decode Base32 strings to retrieve the original data.
          Commonly used in various protocols and applications.
        </p>
      </header>
      <div className="mt-8">
        <Base32EncoderDecoder />
      </div>
      <div className="mt-8">
        <Base32EncoderDecoderSEO />
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
