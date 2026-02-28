import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Array & Object Counter Online",
  description: "Count all arrays, objects, keys, and values inside any JSON structure. Our free JSON Counter gives you a quick statistical overview of your JSON data composition.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-array-object-counter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
