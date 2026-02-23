import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pick Color Code from Image - Free Online Color Picker Tool ",
  description:
    "Free online tool to pick color codes from images. Upload any image and hover over pixels to get hex, RGB color codes instantly. Perfect for designers and developers.",
  keywords: [
    "color picker",
    "image color picker",
    "hex color picker",
    "rgb color picker",
    "color picker tool",
    "online color picker",
    "image analysis",
    "design tools",
    "web design",
  ],
  alternates: {
    canonical:
      "https://1000freetools.com/image-tools/pick-color-code-from-image",
  },
  openGraph: {
    title: "Pick Color Code from Image - Free Online Color Picker Tool",
    description:
      "Free online tool to pick color codes from images. Upload any image and hover over pixels to get hex, RGB color codes instantly. Perfect for designers and developers.",
    type: "website",
    url: "https://1000freetools.com/image-tools/pick-color-code-from-image",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pick Color Code from Image - Free Online Color Picker Tool",
    description:
      "Free online tool to pick color codes from images. Upload any image and hover over pixels to get hex, RGB color codes instantly.",
  },
};

export default function PickColorCodeFromImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
