import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dew Point Calculator",
  description: "Calculate dew point temperature from relative humidity and air temperature instantly. Free online dew point calculator for weather forecasting, HVAC design, and condensation analysis.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/dew-point-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
