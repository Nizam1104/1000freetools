import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Flatten Tool – Flatten Nested JSON Online",
  description: "Flatten deeply nested JSON into simple dot-notation key-value pairs. Our free JSON Flatten Tool makes complex data easier to process, store, and analyze in flat systems.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-flatten",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
