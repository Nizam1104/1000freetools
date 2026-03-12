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
  title: "JSON Pagination Generator – Add Pagination to JSON",
  description: "Wrap JSON data with standard pagination metadata including page, limit, and total count. Our free JSON Pagination Generator helps you quickly prototype paginated API responses.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-pagination-generator",
  },
};

const tools = [
  {
    "name": "Json Array Generator",
    "description": "",
    "href": "/json-tools/json-array-generator"
  },
  {
    "name": "Json Random Object",
    "description": "",
    "href": "/json-tools/json-random-object"
  },
  {
    "name": "Json Datetime Generator",
    "description": "",
    "href": "/json-tools/json-datetime-generator"
  },
  {
    "name": "Json Enum Generator",
    "description": "",
    "href": "/json-tools/json-enum-generator"
  },
  {
    "name": "Json Api Response Generator",
    "description": "",
    "href": "/json-tools/json-api-response-generator"
  },
  {
    "name": "Json Schema Example Generator",
    "description": "",
    "href": "/json-tools/json-schema-example-generator"
  },
  {
    "name": "Json Nested Structure",
    "description": "",
    "href": "/json-tools/json-nested-structure"
  },
  {
    "name": "Json Rename Keys",
    "description": "",
    "href": "/json-tools/json-rename-keys"
  },
  {
    "name": "Json Pretty Print",
    "description": "",
    "href": "/json-tools/json-pretty-print"
  },
  {
    "name": "Json To Text",
    "description": "",
    "href": "/json-tools/json-to-text"
  },
  {
    "name": "Json Patch Generator",
    "description": "",
    "href": "/json-tools/json-patch-generator"
  },
  {
    "name": "Json Config Validator",
    "description": "",
    "href": "/json-tools/json-config-validator"
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
              <BreadcrumbLink href="/json-tools/json-pagination-generator">Json Pagination Generator</BreadcrumbLink>
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
