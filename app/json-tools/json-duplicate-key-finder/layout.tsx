import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Duplicate Key Finder – Detect Duplicate Keys",
  description: "Find and flag duplicate keys in JSON objects that could cause silent data loss. Our free JSON Duplicate Key Finder helps you write cleaner, safer, and more reliable JSON.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-duplicate-key-finder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
