import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Video to Grayscale Converter – Convert Video to Black and White Online",
  description:
    "Convert any video to black and white online for free. Remove color and create a classic grayscale look instantly. No watermark, no software required.",
  alternates: {
    canonical: "https://1000freetools.com/video-tools/video-grayscale",
  },
};

export default function VideoGrayscaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
