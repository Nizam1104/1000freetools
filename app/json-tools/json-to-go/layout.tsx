import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to Go Struct Generator Online",
  description: "Generate Go structs with proper json tags from JSON input instantly. Our free JSON to Go converter helps Golang developers scaffold data models fast and accurately.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-go",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
