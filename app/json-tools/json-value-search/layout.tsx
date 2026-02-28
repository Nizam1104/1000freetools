import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Search & Filter Tool Online",
  description: "Search and filter JSON data by key or value with real-time highlight support. Quickly locate matching nodes inside large, complex JSON structures without manual scanning.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-value-search",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
