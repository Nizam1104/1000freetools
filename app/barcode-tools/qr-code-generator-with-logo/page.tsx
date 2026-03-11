import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import QRCodeGeneratorWithLogo from "@/components/barcode-tools/qr-code-generator-with-logo";
import QRCodeGeneratorWithLogoSEO from "@/components/seo-content/barcode-tools/qr-code-generator-with-logo";

export const metadata: Metadata = {
  title: `QR Code Maker with Logo - Custom Branded QR Codes`,
  description: `Create custom QR codes with your logo inside. Free online generator. Adjust colors, size, and error correction. Download PNG or SVG.`,
  alternates: {
    canonical: `https://1000freetools.com/barcode-tools/qr-code-generator-with-logo`,
  },
};

const tools = [
  {
    name: `Bulk Barcode Generator`,
    description: `Bulk Barcode Generator`,
    href: `/barcode-tools/bulk-barcode-generator`,
  },
  {
    name: `ISBN Barcode Generator`,
    description: `ISBN Barcode Generator`,
    href: `/barcode-tools/isbn-barcode-generator`,
  },
  {
    name: `Barcode Font Encoder`,
    description: `Barcode Font Encoder`,
    href: `/barcode-tools/barcode-font-encoder`,
  },
  {
    name: `Barcode Data Encoder/Decoder`,
    description: `Barcode Data Encoder & Decoder`,
    href: `/barcode-tools/barcode-data-encoder`,
  },
  {
    name: `Barcode Image to Base64 Encoder`,
    description: `Barcode Image to Base64 Converter`,
    href: `/barcode-tools/barcode-to-base64`,
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

export default function QrCodeGeneratorWithLogoPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">QR Code Generator with Logo</h1>
        <p className="text-muted-foreground">
          Design professional branded QR codes by adding your company logo.
          Customize colors and download high-quality images for marketing
          materials and business cards.
        </p>
      </header>
      <div className="mt-8">
        <QRCodeGeneratorWithLogo />
      </div>
      <div className="mt-8">
        <QRCodeGeneratorWithLogoSEO />
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
