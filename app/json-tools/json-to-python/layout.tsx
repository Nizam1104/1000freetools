import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Python Dictionary Converter",
  description: "Convert JSON into Python dictionary syntax instantly. Our free JSON to Python Dict tool helps developers quickly translate JSON data into Python-ready code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-python",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
