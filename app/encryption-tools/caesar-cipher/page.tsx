import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CaesarCipher from "@/components/encryption-tools/caesar-cipher";
import CaesarCipherSeo from "@/components/seo-content/encryption-tools/caesar-cipher";

export const metadata: Metadata = {
  title: `Caesar Cipher Encoder/Decoder | Crack Cipher Online`,
  description: `Encrypt text with Caesar cipher or decrypt it using brute force. Free online tool for learning classical cryptography. No sign-up required.`,
  alternates: {
    canonical: `https://1000freetools.com/encryption-tools/caesar-cipher`,
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

export default function CaesarCipherPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Caesar Cipher Tool with Brute Force Attack
        </h1>
        <p className="text-muted-foreground">
          Encode messages with the historic Caesar cipher or crack an encoded
          message using brute force. This educational tool demonstrates basic
          substitution ciphers and how they can be broken.
        </p>
      </header>
      <div className="mt-8">
        <CaesarCipher />
      </div>
      <div className="mt-8">
        <CaesarCipherSeo />
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
