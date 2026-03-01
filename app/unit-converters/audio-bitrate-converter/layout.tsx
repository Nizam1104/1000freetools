import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Bitrate Converter",
  description: "Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/audio-bitrate-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
