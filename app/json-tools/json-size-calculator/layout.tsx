import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Size Calculator – Check JSON File Size",
  description: "Calculate the exact size of your JSON in bytes, KB, and MB. Compare minified vs formatted size instantly with our free JSON Size Calculator to optimize data transfer.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-size-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
