import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Password Strength Checker – Test How Strong & Secure Your Password Is",
  description: "Check your password security instantly with our Password Strength Scorer. Evaluate entropy, length, character variety, and pattern vulnerabilities to see how strong your password is and get recommendations for creating uncrackable passwords.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/password-strength-scorer",
  },
};

const tools = [
  {
    "name": "Aes Key Size Estimator",
    "description": "AES Key Size Estimator – Understand Encryption Key Strength",
    "href": "/calculators/aes-key-size-estimator"
  },
  {
    "name": "Rsa Key Strength Calculator",
    "description": "RSA Key Strength Calculator – Check How Secure Your RSA Encryption Key Is",
    "href": "/calculators/rsa-key-strength-calculator"
  },
  {
    "name": "Hash Brute Force Time Estimator",
    "description": "Hash Brute-Force Time Estimator – How Long to Crack a Password Hash?",
    "href": "/calculators/hash-brute-force-time-estimator"
  },
  {
    "name": "Base Converter Calculator",
    "description": "Base Converter Calculator",
    "href": "/calculators/base-converter-calculator"
  },
  {
    "name": "Db Calculator",
    "description": "dB Calculator – Decibel to Ratio Converter for Audio and RF",
    "href": "/calculators/db-calculator"
  },
  {
    "name": "0 100 Acceleration Estimator",
    "description": "0-100 Acceleration Estimator – Calculate 0 to 100 km/h Time",
    "href": "/calculators/0-100-acceleration-estimator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
