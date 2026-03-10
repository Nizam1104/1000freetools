import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Text Converter - Extract Text from Images Online (OCR)",
  description:
    "Extract text from images using OCR technology. Upload screenshots, photos, or documents and get editable text instantly. Works entirely in your browser.",
  openGraph: {
    title: "Free Image to Text Converter - OCR Tool Online",
    description:
      "Extract text from images using OCR technology. Upload and convert screenshots, photos, or documents to editable text in seconds.",
    type: "website",
    url: "https://1000freetools.com/image-tools/get-text-from-image",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/get-text-from-image",
  },
};

export default function GetImageFromTextPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
