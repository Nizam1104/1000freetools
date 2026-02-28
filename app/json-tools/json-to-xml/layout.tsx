import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to XML Converter – Transform JSON Online",
  description: "Convert JSON to XML with configurable root element and attribute handling. Our free JSON to XML Converter produces valid, well-structured XML from any JSON input.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-xml",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
