import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PunycodeEncoderDecoder from "@/components/encoding-tools/punycode-encoder-decoder";
import PunycodeEncoderDecoderSeo from "@/components/seo-content/encoding-tools/punycode-encoder-decoder";

export const metadata: Metadata = {
  title: `Punycode Converter - Encode & Decode IDN Domains`,
  description: `Convert Internationalized Domain Names (IDN) to/from Punycode. Encode Unicode domains for DNS or decode for readability. Free online tool.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/punycode-encoder-decoder`,
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

export default function PunycodeEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Punycode Converter - IDN Encoder & Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode Unicode domain names to Punycode for DNS registration or decode
          Punycode back to readable Internationalized Domain Names. Essential
          for working with non-ASCII top-level domains.
        </p>
      </header>
      <div className="mt-8">
        <PunycodeEncoderDecoder />
      </div>
      <div className="mt-8">
        <PunycodeEncoderDecoderSeo />
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
