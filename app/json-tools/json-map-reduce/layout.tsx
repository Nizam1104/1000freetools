import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Map Reduce Tool – Transform JSON Arrays",
  description: "Apply map and reduce style transformations to JSON arrays online. Our free JSON Map Reduce Tool helps developers test data transformations quickly without a full code setup.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-map-reduce",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
