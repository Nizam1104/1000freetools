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
  title: "CSV Column Splitter — Split One CSV Column Into Multiple Columns by Any Pattern",
  description: "Full names jammed into one column? Addresses that should be five fields? Split any column into as many parts as you need using delimiters, regex, or fixed positions — no formulas, no fuss.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-splitter",
  },
};

const tools = [
  {
    "name": "CSV Editor",
    "description": "A lightweight, no-install CSV editor that feels like a spreadsheet. Click any cell, make your changes, and download a clean file — your data stays on your machine the entire time.",
    "href": "/csv-tools/csv-editor"
  },
  {
    "name": "CSV Column Merger",
    "description": "Concatenate first name + last name, city + state + zip, or any set of columns into one using any separator you choose. Merge columns with a custom template and optionally remove the originals — instantly.",
    "href": "/csv-tools/csv-column-merger"
  },
  {
    "name": "CSV Column Remover",
    "description": "Sharing data externally but need to drop sensitive or irrelevant columns first? Select the columns to remove, preview the result, and download a clean file — without opening Excel or writing a script.",
    "href": "/csv-tools/csv-column-remover"
  },
  {
    "name": "CSV Column Reorder Tool",
    "description": "Rearrange CSV columns visually instead of scripting it. Drag headers into the order you need, rename them on the fly, and download a restructured file that matches your target schema exactly.",
    "href": "/csv-tools/csv-column-reorder"
  },
  {
    "name": "CSV Delimiter Converter",
    "description": "European exports use semicolons. Your tool expects pipes. Our converter switches delimiters in seconds — and automatically adds proper quoting around any fields that contain the new separator character.",
    "href": "/csv-tools/csv-delimiter-converter"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/csv-tools">Csv Tools</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/csv-tools/csv-column-splitter">Csv Column Splitter</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Column Splitter</h1>
        <p className="text-muted-foreground">
          Full names jammed into one column? Addresses that should be five fields? Split any column into as many parts as you need using delimiters, regex, or fixed positions — no formulas, no fuss.
        </p>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
