import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Validator – Validate JSON Online Free",
  description: "Validate JSON syntax instantly with our free online JSON Validator. Get precise error messages with line and column numbers to debug and fix malformed JSON fast.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-validator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
