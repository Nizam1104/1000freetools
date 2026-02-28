import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to TypeScript Interface Generator",
  description: "Generate TypeScript interfaces from JSON automatically, including optional fields and nested types. Save hours of manual typing with our free JSON to TypeScript converter.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-typescript",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
