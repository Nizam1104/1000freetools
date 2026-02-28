import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Empty Field Finder – Find Null & Empty Values",
  description: "Identify null, empty string, and missing values in your JSON data instantly. Our free JSON Empty Field Finder helps you clean datasets and ensure data completeness.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-empty-field-finder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
