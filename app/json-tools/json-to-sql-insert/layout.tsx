import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to SQL INSERT Statement Generator",
  description: "Generate SQL INSERT statements from JSON arrays automatically. Our free JSON to SQL tool makes importing JSON data into relational databases fast and error-free.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-sql-insert",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
