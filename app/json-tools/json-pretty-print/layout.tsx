import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Pretty Print – Readable JSON Formatter",
  description: "Pretty print JSON with customizable indentation for maximum readability. Convert compact, hard-to-read JSON into clean, human-friendly formatted output instantly.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-pretty-print",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
