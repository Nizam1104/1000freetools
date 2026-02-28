import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Sorter – Sort JSON Keys Alphabetically",
  description: "Sort JSON object keys alphabetically in ascending or descending order recursively. Free online JSON Sorter keeps your values intact while organizing your data cleanly.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-sorter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
