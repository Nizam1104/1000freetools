import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextBinaryEncryptor from "@/components/encryption-tools/text-binary-encryptor";
import TextBinaryEncryptorSeo from "@/components/seo-content/encryption-tools/text-binary-encryptor";

export const metadata: Metadata = {
  title: `Text to Binary Converter | Encrypt Binary Online`,
  description: `Convert text to binary and encrypt it with XOR online. Free tool for learning binary encoding and basic cryptography. No installation needed.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/text-binary-encryptor`,
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
    name: `File Checksum & Hash Verifier (MD5, SHA)`,
    description: `File Checksum Calculator & Verifier`,
    href: `/encryption-tools/file-checksum-verifier`,
  },
  {
    name: `PGP Key Generator & Message Encryptor`,
    description: `Free PGP Encryption Tool Online`,
    href: `/encryption-tools/pgp-encryption`,
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

export default function TextBinaryEncryptorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text to Binary Converter with Encryption
        </h1>
        <p className="text-muted-foreground">
          Convert any text to binary code and add a layer of simple XOR
          encryption with a secret key. This tool is great for learning about
          binary representation and basic cipher techniques. Everything runs
          locally.
        </p>
      </header>
      <div className="mt-8">
        <TextBinaryEncryptor />
      </div>
      <div className="mt-8">
        <TextBinaryEncryptorSeo />
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
