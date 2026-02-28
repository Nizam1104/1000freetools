import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSONPath Query Tool – Run JSONPath Online",
  description: "Execute JSONPath expressions against JSON data and view matching results instantly. Our free JSONPath Query Tool is perfect for testing queries before integrating them in code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/jsonpath-query",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
