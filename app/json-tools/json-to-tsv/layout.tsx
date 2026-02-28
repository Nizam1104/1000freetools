import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to TSV Converter – Tab-Separated Values",
  description: "Convert JSON arrays into tab-separated values (TSF) for easy spreadsheet and database import. Free online JSON to TSV Converter with instant preview and download support.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-tsv",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
