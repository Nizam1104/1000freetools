import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magnetomotive Force Converter",
  description: "Convert magnetomotive force units — ampere-turns, gilberts, kiloampere-turns, and more. Free online MMF converter for magnetic circuit design and electromagnetic engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/magnetomotive-force",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
