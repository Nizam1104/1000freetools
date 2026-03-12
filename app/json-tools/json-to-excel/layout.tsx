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
  title: "JSON to Excel Converter – Export JSON to XLSX",
  description: "Export JSON data directly to Excel XLSX format using client-side generation. Our free JSON to Excel Converter requires no uploads — your data stays private in your browser.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-excel",
  },
};

const tools = [
  {
    "name": "Json To Typescript",
    "description": "",
    "href": "/json-tools/json-to-typescript"
  },
  {
    "name": "Json To Javascript",
    "description": "",
    "href": "/json-tools/json-to-javascript"
  },
  {
    "name": "Json To Python",
    "description": "",
    "href": "/json-tools/json-to-python"
  },
  {
    "name": "Json To Java",
    "description": "",
    "href": "/json-tools/json-to-java"
  },
  {
    "name": "Json To Csharp",
    "description": "",
    "href": "/json-tools/json-to-csharp"
  },
  {
    "name": "Json To Kotlin",
    "description": "",
    "href": "/json-tools/json-to-kotlin"
  },
  {
    "name": "Json To Swift",
    "description": "",
    "href": "/json-tools/json-to-swift"
  },
  {
    "name": "Json To Go",
    "description": "",
    "href": "/json-tools/json-to-go"
  },
  {
    "name": "Json To Php",
    "description": "",
    "href": "/json-tools/json-to-php"
  },
  {
    "name": "Json To Graphql",
    "description": "",
    "href": "/json-tools/json-to-graphql"
  },
  {
    "name": "Json To Xml",
    "description": "",
    "href": "/json-tools/json-to-xml"
  },
  {
    "name": "Json To Yaml",
    "description": "",
    "href": "/json-tools/json-to-yaml"
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
              <BreadcrumbLink href="/json-tools/json-to-excel">Json To Excel</BreadcrumbLink>
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
