import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sound Pressure Converter — Pa to dB",
  description: "Convert sound pressure between pascals and decibels (dB SPL) instantly. Free online sound pressure converter for acoustics, audio engineering, and noise measurement.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/sound-pressure-pa-to-db",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
