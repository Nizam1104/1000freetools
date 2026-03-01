import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angular Velocity Converter",
  description: "Convert angular velocity units — radians per second, degrees per second, RPM, and more. Free online angular velocity converter for physics, mechanics, and engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/velocity-angular",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
