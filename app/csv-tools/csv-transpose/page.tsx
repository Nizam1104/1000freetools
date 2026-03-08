import CsvTranspose from "@/components/csv-tools/csv-transpose";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Transpose - Swap Rows and Columns in CSV Files",
  description:
    "Transpose CSV data by swapping rows and columns. Convert wide tables to tall tables and vice versa. Free online CSV transpose tool.",
  openGraph: {
    title: "CSV Transpose - Swap Rows and Columns in CSV Files",
    description:
      "Transpose CSV data by swapping rows and columns instantly.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-transpose",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Transpose
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Transpose CSV data by swapping rows and columns. 
            Convert wide tables to tall tables and vice versa.
          </p>
        </div>

        <CsvTranspose />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transposes your CSV data by swapping rows and columns. The first row becomes the first column, the second row becomes the second column, and so on. Useful for converting wide tables (many columns) to tall tables (many rows) or vice versa.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Transpose
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (wide format):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,Alice,Bob,Charlie
age,30,25,35
city,NYC,LA,Chicago`}
          </pre>
          <p className="text-muted-foreground mb-4">Transposed (tall format):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`name,age,city
Alice,30,NYC
Bob,25,LA
Charlie,35,Chicago`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Another Example
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (3 rows × 4 columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,name,score,grade
1,Alice,95,A
2,Bob,87,B`}
          </pre>
          <p className="text-muted-foreground mb-4">Transposed (4 rows × 3 columns):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,1,2
name,Alice,Bob
score,95,87
grade,A,B`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use Transpose
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Pivot data for analysis:</strong> Convert wide-format data (one column per variable) to long-format (one row per observation) for statistical tools.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Prepare for visualization:</strong> Many charting tools expect data in a specific orientation. Transpose to match.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Fix exported data:</strong> Some systems export data in the wrong orientation. Transpose to correct it.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Create summary tables:</strong> Convert row-based data to column-based summary format for reports.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Spreadsheet compatibility:</strong> Some spreadsheet operations require data in a specific orientation.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Wide vs Long Format
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Wide format:</strong> Each variable gets its own column. Good for human reading, comparisons across variables.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`subject,math,science,english
Alice,95,87,92
Bob,88,91,85`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Long format:</strong> Each observation is a row. Better for statistical analysis, databases, and many programming tools.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`subject,subject,score
Alice,math,95
Alice,science,87
Alice,english,92
Bob,math,88
Bob,science,91
Bob,english,85`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Header Handling
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Include headers as first column:</strong> When enabled, the original header row becomes the first column in the transposed output.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Disable for pure data:</strong> If your CSV has no headers or you want to transpose everything including headers, disable this option.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Preview dimensions:</strong> The tool shows original dimensions (rows × columns) and transposed dimensions before export.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Use Cases
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Survey data:</strong> Convert survey responses from wide format (one column per question) to long format for analysis in R or Python.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Financial reports:</strong> Transpose quarterly data from rows to columns for side-by-side comparison.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Scientific data:</strong> Convert between wide and long format for different statistical analysis requirements.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Configuration files:</strong> Transform key-value pairs from rows to columns or vice versa.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Extreme aspect ratios:</strong> Transposing a 1×10000 file creates a 10000×1 file, which may be unwieldy.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Data types:</strong> Transpose treats all values as text. Numeric formatting may not be preserved.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does transpose preserve data types?</h3>
          <p className="text-muted-foreground mb-4">
            No. All values are treated as text during transpose. Numbers, dates, etc. become text strings.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I transpose back to original?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Transposing twice returns to the original orientation (though data types may not be preserved).
          </p>

          <h3 className="text-xl font-semibold mb-2">What happens to empty cells?</h3>
          <p className="text-muted-foreground mb-6">
            Empty cells remain empty after transpose. They become empty cells in the transposed position.
          </p>
        </div>
      </div>
    </>
  );
}
