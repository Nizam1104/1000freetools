import CsvToHtml from "@/components/csv-tools/csv-to-html";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to HTML Table Converter - Convert CSV to Styled HTML Tables",
  description:
    "Convert CSV files to HTML table format with CSS classes, striped rows, borders, and responsive layout. Free online CSV to HTML converter.",
  openGraph: {
    title: "CSV to HTML Table Converter - Convert CSV to Styled HTML Tables",
    description:
      "Convert CSV to responsive HTML tables with customizable CSS styling.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-html",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to HTML Table Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert CSV data to HTML tables with CSS styling options. 
            Generate responsive, accessible tables ready for web pages.
          </p>
        </div>

        <CsvToHtml />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into semantic HTML tables. It generates proper table structure with thead, tbody, th, and td elements. You can add CSS classes for styling, enable striped rows for readability, add borders, and make tables responsive for mobile devices.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            HTML Table Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>CSS class name:</strong> Add a custom class to the table element for targeting with your own styles. Default is "csv-table".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Striped rows:</strong> Adds alternating row colors using CSS nth-child selectors. Improves readability for wide tables.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Bordered table:</strong> Adds borders around cells and the table perimeter. Useful for print styles or data-heavy tables.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Responsive layout:</strong> Wraps table in a scrollable container for mobile devices. Prevents horizontal layout breaking on small screens.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>HTML escaping:</strong> Special characters in CSV data are escaped (, &, ", ') to prevent XSS and ensure valid HTML.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Output
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,email,role
Alice,alice@example.com,Admin
Bob,bob@example.com,User`}
          </pre>
          <p className="text-muted-foreground mb-4">Output HTML:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`<table class="csv-table">
  <thead>
    <tr>
      <th>name</th>
      <th>email</th>
      <th>role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>alice@example.com</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>bob@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</table>`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Documentation pages:</strong> Display data tables in technical documentation, API references, or user guides.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Blog posts:</strong> Embed data tables directly in blog content without relying on images or external tools.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Admin dashboards:</strong> Quickly generate tables for internal tools or admin panels from CSV exports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Email templates:</strong> Create HTML tables for email newsletters (note: email CSS support is limited).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Static sites:</strong> Add data tables to Jekyll, Hugo, or Next.js sites without JavaScript dependencies.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Semantic HTML Structure
          </h2>
          <p className="text-muted-foreground mb-4">
            The generated HTML follows best practices for accessibility and semantics:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>&lt;thead&gt;:</strong> Wraps header row for proper table structure.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>&lt;tbody&gt;:</strong> Wraps data rows, allowing separate styling from headers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>&lt;th&gt;:</strong> Header cells with implicit role="columnheader" for screen readers.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>&lt;td&gt;:</strong> Standard data cells with proper scope association.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            CSS Styling Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            Basic CSS for a clean table appearance:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`.csv-table {
  border-collapse: collapse;
  width: 100%;
}
.csv-table th,
.csv-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}
.csv-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}
.csv-table-striped tbody tr:nth-child(even) {
  background-color: #fafafa;
}`}
          </pre>
          <p className="text-muted-foreground mb-6">
            For responsive tables, the tool wraps output in a div with overflow-x: auto for horizontal scrolling on small screens.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>No inline styles:</strong> The tool generates class-based styling. For email templates, you may need to inline CSS manually.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large tables:</strong> Tables with thousands of rows may cause slow page rendering. Consider pagination for large datasets.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Complex formatting:</strong> Cell colors, merged cells, and complex layouts require manual HTML editing after conversion.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Can I customize the table styling?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Add your own CSS classes and styles. The tool provides basic structure; you control the visual appearance.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this work with CSV files that have commas in values?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. The CSV parser properly handles quoted fields containing commas, quotes, and newlines.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert HTML tables back to CSV?</h3>
          <p className="text-muted-foreground mb-6">
            Yes, use the HTML Table to CSV tool. It extracts data from HTML tables and converts to CSV format.
          </p>
        </div>
      </div>
    </>
  );
}
