import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON API Error Formatter – Standard Error Responses",
  description: "Generate standardized JSON error response objects for REST APIs. Our free JSON API Error Formatter ensures consistent error formats with proper codes, messages, and details.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-api-error-formatter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
