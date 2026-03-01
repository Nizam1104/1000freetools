import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radioactivity Converter",
  description: "Convert radioactivity units — becquerels, curies, millicuries, rutherfords, and more. Free online radioactivity converter for nuclear medicine, radiation safety, and physics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/radioactivity-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
