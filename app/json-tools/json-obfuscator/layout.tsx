import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Obfuscator – Obfuscate JSON Online",
  description: "Minify and obfuscate JSON keys and values for safer sharing and publishing. Our free JSON Obfuscator helps protect data structure and logic from casual inspection.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-obfuscator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
