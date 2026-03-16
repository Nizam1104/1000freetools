import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Rot13CipherEncoderDecoder from "@/components/encoding-tools/rot13-cipher-encoder-decoder";
import Rot13CipherEncoderDecoderSeo from "@/components/seo-content/encoding-tools/rot13-cipher-encoder-decoder";

export const metadata: Metadata = {
  title: `ROT13 Encoder Decoder | Free Caesar Cipher Tool`,
  description: `Encode and decode text with the ROT13 cipher instantly. Handles letters only, preserving case. Perfect for puzzles and simple obfuscation.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/rot13-cipher-encoder-decoder`,
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

export default function Rot13CipherEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          ROT13 Cipher Encoder and Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode or decode text using the ROT13 cipher, a simple letter
          substitution cipher. This tool is often used for obscuring spoilers,
          puzzles, or light obfuscation.
        </p>
      </header>
      <div className="mt-8">
        <Rot13CipherEncoderDecoder />
      </div>
      <div className="mt-8">
        <Rot13CipherEncoderDecoderSeo />
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
