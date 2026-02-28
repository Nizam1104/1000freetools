import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Linter – Detect JSON Errors Online",
  description: "Lint your JSON to catch syntax errors, duplicate keys, trailing commas, and structural issues. Our free JSON Linter helps you write clean and standards-compliant JSON.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-linter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
