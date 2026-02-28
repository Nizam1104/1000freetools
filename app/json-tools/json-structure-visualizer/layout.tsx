import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Structure Visualizer – Visualize JSON as Tree",
  description: "Visualize JSON data as an interactive tree or graph for better understanding. Our free JSON Structure Visualizer makes it easy to explore and present complex JSON hierarchies.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-structure-visualizer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
