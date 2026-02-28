import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dominant Color Finder from Image",
  description: "Find the single most dominant color in any uploaded image. Great for auto-generating themes, UI accents, or brand colors from photos.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/dominant-color-finder",
  },
};

export default function DominantColorFinderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
