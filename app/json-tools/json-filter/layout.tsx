import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Filter Tool – Filter JSON Arrays Online",
  description: "Filter JSON arrays based on conditions like equals, contains, and range. Our free JSON Filter Tool lets you extract exactly the data you need without writing any code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-filter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
