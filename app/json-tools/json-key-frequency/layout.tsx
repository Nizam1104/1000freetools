import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Key Frequency Analyzer Online",
  description: "Analyze how often each key appears across your JSON dataset. Our free JSON Key Frequency Analyzer is perfect for auditing API responses, datasets, and log files at scale.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-key-frequency",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
