import type { Metadata } from "next";
import JwtTokenStorageViewerSeo from "@/components/seo-content/jwt-tools/jwt-token-storage-viewer";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { JwtTokenStorageViewer } from "@/components/jwt-tools/jwt-token-storage-viewer";

export const metadata: Metadata = {
  title: `Browser JWT Storage Viewer | Inspect Local Tokens`,
  description: `View and decode JWT tokens stored in browser localStorage/sessionStorage. Inspect tokens locally for frontend authentication debugging.`,
  alternates: {
    canonical: `https://1000freetools.com/jwt-tools/jwt-token-storage-viewer`,
  },
};

const tools = [
  {
    name: `JWT Decoder & Validator`,
    description: `Decode & Validate JWT Tokens Instantly`,
    href: `/jwt-tools/jwt-decoder-validator`,
  },
  {
    name: `JWT Generator & Signer`,
    description: `Generate & Sign Custom JWT Tokens`,
    href: `/jwt-tools/jwt-generator-signer`,
  },
  {
    name: `JWT Debugger & Tester`,
    description: `Debug & Test JWT Tokens Step-by-Step`,
    href: `/jwt-tools/jwt-debugger-tester`,
  },
  {
    name: `JWT Secret & Key Generator`,
    description: `Generate JWT Secrets & Key Pairs`,
    href: `/jwt-tools/jwt-secret-key-generator`,
  },
  {
    name: `JWT Claim Extractor & Formatter`,
    description: `Extract & Format JWT Claims`,
    href: `/jwt-tools/jwt-claim-extractor-formatter`,
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

export default function JwtTokenStorageViewerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">View JWT Tokens Stored in Your Browser</h1>
        <p className="text-muted-foreground">Safely inspect JWT tokens stored in your browser's localStorage or sessionStorage. Decode and validate tokens locally without sending them to any server—perfect for frontend debugging.</p>
      </header>
      {<JwtTokenStorageViewer />}
      <div className="mt-16">
        <JwtTokenStorageViewerSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
