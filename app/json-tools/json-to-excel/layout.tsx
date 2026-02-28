import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Excel Converter – Export JSON to XLSX",
  description: "Export JSON data directly to Excel XLSX format using client-side generation. Our free JSON to Excel Converter requires no uploads — your data stays private in your browser.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-excel",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
