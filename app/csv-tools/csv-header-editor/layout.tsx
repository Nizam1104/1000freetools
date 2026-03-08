import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "CSV Header Editor — Rename, Recase, and Clean CSV Column Headers in Bulk",
  description: "Headers like 'First Name ', 'LAST_NAME', and 'e mail' breaking your imports? Rename, normalize case, trim spaces, and convert to snake_case or camelCase across all headers at once.",
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-header-editor",
  },
};

const tools = [
  {
    "name": "CSV Editor",
    "description": "A lightweight, no-install CSV editor that feels like a spreadsheet. Click any cell, make your changes, and download a clean file — your data stays on your machine the entire time.",
    "href": "/csv-tools/csv-editor"
  },
  {
    "name": "CSV Column Reorder Tool",
    "description": "Rearrange CSV columns visually instead of scripting it. Drag headers into the order you need, rename them on the fly, and download a restructured file that matches your target schema exactly.",
    "href": "/csv-tools/csv-column-reorder"
  },
  {
    "name": "CSV Column Extractor",
    "description": "When you only need three columns from a fifty-column export, don't wrestle with Excel. Select exactly the columns you want, rename them if needed, and download a clean, trimmed CSV in seconds.",
    "href": "/csv-tools/csv-column-extractor"
  },
  {
    "name": "CSV Column Remover",
    "description": "Sharing data externally but need to drop sensitive or irrelevant columns first? Select the columns to remove, preview the result, and download a clean file — without opening Excel or writing a script.",
    "href": "/csv-tools/csv-column-remover"
  },
  {
    "name": "CSV Cleaner",
    "description": "Trailing spaces, blank rows, BOM markers, Windows line endings — the tedious stuff that breaks imports and wastes your time. Run it through our cleaner and get a corrected file with a full report of what changed.",
    "href": "/csv-tools/csv-cleaner"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Header Editor</h1>
        <p className="text-muted-foreground">
          Headers like 'First Name ', 'LAST_NAME', and 'e mail' breaking your imports? Rename, normalize case, trim spaces, and convert to snake_case or camelCase across all headers at once.
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
