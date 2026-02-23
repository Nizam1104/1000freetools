import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter Online - Convert JPG, PNG, WebP & More ",
  description:
    "Convert image formats online for free securely. Change JPG to PNG, PNG to WebP, and process multiple files at once directly in your browser.",
  keywords:
    "image converter, convert image format, jpg to png, png to webp, webp to jpg, free online image converter, bulk image converter",
  openGraph: {
    title: "Free Online Image Format Converter",
    description:
      "Convert image formats online for free securely. Change JPG to PNG, PNG to WebP completely in your browser.",
    type: "website",
    url: "https://1000freetools.com/image-tools/image-format-conversions",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/image-format-conversions",
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
