import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color History Tool",
  description: "Automatically store and revisit your recently used colors in the browser. Never lose track of a color you've worked with — no account needed.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/color-history-tool",
  },
};

export default function ColorHistoryToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
