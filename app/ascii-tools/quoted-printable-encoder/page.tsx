import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import QuotedPrintableEncoder from "@/components/ascii-tools/quoted-printable-encoder";
import QuotedPrintableEncoderSeo from "@/components/seo-content/ascii-tools/quoted-printable-encoder";

export const metadata: Metadata = {
  title: `Quoted-Printable Encoder: MIME Email Encoder Online`,
  description: `Free quoted-printable encoder for email. Encode text to RFC 2045 quoted-printable format and decode back. Perfect for MIME email and 7-bit transport encoding.`,
  alternates: {
    canonical: `https://1000freetools.com/ascii-tools/quoted-printable-encoder`,
  },
};

const tools = [
  {
    name: `ASCII85 Encoder`,
    description: `ASCII85 Encoder: Base85 Binary to Text Converter`,
    href: `/ascii-tools/ascii85-encoder`,
  },
  {
    name: `EBCDIC to ASCII Converter`,
    description: `EBCDIC to ASCII Converter: Mainframe Code Converter`,
    href: `/ascii-tools/ebcdic-to-ascii-converter`,
  },
  {
    name: `UTF-8 Validator`,
    description: `UTF-8 Validator: Check and Validate UTF-8 Encoding`,
    href: `/ascii-tools/utf8-validator`,
  },
  {
    name: `Text Differ`,
    description: `Text Differ: Compare Text and Find Differences`,
    href: `/ascii-tools/text-differ`,
  },
  {
    name: `Leet Speak Converter`,
    description: `Leet Speak Converter: Convert Text to 1337 Online`,
    href: `/ascii-tools/leet-speak-converter`,
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
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
];

export default function QuotedPrintableEncoderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Quoted-Printable Encoder: MIME Email Encoder
        </h1>
        <p className="text-muted-foreground">
          Encode text to quoted-printable format for safe email transmission.
          Essential for MIME email parts, headers with non-ASCII characters, and
          7-bit transport. Decode quoted-printable back to readable text.
        </p>
      </header>
      <div className="mt-8">
        <QuotedPrintableEncoder />
      </div>
      <div className="mt-8">
        <QuotedPrintableEncoderSeo />
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
