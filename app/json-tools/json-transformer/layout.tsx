import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Transformer – Reshape JSON Structures Online",
  description: "Transform JSON structure using user-defined rules and key mappings. Our free JSON Transformer is perfect for reshaping API responses to match your application's data model.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-transformer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
