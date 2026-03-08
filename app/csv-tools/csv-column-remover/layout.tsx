import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Column Remover — Strip Unwanted Columns From CSV Files in One Click",
  description: "Sharing data externally but need to drop sensitive or irrelevant columns first? Select the columns to remove, preview the result, and download a clean file — without opening Excel or writing a script.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-remover",
  },
};

const tools = [
  {
    "name": "CSV Column Extractor",
    "description": "When you only need three columns from a fifty-column export, don't wrestle with Excel. Select exactly the columns you want, rename them if needed, and download a clean, trimmed CSV in seconds.",
    "href": "/csv-tools/csv-column-extractor"
  },
  {
    "name": "CSV Column Reorder Tool",
    "description": "Rearrange CSV columns visually instead of scripting it. Drag headers into the order you need, rename them on the fly, and download a restructured file that matches your target schema exactly.",
    "href": "/csv-tools/csv-column-reorder"
  },
  {
    "name": "CSV Column Splitter",
    "description": "Full names jammed into one column? Addresses that should be five fields? Split any column into as many parts as you need using delimiters, regex, or fixed positions — no formulas, no fuss.",
    "href": "/csv-tools/csv-column-splitter"
  },
  {
    "name": "CSV Column Statistics",
    "description": "Understand your data before you process it. Get count, nulls, min, max, mean, median, and top values for every column in your CSV — all in one summary report, with no code required.",
    "href": "/csv-tools/csv-column-statistics"
  },
  {
    "name": "CSV Column Merger",
    "description": "Concatenate first name + last name, city + state + zip, or any set of columns into one using any separator you choose. Merge columns with a custom template and optionally remove the originals — instantly.",
    "href": "/csv-tools/csv-column-merger"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Column Remover</h1>
        <p className="text-muted-foreground">
          Sharing data externally but need to drop sensitive or irrelevant columns first? Select the columns to remove, preview the result, and download a clean file — without opening Excel or writing a script.
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
