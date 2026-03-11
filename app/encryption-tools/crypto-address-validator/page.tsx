import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CryptoAddressValidator from "@/components/encryption-tools/crypto-address-validator";
import CryptoAddressValidatorSeo from "@/components/seo-content/encryption-tools/crypto-address-validator";

export const metadata: Metadata = {
  title: `Free Crypto Address Validator | Bitcoin & Ethereum`,
  description: `Validate Bitcoin, Ethereum, and Litecoin addresses online for free. Check address checksums and formats instantly to prevent sending errors.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/crypto-address-validator`,
  },
};

const tools = [
  {
    name: `AES Encryption Tool`,
    description: `Free AES Encryption & Decryption Online`,
    href: `/encryption-tools/aes-encryption`,
  },
  {
    name: `RSA Key Generator & Encryption`,
    description: `RSA Key Generator & Encryption Tool`,
    href: `/encryption-tools/rsa-key-generator`,
  },
  {
    name: `Base64 Encode & Decode`,
    description: `Base64 Encoder & Decoder Online`,
    href: `/encryption-tools/base64-encode-decode`,
  },
  {
    name: `Text to Binary Converter & Encryptor`,
    description: `Text to Binary Converter with Encryption`,
    href: `/encryption-tools/text-binary-encryptor`,
  },
  {
    name: `File Checksum & Hash Verifier (MD5, SHA)`,
    description: `File Checksum Calculator & Verifier`,
    href: `/encryption-tools/file-checksum-verifier`,
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

export default function CryptoAddressValidatorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Cryptocurrency Address Validator & Checker
        </h1>
        <p className="text-muted-foreground">
          Verify the validity of Bitcoin, Ethereum, and other crypto addresses
          before sending funds. This tool checks the checksum and format to help
          avoid costly mistakes. It works entirely offline.
        </p>
      </header>
      <div className="mt-8">
        <CryptoAddressValidator />
      </div>
      <div className="mt-8">
        <CryptoAddressValidatorSeo />
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
