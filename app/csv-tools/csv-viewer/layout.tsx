import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free CSV Viewer Online – Open & View Large CSV Files Instantly",
  description:
    "Open and view CSV files online for free. Fast CSV viewer that supports large files with millions of rows. No signup, no upload limits, works in your browser.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-viewer",
  },
};

export default function CSVViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
