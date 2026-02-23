import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to PDF Online Free | Image to PDF Converter",
  description:
    "Convert images to PDF instantly completely free. Support for JPG, PNG, GIF, BMP, and WebP. Convert multiple images into a single PDF or individual PDFs.",
  keywords:
    "image to pdf, convert images to pdf, jpg to pdf, png to pdf, image pdf converter, create pdf from images, merge images to pdf",
  openGraph: {
    title: "Free Image to PDF Converter Online",
    description:
      "Convert images to PDF instantly completely free. Map multiple images into a single PDF or individual PDFs locally in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/image-to-pdf",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-to-pdf",
  },
};

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
