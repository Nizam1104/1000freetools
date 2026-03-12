import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Hash Brute-Force Time Estimator – How Long to Crack a Password Hash?",
  description: "Understand the real-world risk of hash cracking with our Brute-Force Time Estimator.            Enter the hash algorithm, password length, and character set to estimate how long            it would take to crack the hash by brute force.",
  alternates: {
    canonical: "https://1000freetools.com/calculators/hash-brute-force-time-estimator",
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
    "name": "Password Strength Scorer",
    "description": "Password Strength Checker – Test How Strong & Secure Your Password Is",
    "href": "/calculators/password-strength-scorer"
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
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculators/hash-brute-force-time-estimator">Hash Brute Force Time Estimator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
