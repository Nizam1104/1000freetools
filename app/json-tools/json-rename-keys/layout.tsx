import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Rename Keys Tool – Rename JSON Keys Online",
  description: "Rename selected keys across nested JSON structures in bulk. Our free JSON Rename Keys Tool makes API response normalization and data migration fast and error-free.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-rename-keys",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
