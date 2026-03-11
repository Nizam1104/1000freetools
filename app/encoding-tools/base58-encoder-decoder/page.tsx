import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Base58EncoderDecoder from "@/components/encoding-tools/base58-encoder-decoder";
import Base58EncoderDecoderSEO from "@/components/seo-content/encoding-tools/base58-encoder-decoder";

export const metadata: Metadata = {
  title: `Base58 Encoder Decoder | Bitcoin Address Encoding Tool`,
  description: `Encode to Base58 or decode Base58 strings. Supports Bitcoin and Flickr alphabets. Includes checksum validation for cryptocurrency addresses.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/base58-encoder-decoder`,
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

export default function Base58EncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Base58 Encoder and Decoder</h1>
        <p className="text-muted-foreground">
          Encode data to Base58 format, commonly used in cryptocurrencies like
          Bitcoin, or decode Base58 strings back to original data. This tool
          includes checksum validation for address verification.
        </p>
      </header>
      <div className="mt-8">
        <Base58EncoderDecoder />
      </div>
      <div className="mt-8">
        <Base58EncoderDecoderSEO />
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
