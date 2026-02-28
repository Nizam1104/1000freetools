import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Viewer – Interactive Tree View Online",
  description: "View JSON data in a clean interactive tree with expand/collapse, search, and raw toggle. Our free JSON Viewer makes exploring complex JSON structures effortless.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-viewer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
