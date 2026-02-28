import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Markdown Table Converter Online",
  description: "Convert JSON arrays into formatted Markdown tables with headers and column alignment. Perfect for documentation, README files, and GitHub wikis — free and instant.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-markdown-table",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
