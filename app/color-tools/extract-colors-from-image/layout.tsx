import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract Colors from an Image",
  description: "Upload any image and extract its dominant colors directly in your browser using canvas. No data is sent to a server — 100% private and instant.",
  alternates: {
    canonical: "https://1000freetools.com/color-tools/extract-colors-from-image",
  },
};

export default function ExtractColorsFromImageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
