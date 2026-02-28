import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random JSON Object Generator Online",
  description: "Generate random JSON objects for testing, prototyping, and demos in seconds. Our free JSON Random Object Generator lets you customize fields, types, and nesting depth.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-random-object",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
