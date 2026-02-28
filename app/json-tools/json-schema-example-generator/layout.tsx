import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Schema Example Generator Online",
  description: "Generate realistic example JSON data from any JSON Schema definition instantly. Our free tool helps developers test schema validation and create accurate mock data for their APIs.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-schema-example-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
