import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Playground – Live JSON Editor Online",
  description: "Edit JSON in a live interactive playground and see formatted output instantly. Our free JSON Playground is the perfect environment for experimenting, learning, and testing JSON.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-playground",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
