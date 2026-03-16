import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UrlQrCodeGenerator from "@/components/url-tools/url-qr-code-generator";
import UrlQrCodeGeneratorSeo from "@/components/seo-content/url-tools/url-qr-code-generator";

export const metadata: Metadata = {
  title: `Free QR Code Generator for URLs | Create QR Codes Online`,
  description: `Generate free QR codes for any URL. Customize colors and download high-quality images instantly. Perfect for marketing and print materials.`,
  alternates: {
    canonical: `https://1000freetools.com/url-tools/url-qr-code-generator`,
  },
};

const tools = [
  {
    name: `URL Encoder`,
    description: `URL Encoder: Encode Special Characters for Web URLs`,
    href: `/url-tools/url-encoder`,
  },
  {
    name: `URL Decoder`,
    description: `URL Decoder: Decode Percent-Encoded URLs`,
    href: `/url-tools/url-decoder`,
  },
  {
    name: `URL Parser`,
    description: `URL Parser: Analyze and Break Down Any Web Address`,
    href: `/url-tools/url-parser`,
  },
  {
    name: `URL Shortener`,
    description: `URL Shortener: Create Short, Clean Links Instantly`,
    href: `/url-tools/url-shortener`,
  },
  {
    name: `URL Expander`,
    description: `URL Expander: See Where Short Links Really Go`,
    href: `/url-tools/url-expander`,
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

export default function UrlQrCodeGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          QR Code Generator: Create a QR Code for Any URL
        </h1>
        <p className="text-muted-foreground">
          Turn any web address into a QR code with our free generator. Create
          scannable codes for your website, landing page, or social profile.
          Customize colors and download the image instantly.
        </p>
      </header>
      <div className="mt-8">
        <UrlQrCodeGenerator />
      </div>
      <div className="mt-8">
        <UrlQrCodeGeneratorSeo />
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
