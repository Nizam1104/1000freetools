import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Hash Generator | Create MD5, SHA256 Hashes Online`,
  description: `Generate cryptographic hashes from text instantly. Supports MD5, SHA-1, SHA-256, SHA-512, bcrypt. Free tool for developers.`,
  alternates: {
    canonical: `https://1000freetools.com/password-tools/password-hash-generator`,
  },
};

const tools = [
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
  },
  {
    name: `Password Strength Checker`,
    description: `Check Your Password Strength`,
    href: `/password-tools/password-strength-checker`,
  },
  {
    name: `Password Manager`,
    description: `Free Browser Password Manager`,
    href: `/password-tools/password-manager`,
  },
  {
    name: `Password Leak Checker`,
    description: `Check if Your Password Was Leaked`,
    href: `/password-tools/password-leak-checker`,
  },
  {
    name: `Password Pattern Generator`,
    description: `Memorable Password Pattern Generator`,
    href: `/password-tools/password-pattern-generator`,
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

export default function PasswordHashGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Password Hash Generator & Converter</h1>
        <p className="text-muted-foreground">Convert any text or password into a cryptographic hash. Supports MD5, SHA-256, bcrypt, and more for development and security purposes.</p>
      </header>
      {/* TODO: add tool component for password-hash-generator */}
      {/* TODO: add seo component for password-hash-generator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
