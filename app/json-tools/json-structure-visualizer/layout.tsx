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
  title: "JSON Structure Visualizer – Visualize JSON as Tree",
  description: "Visualize JSON data as an interactive tree or graph for better understanding. Our free JSON Structure Visualizer makes it easy to explore and present complex JSON hierarchies.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-structure-visualizer",
  },
};

const tools = [
  {
    "name": "Json Depth Analyzer",
    "description": "",
    "href": "/json-tools/json-depth-analyzer"
  },
  {
    "name": "Json Formatter Beautifier",
    "description": "",
    "href": "/json-tools/json-formatter-beautifier"
  },
  {
    "name": "Json Pretty Print",
    "description": "",
    "href": "/json-tools/json-pretty-print"
  },
  {
    "name": "Json Viewer",
    "description": "",
    "href": "/json-tools/json-viewer"
  },
  {
    "name": "Json Playground",
    "description": "",
    "href": "/json-tools/json-playground"
  },
  {
    "name": "Json Minifier",
    "description": "",
    "href": "/json-tools/json-minifier"
  },
  {
    "name": "Json Step By Step Parser",
    "description": "",
    "href": "/json-tools/json-step-by-step-parser"
  },
  {
    "name": "Json Linter",
    "description": "",
    "href": "/json-tools/json-linter"
  },
  {
    "name": "Json Validator",
    "description": "",
    "href": "/json-tools/json-validator"
  },
  {
    "name": "Json Schema Validator",
    "description": "",
    "href": "/json-tools/json-schema-validator"
  },
  {
    "name": "Json Explainer",
    "description": "",
    "href": "/json-tools/json-explainer"
  },
  {
    "name": "Json Size Calculator",
    "description": "",
    "href": "/json-tools/json-size-calculator"
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
              <BreadcrumbLink href="/json-tools/json-structure-visualizer">Json Structure Visualizer</BreadcrumbLink>
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
