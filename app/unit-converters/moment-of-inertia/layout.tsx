import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moment of Inertia Converter",
  description: "Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online moment of inertia converter for mechanical engineering and rotational dynamics.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/moment-of-inertia",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
