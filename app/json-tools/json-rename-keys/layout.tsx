import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "JSON Rename Keys Tool – Rename JSON Keys Online",
  description: "Rename selected keys across nested JSON structures in bulk. Our free JSON Rename Keys Tool makes API response normalization and data migration fast and error-free.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-rename-keys",
  },
};

const tools = [
  {
    "name": "Json Remove Keys",
    "description": "",
    "href": "/json-tools/json-remove-keys"
  },
  {
    "name": "Json Key Extractor",
    "description": "",
    "href": "/json-tools/json-key-extractor"
  },
  {
    "name": "Json Value Search",
    "description": "",
    "href": "/json-tools/json-value-search"
  },
  {
    "name": "Json Filter",
    "description": "",
    "href": "/json-tools/json-filter"
  },
  {
    "name": "Json Transformer",
    "description": "",
    "href": "/json-tools/json-transformer"
  },
  {
    "name": "Json Sorter",
    "description": "",
    "href": "/json-tools/json-sorter"
  },
  {
    "name": "Json Flatten",
    "description": "",
    "href": "/json-tools/json-flatten"
  },
  {
    "name": "Json Unflatten",
    "description": "",
    "href": "/json-tools/json-unflatten"
  },
  {
    "name": "Json Merge",
    "description": "",
    "href": "/json-tools/json-merge"
  },
  {
    "name": "Json Diff",
    "description": "",
    "href": "/json-tools/json-diff"
  },
  {
    "name": "Json Patch Generator",
    "description": "",
    "href": "/json-tools/json-patch-generator"
  },
  {
    "name": "Json Map Reduce",
    "description": "",
    "href": "/json-tools/json-map-reduce"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-5xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/json-tools">Json Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/json-tools/json-rename-keys">Json Rename Keys</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free JSON Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
