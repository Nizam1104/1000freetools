import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Extract Tool – Extract Nested JSON by Path",
  description: "Extract a specific nested portion of JSON using a key path. Our free JSON Extract Sub-JSON Tool helps you isolate exactly the data you need from large, complex JSON documents.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-extract-subjson",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
