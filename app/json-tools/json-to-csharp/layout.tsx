import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to C# Class Generator – Free Online",
  description: "Generate C# model classes with correct data types from any JSON input. Our free JSON to C# converter streamlines .NET development by eliminating manual class creation.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-csharp",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
