import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequency to Musical Note Converter",
  description: "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/frequency-to-musical-note-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
