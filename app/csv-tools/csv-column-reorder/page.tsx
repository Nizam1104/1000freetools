import CsvColumnReorder from "@/components/csv-tools/csv-column-reorder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Column Reorder - Rearrange CSV Columns with Drag and Drop",
  description:
    "Reorder CSV columns using drag-and-drop interface. Move columns to new positions with arrow buttons or manual index input. Free online CSV column reordering tool.",
  openGraph: {
    title: "CSV Column Reorder - Rearrange CSV Columns with Drag and Drop",
    description:
      "Rearrange CSV columns using intuitive drag-and-drop interface.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-column-reorder",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Column Reorder
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Rearrange CSV columns using drag-and-drop or arrow buttons. 
            Move columns to new positions and export with the new order.
          </p>
        </div>

        <CsvColumnReorder />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool lets you rearrange the column order in your CSV file. Drag columns to new positions, use arrow buttons for precise movement, or type in the desired order. The data in each column stays intact — only the column positions change.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Reordering Methods
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Drag and drop:</strong> Click and hold a column, drag it to the new position, release. Visual and intuitive.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Arrow buttons:</strong> Click left/right arrows to move a column one position at a time. Precise control.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Index input:</strong> Type the desired position number for each column. Fast for known target positions.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Reset:</strong> Return to the original column order if you make a mistake.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>API requirements:</strong> Some APIs expect CSV columns in a specific order. Reorder to match the specification.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database imports:</strong> Match column order to your table schema for smoother imports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Report formatting:</strong> Put the most important columns first for better readability.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>System compatibility:</strong> Legacy systems may require columns in a specific sequence.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data standardization:</strong> Align column order across multiple CSV files for consistent processing.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (columns in wrong order):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`email,department,name,id
alice@example.com,Engineering,Alice,1
bob@example.com,Marketing,Bob,2`}
          </pre>
          <p className="text-muted-foreground mb-4">Reorder to: id, name, email, department</p>
          <p className="text-muted-foreground mb-4">Output CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,name,email,department
1,Alice,alice@example.com,Engineering
2,Bob,bob@example.com,Marketing`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Shopify product import:</strong> Shopify expects CSV columns in a specific order: Handle, Title, Body, Vendor, Type, Tags, etc. Reorder your product export to match.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Google Contacts import:</strong> Google Contacts has a required column order for CSV imports. Reorder your contacts list accordingly.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Financial data submission:</strong> Banks and payment processors often require transaction data in a specific column sequence.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Survey data analysis:</strong> Reorder survey response columns to match the question flow for easier analysis.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Tips for Reordering
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Plan the order first:</strong> Write down your target column sequence before starting.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Group related columns:</strong> Keep related fields together (e.g., first_name, last_name, email).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Put identifiers first:</strong> ID columns or primary keys are often useful as the first column.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Consider the consumer:</strong> Order columns based on how the data will be used, not how it was exported.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow drag-and-drop performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Many columns:</strong> Files with hundreds of columns may be unwieldy to reorder manually.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does reordering affect the data?</h3>
          <p className="text-muted-foreground mb-4">
            No. Only column positions change. The data within each column remains exactly the same.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I save my column order for later?</h3>
          <p className="text-muted-foreground mb-4">
            This tool doesn't save order configurations. For repeated reordering, consider writing a script.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if I make a mistake?</h3>
          <p className="text-muted-foreground mb-6">
            Use the reset button to return to the original order, or manually drag columns back to their positions.
          </p>
        </div>
      </div>
    </>
  );
}
