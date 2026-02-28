import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON API Formatter – Standardize API Responses",
  description: "Format JSON API responses into a consistent, readable structure following best practices. Our free JSON API Formatter helps teams maintain uniform response formats across all endpoints.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-api-formatter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
