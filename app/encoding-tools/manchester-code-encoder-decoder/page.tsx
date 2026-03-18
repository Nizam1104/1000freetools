import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { ManchesterCodeEncoderDecoder } from "@/components/encoding-tools/manchester-code-encoder-decoder";
import ManchesterCodeEncoderDecoderSeo from "@/components/seo-content/encoding-tools/manchester-code-encoder-decoder";

export const metadata: Metadata = {
  title: `Manchester Code Encoder Decoder | Signal Encoding Tool`,
  description: `Encode binary to Manchester code or decode Manchester-encoded signals instantly. Visualize waveforms and support IEEE 802.3. Free online tool for digital communications.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/manchester-code-encoder-decoder`,
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

export default function ManchesterCodeEncoderDecoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Manchester Code Encoder and Decoder
        </h1>
        <p className="text-muted-foreground">
          Encode binary data to Manchester code for clock synchronization in
          data transmission, or decode Manchester-encoded signals back to
          binary. This tool includes waveform visualization and supports common
          conventions.
        </p>
      </header>
      {<ManchesterCodeEncoderDecoder />}
      <ManchesterCodeEncoderDecoderSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
