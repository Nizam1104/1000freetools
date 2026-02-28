import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Date Time Generator – Generate Timestamps",
  description: "Generate ISO 8601, UTC, and custom formatted date-time values in JSON. Our free JSON Date Time Generator is perfect for mocking timestamps in test data and API responses.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-datetime-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
