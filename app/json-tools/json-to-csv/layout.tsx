import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter – Free Online Tool",
  description: "Convert JSON arrays to CSV format instantly with automatic header detection and custom delimiter options. Export structured JSON data into spreadsheet-ready CSV files for free.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-csv",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
