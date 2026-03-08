import CsvToMarkdown from "@/components/csv-tools/csv-to-markdown";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Markdown Table Converter - Convert CSV to GitHub-Flavored Markdown",
  description:
    "Convert CSV files to Markdown table format with alignment options. Perfect for GitHub README files, documentation, and Markdown editors.",
  openGraph: {
    title: "CSV to Markdown Table Converter - Convert CSV to GitHub-Flavored Markdown",
    description:
      "Convert CSV to Markdown tables for GitHub README and documentation.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-markdown",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to Markdown Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert CSV data to GitHub-Flavored Markdown tables. 
            Choose column alignment for clean, readable documentation tables.
          </p>
        </div>

        <CsvToMarkdown />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into Markdown table syntax. It generates GitHub-Flavored Markdown tables with proper pipe separators, header alignment markers, and escaped pipe characters in cell content. Perfect for README files, documentation, and any Markdown-based content.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,age,role
Alice,30,Developer
Bob,25,Designer
Charlie,35,Manager`}
          </pre>
          <p className="text-muted-foreground mb-4">Output Markdown:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`| name    | age | role      |
|---------|-----|-----------|
| Alice   | 30  | Developer |
| Bob     | 25  | Designer  |
| Charlie | 35  | Manager   |`}
          </pre>
          <p className="text-muted-foreground mb-4">Renders as:</p>
          <div className="border rounded-lg p-4 mb-6 overflow-x-auto">
            <table className="w-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-muted">name</th>
                  <th className="border px-4 py-2 bg-muted">age</th>
                  <th className="border px-4 py-2 bg-muted">role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Alice</td>
                  <td className="border px-4 py-2">30</td>
                  <td className="border px-4 py-2">Developer</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Bob</td>
                  <td className="border px-4 py-2">25</td>
                  <td className="border px-4 py-2">Designer</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Charlie</td>
                  <td className="border px-4 py-2">35</td>
                  <td className="border px-4 py-2">Manager</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold mb-4">
            Alignment Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Left alignment (default):</strong> Text aligns to the left. Best for text columns like names and descriptions.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`| name  | age |
|:------|:---:|
| Alice | 30  |`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Center alignment:</strong> Text centers in the column. Good for short values or status indicators.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`| name  | age |
|:-----:|:---:|
| Alice | 30  |`}
          </pre>
          <p className="text-muted-foreground mb-6">
            <strong>Right alignment:</strong> Text aligns to the right. Best for numbers and currency values.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`| name  | age |
|------:|----:|
| Alice |  30 |`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use Markdown Tables
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>GitHub README files:</strong> Display feature comparisons, installation options, or API parameters in project documentation.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Technical documentation:</strong> Document configuration options, command-line flags, or data schemas.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Markdown blogs:</strong> Include data tables in blog posts on platforms like Dev.to, Hashnode, or static site generators.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Issue tracking:</strong> Format data in GitHub Issues, GitLab issues, or Jira comments that support Markdown.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Documentation sites:</strong> Docusaurus, MkDocs, Hugo, and other static site generators render Markdown tables natively.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Markdown Table Syntax
          </h2>
          <p className="text-muted-foreground mb-4">
            GitHub-Flavored Markdown tables use pipes (|) to separate columns:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Header row:</strong> First row with column names between pipes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Alignment row:</strong> Second row with dashes and optional colons for alignment.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data rows:</strong> Subsequent rows with cell values.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Pipe escaping:</strong> Pipe characters within cell content are escaped with backslash (\|) to prevent breaking the table structure.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>No cell merging:</strong> Markdown doesn't support colspan or rowspan. Each cell is independent.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>No nested tables:</strong> You can't put tables inside table cells in Markdown.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Limited styling:</strong> No cell colors, fonts, or borders beyond what Markdown renderers provide.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Wide tables:</strong> Tables wider than the viewport require horizontal scrolling. Consider splitting wide tables.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this work with all Markdown platforms?</h3>
          <p className="text-muted-foreground mb-4">
            GitHub-Flavored Markdown tables work on GitHub, GitLab, Bitbucket, and most modern Markdown renderers. Some older platforms may not support tables.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I add formatting within cells?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. You can add bold, italic, links, and code spans within Markdown table cells using standard Markdown syntax.
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I handle long content in cells?</h3>
          <p className="text-muted-foreground mb-6">
            Markdown tables don't wrap automatically in all renderers. For long content, consider using line breaks (br tags) or splitting into multiple rows.
          </p>
        </div>
      </div>
    </>
  );
}
