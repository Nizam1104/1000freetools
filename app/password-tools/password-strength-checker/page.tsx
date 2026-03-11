import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PasswordStrengthChecker from "@/components/password-tools/password-strength-checker";
import PasswordStrengthCheckerSeo from "@/components/seo-content/password-tools/password-strength-checker";

export const metadata: Metadata = {
  title: `Password Strength Tester | Check Security Online`,
  description: `Test your password's security instantly. Get a strength rating and tips to make it stronger. Private, no passwords are stored or sent.`,
  alternates: {
    canonical: `https://1000freetools.com/password-tools/password-strength-checker`,
  },
};

const tools = [
  {
    name: `Password Generator`,
    description: `Free Strong Password Generator`,
    href: `/password-tools/password-generator`,
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

export default function PasswordStrengthCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Check Your Password Strength
        </h1>
        <p className="text-muted-foreground">
          Test how secure your password really is. Our strength checker analyzes
          complexity and common vulnerabilities to give you actionable advice.
        </p>
      </header>
      <div className="mt-8">
        <PasswordStrengthChecker />
      </div>
      <div className="mt-8">
        <PasswordStrengthCheckerSeo />
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
