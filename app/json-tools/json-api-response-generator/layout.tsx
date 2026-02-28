import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON API Response Generator – Mock API Responses",
  description: "Generate realistic mock API JSON responses with status codes, data payloads, and pagination. Our free tool speeds up frontend development and API testing without a live backend.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-api-response-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
