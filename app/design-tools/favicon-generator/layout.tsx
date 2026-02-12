import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function FaviconGeneratorPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-1 sm:p-2">
      <div className="w-full">{children}</div>
    </div>
  );
}
