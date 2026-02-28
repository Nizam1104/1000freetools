import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YAML to JSON Converter – Free Online Tool",
  description: "Parse YAML and convert it into valid JSON instantly. Our free YAML to JSON Converter supports multi-line strings, anchors, and complex YAML structures for seamless transformation.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/yaml-to-json",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
