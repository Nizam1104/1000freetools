import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horsepower to Animals Converter",
  description: "How many horses is your car's engine worth? Convert horsepower to fun animal equivalents — horses, hamsters, elephants, and more. A lighthearted power converter for curious minds.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/horsepower-to-animals-converter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
