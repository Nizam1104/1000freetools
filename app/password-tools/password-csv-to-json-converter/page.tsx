import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import PasswordCsvToJsonConverter from "@/components/password-tools/password-csv-to-json-converter";
import PasswordCsvToJsonConverterSeo from "@/components/seo-content/password-tools/password-csv-to-json-converter";

export const metadata: Metadata = {
  title: `Password CSV/JSON Converter | Migrate Password Data`,
  description: `Convert password lists between CSV and JSON formats. Map fields, handle encryption. Free migration tool for password data.`,
  alternates: {
    canonical: `https://1000freetools.com/password-tools/password-csv-to-json-converter`,
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

export default function PasswordCsvToJsonConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Password Data Converter (CSV to JSON)
        </h1>
        <p className="text-muted-foreground">
          Convert your password lists between CSV and JSON formats easily.
          Perfect for switching password managers or handling data for
          development.
        </p>
      </header>
      <div className="mt-8">
        <PasswordCsvToJsonConverter />
      </div>
      <div className="mt-8">
        <PasswordCsvToJsonConverterSeo />
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
