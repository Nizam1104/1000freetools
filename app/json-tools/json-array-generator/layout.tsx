import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Array Generator – Generate JSON Arrays Online",
  description: "Generate JSON arrays with configurable length, types, and value ranges instantly. Our free JSON Array Generator is ideal for creating test data, mock datasets, and demos.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-array-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
