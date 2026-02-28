import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Color Suggestion Tool",
  description: "Enter a background color and get instant suggestions for readable, accessible text colors. Designed to help you meet contrast requirements effortlessly.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/text-color-suggestion-tool",
  },
};

export default function TextColorSuggestionToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
