import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Kotlin Data Class Generator",
  description: "Generate Kotlin data classes with nullable and non-nullable fields from JSON. Our free tool helps Android and Kotlin developers create accurate data models in seconds.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-kotlin",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
