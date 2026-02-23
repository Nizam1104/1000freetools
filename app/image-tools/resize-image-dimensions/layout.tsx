import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Resizer - Resize Images by Dimensions Online ",
  description:
    "Resize images by dimensions instantly. Set custom width and height in pixels. Maintain aspect ratio or set exact dimensions. Support for JPG, PNG, GIF, BMP, and WebP.",
  keywords:
    "resize image, image dimensions, resize image dimensions, image resizer, change image size, resize photo, resize jpg, resize png, aspect ratio, pixel dimensions",
  openGraph: {
    title: "Free Image Resizer - Resize Images by Dimensions Online",
    description:
      "Resize images by dimensions instantly. Set custom width and height in pixels. Maintain aspect ratio or set exact dimensions.",
    type: "website",
    url: "https://1000freetools.com/image-tools/resize-image-dimensions",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/resize-image-dimensions",
  },
};

export default function ResizeImageDimensionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
