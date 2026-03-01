import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Angular Acceleration Converter",
  description: "Convert angular acceleration units including rad/s², deg/s², and rev/min². Free online angular acceleration converter for rotational dynamics and mechanical engineering.",
  alternates: {
    canonical: "https://1000freetools.com/unit-converters/acceleration-angular",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
