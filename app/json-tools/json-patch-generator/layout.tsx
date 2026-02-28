import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Patch Generator – Generate Patch Operations",
  description: "Generate RFC 6902 JSON Patch operations to transform one JSON document into another. Our free tool is ideal for versioning APIs and tracking incremental JSON changes.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-patch-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
