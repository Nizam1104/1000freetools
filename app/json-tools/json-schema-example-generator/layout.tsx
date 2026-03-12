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
  title: "JSON Schema Example Generator Online",
  description: "Generate realistic example JSON data from any JSON Schema definition instantly. Our free tool helps developers test schema validation and create accurate mock data for their APIs.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-schema-example-generator",
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
    "name": "Json Pagination Generator",
    "description": "",
    "href": "/json-tools/json-pagination-generator"
  },
  {
    "name": "Json Api Response Generator",
    "description": "",
    "href": "/json-tools/json-api-response-generator"
  },
  {
    "name": "Json Nested Structure",
    "description": "",
    "href": "/json-tools/json-nested-structure"
  },
  {
    "name": "Json Config Validator",
    "description": "",
    "href": "/json-tools/json-config-validator"
  },
  {
    "name": "Json Unflatten",
    "description": "",
    "href": "/json-tools/json-unflatten"
  },
  {
    "name": "Json Sensitive Data Maser",
    "description": "",
    "href": "/json-tools/json-sensitive-data-maser"
  },
  {
    "name": "Json To Tsv",
    "description": "",
    "href": "/json-tools/json-to-tsv"
  },
  {
    "name": "Xml To Json",
    "description": "",
    "href": "/json-tools/xml-to-json"
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
              <BreadcrumbLink href="/json-tools/json-schema-example-generator">Json Schema Example Generator</BreadcrumbLink>
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
