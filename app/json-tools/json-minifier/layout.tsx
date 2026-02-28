import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Minifier – Compress JSON Online",
  description: "Minify JSON by removing whitespace and line breaks to reduce file size. Free online JSON Minifier that preserves validity while optimizing your data for production.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-minifier",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
