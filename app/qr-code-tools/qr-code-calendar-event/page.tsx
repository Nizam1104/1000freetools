import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import QrCodeCalendarEvent from "@/components/qr-code-tools/qr-code-calendar-event";
import QrCodeCalendarEventSeo from "@/components/seo-content/qr-code-tools/qr-code-calendar-event";

export const metadata: Metadata = {
  title: `Calendar Event QR Code | Add to Calendar via QR`,
  description: `Generate a QR code for calendar events. Attendees scan to save event details to their calendar. Supports Google, Apple, and Outlook.`,
  alternates: {
    canonical: `https://1000freetools.com/qr-code-tools/qr-code-calendar-event`,
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

export default function QrCodeCalendarEventPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Calendar Event QR Code Maker
        </h1>
        <p className="text-muted-foreground">
          Create a QR code that adds an event to a calendar. Set title, time,
          and location. Attendees scan to save it to Google, Apple, or Outlook
          Calendar.
        </p>
      </header>
      <div className="mt-8">
        <QrCodeCalendarEvent />
      </div>
      <div className="mt-8">
        <QrCodeCalendarEventSeo />
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
