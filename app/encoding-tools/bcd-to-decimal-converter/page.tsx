import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { BcdToDecimalConverter } from "@/components/encoding-tools/bcd-to-decimal-converter";
import BcdToDecimalConverterSeo from "@/components/seo-content/encoding-tools/bcd-to-decimal-converter";

export const metadata: Metadata = {
  title: `BCD Converter - Binary-Coded Decimal to Decimal`,
  description: `Convert BCD to decimal and decimal to BCD. Handle packed and unpacked Binary-Coded Decimal formats. Free online conversion tool.`,
  alternates: {
    canonical: `https://1000freetools.com/encoding-tools/bcd-to-decimal-converter`,
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

export default function BcdToDecimalConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">BCD to Decimal Converter</h1>
        <p className="text-muted-foreground">
          Convert Binary-Coded Decimal (BCD) values to standard decimal numbers,
          or encode decimal numbers into BCD format. Essential for working with
          financial data, hardware registers, and embedded systems.
        </p>
      </header>
      {<BcdToDecimalConverter />}
      <BcdToDecimalConverterSeo />
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
