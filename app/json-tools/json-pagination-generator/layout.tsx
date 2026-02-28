import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Pagination Generator – Add Pagination to JSON",
  description: "Wrap JSON data with standard pagination metadata including page, limit, and total count. Our free JSON Pagination Generator helps you quickly prototype paginated API responses.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-pagination-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
