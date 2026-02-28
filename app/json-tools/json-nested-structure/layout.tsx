import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Nested Structure Generator Online",
  description: "Generate deeply nested JSON structures for stress testing parsers, UIs, and APIs. Our free tool lets you configure nesting depth and breadth to simulate complex real-world data.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-nested-structure",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
