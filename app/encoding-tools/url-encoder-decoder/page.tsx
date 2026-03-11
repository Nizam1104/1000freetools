import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlEncoderDecoder from "@/components/encoding-tools/url-encoder-decoder";
import UrlEncoderDecoderSeo from "@/components/seo-content/encoding-tools/url-encoder-decoder";

export const metadata: Metadata = {
  title: `Free URL Encoder & Decoder Tool | Percent Encoding Online`,
  description: `Encode text to URL format or decode URL-encoded strings instantly. Supports UTF-8 and special characters. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/url-encoder-decoder`,
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

export default function UrlEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">URL Encoder and Decoder</h1>
        <p className="text-muted-foreground">
          Quickly encode text for safe use in URLs or decode URL-encoded
          strings. This tool handles all special characters, including spaces,
          ampersands, and Unicode, ensuring your web links and data transfers
          are error-free.
        </p>
      </header>
      <div className="mt-8">
        <UrlEncoderDecoder />
      </div>
      <div className="mt-8">
        <UrlEncoderDecoderSeo />
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
