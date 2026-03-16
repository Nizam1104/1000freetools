import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import BinaryClockTimeConverter from "@/components/binary-tools/binary-clock-time-converter";
import BinaryClockTimeConverterSeo from "@/components/seo-content/binary-tools/binary-clock-time-converter";

export const metadata: Metadata = {
  title: `Binary Clock | Live Online Binary Time Converter`,
  description: `Live binary clock and time converter. See current time in binary bits or convert any HH:MM:SS to binary. Fun and educational tool for time representation.`,
  alternates: {
    canonical: `https://1000freetools.com/binary-tools/binary-clock-time-converter`,
  },
};

const tools = [
  {
    name: `Binary Bit Flipper & Manipulator`,
    description: `Binary Bit Flipper & Manipulator`,
    href: `/binary-tools/binary-bit-flipper-manipulator`,
  },
  {
    name: `Binary to Hexadecimal Converter`,
    description: `Binary to Hexadecimal Converter`,
    href: `/binary-tools/binary-to-hexadecimal-converter`,
  },
  {
    name: `Decimal to Binary Converter`,
    description: `Decimal to Binary Converter`,
    href: `/binary-tools/decimal-to-binary-converter`,
  },
  {
    name: `Binary Gray Code Converter`,
    description: `Binary Gray Code Converter`,
    href: `/binary-tools/binary-gray-code-converter`,
  },
  {
    name: `Binary to Octal Converter`,
    description: `Binary to Octal Converter`,
    href: `/binary-tools/binary-to-octal-converter`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `HTML Minifier`,
    description: `Free HTML Minifier & Compressor`,
    href: `/minifier-tools/html-minifier`,
  },
  {
    name: `Unix Timestamp Converter`,
    description: `Unix Timestamp Converter`,
    href: `/timestamp-tools/unix-timestamp-converter`,
  },
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
];

export default function BinaryClockTimeConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Binary Clock & Time Converter
        </h1>
        <p className="text-muted-foreground">
          See the current time in binary or convert any time to binary format.
          This live binary clock displays hours, minutes, and seconds as bits. A
          fun tool for learning and novelty.
        </p>
      </header>
      <div className="mt-8">
        <BinaryClockTimeConverter />
      </div>
      <div className="mt-8">
        <BinaryClockTimeConverterSeo />
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
