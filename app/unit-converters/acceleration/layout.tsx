import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceleration Converter",
  description: "Convert acceleration units including m/s², g-force, ft/s², Gal, and more. Accurate online acceleration converter for physics, aerospace, and mechanical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/acceleration",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
