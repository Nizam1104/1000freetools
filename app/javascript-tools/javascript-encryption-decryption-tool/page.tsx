import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `JavaScript Encryption Tool - Encrypt/Decrypt Text Online`,
  description: `Client-side JavaScript encryption and decryption tool. Simulate AES, RSA, and other algorithms. All processing happens locally in your browser.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-encryption-decryption-tool`,
  },
};

const tools = [
  {
    name: `JavaScript Minifier & Compressor`,
    description: `Minify and Compress JavaScript Code`,
    href: `/javascript-tools/javascript-minifier-compressor`,
  },
  {
    name: `JavaScript Beautifier & Formatter`,
    description: `Beautify and Format JavaScript Code`,
    href: `/javascript-tools/javascript-beautifier-formatter`,
  },
  {
    name: `JavaScript Obfuscator & Protector`,
    description: `Obfuscate JavaScript Code for Protection`,
    href: `/javascript-tools/javascript-obfuscator-protector`,
  },
  {
    name: `JSON Validator & Formatter`,
    description: `Validate and Format JSON Data`,
    href: `/javascript-tools/json-validator-formatter`,
  },
  {
    name: `JavaScript Regex Tester & Debugger`,
    description: `Test and Debug JavaScript Regular Expressions`,
    href: `/javascript-tools/javascript-regex-tester-debugger`,
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

export default function JavascriptEncryptionDecryptionToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Encrypt and Decrypt Text in JavaScript</h1>
        <p className="text-muted-foreground">Securely encrypt and decrypt text using JavaScript, all within your browser. Choose from simulated cryptographic algorithms for testing and learning.</p>
      </header>
      {/* TODO: add tool component for javascript-encryption-decryption-tool */}
      {/* TODO: add seo component for javascript-encryption-decryption-tool */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
