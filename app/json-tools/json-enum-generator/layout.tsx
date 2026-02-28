import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Enum Generator – Generate JSON Enums Online",
  description: "Generate JSON enums and allowed value lists for schema design and documentation. Our free JSON Enum Generator helps standardize field values across your API and data models.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-enum-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
