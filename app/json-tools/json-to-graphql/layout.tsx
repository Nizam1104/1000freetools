import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to GraphQL Input Converter Online",
  description: "Convert JSON objects into GraphQL input type syntax instantly. Our free JSON to GraphQL tool helps developers bridge REST JSON data with GraphQL schemas quickly.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-graphql",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
