import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Java POJO Generator Online",
  description: "Generate Java POJO classes with fields, getters, and setters directly from JSON. Our free JSON to Java converter speeds up backend development and reduces boilerplate code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-java",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
