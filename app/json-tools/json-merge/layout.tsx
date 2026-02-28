import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Merge Tool – Combine JSON Objects Online",
  description: "Merge multiple JSON objects using configurable merge strategies. Our free JSON Merge Tool handles deep merges, overwrites, and conflict resolution for complex data structures.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-merge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
