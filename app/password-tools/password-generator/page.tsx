import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PasswordGenerator from "@/components/password-tools/password-generator";
import PasswordGeneratorSeo from "@/components/seo-content/password-tools/password-generator";

export const metadata: Metadata = {
  title: `Free Password Generator | Create Strong Passwords Online`,
  description: `Generate strong, random passwords instantly. Customize length, letters, numbers & symbols. Free, secure, and no data stored.`,
  alternates: {
    canonical: `https://1000freetools.com/password-tools/password-generator`,
  },
};

const tools = [
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
    name: `Password Hash Generator`,
    description: `Password Hash Generator & Converter`,
    href: `/password-tools/password-hash-generator`,
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

export default function PasswordGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free Strong Password Generator
        </h1>
        <p className="text-muted-foreground">
          Create secure, random passwords in seconds. Our password generator
          lets you customize length and character types to build strong, unique
          passwords for any account.
        </p>
      </header>
      <div className="mt-8">
        <PasswordGenerator />
      </div>
      <div className="mt-8">
        <PasswordGeneratorSeo />
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
