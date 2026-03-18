import type { Metadata } from "next";
import QrCodeForCryptoPaymentSeo from "@/components/seo-content/qr-code-tools/qr-code-for-crypto-payment";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { QrCodeForCryptoPayment } from "@/components/qr-code-tools/qr-code-for-crypto-payment.tsx";

export const metadata: Metadata = {
  title: `Free Crypto Payment QR Code Generator | Bitcoin & Ethereum`,
  description: `Generate free QR codes for cryptocurrency payments. Create Bitcoin, Ethereum, and other crypto payment requests with wallet address and amount.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-for-crypto-payment`,
  },
};

const tools = [
  {
    name: `QR Code Generator`,
    description: `Free QR Code Generator`,
    href: `/qr-code-tools/qr-code-generator`,
  },
  {
    name: `QR Code Scanner / Reader`,
    description: `Online QR Code Scanner`,
    href: `/qr-code-tools/qr-code-scanner`,
  },
  {
    name: `QR Code to PDF Converter`,
    description: `Convert QR Codes to PDF`,
    href: `/qr-code-tools/qr-code-to-pdf`,
  },
  {
    name: `Dynamic QR Code Generator`,
    description: `Dynamic QR Code Creator`,
    href: `/qr-code-tools/dynamic-qr-code-generator`,
  },
  {
    name: `Bulk QR Code Generator`,
    description: `Bulk QR Code Generator`,
    href: `/qr-code-tools/bulk-qr-code-generator`,
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

export default function QrCodeForCryptoPaymentPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Create a Crypto Payment QR Code</h1>
        <p className="text-muted-foreground">Generate a QR code for Bitcoin, Ethereum, or other cryptocurrency payments. Just add your wallet address and amount to create a code any wallet app can scan to pay.</p>
      </header>
      {<QrCodeForCryptoPayment />}
      <div className="mt-16">
        <QrCodeForCryptoPaymentSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
