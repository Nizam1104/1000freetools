import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter – Free Online Tool",
  description: "Convert CSV files or pasted text into structured JSON objects or arrays in seconds. Our free CSV to JSON Converter handles headers automatically and supports any delimiter.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/csv-to-json",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
