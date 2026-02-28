import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML to JSON Converter – Free Online Tool",
  description: "Parse and convert XML into clean, structured JSON while preserving full hierarchy. Our free XML to JSON Converter handles nested elements, attributes, and complex XML documents.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/xml-to-json",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
