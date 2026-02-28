import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Diff Tool – Compare Two JSON Objects",
  description: "Compare two JSON objects side by side and highlight added, removed, and changed fields instantly. Our free JSON Diff Tool makes reviewing API response changes and config diffs easy.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-diff",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
