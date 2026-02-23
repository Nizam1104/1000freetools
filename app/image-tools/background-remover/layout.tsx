import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Unlimited Background Remover (25-Batch) | Remove Image Background Online",
  description:
    "Remove backgrounds from photos fast — free, unlimited, and supports 25-image batch uploads. Perfect for designers, sellers, and devs who need high-quality PNG/JPEG output.",
  keywords:
    "background remover, remove background from image, online background remover, free background remover, batch background removal, image background removal, transparent background maker, PNG background remover",
  openGraph: {
    title: "Free Unlimited Background Remover (25-Batch) ",
    description:
      "Remove backgrounds from photos fast — free, unlimited, and supports 25-image batch uploads. Perfect for designers, sellers, and devs.",
    type: "website",
    url: "https://1000freetools.com/image-tools/background-remover",
  },
  alternates: {
    canonical: "https://1000freetools.com/image-tools/background-remover",
  },
};

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
