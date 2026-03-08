import CsvMinifier from "@/components/csv-tools/csv-minifier";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Minifier - Reduce CSV File Size by Removing Whitespace",
  description:
    "Minify CSV files by stripping unnecessary whitespace, blank lines, redundant quotes, and BOM markers. Reduce file size for faster uploads and transfers.",
  openGraph: {
    title: "CSV Minifier - Reduce CSV File Size by Removing Whitespace",
    description:
      "Minify CSV files by stripping unnecessary whitespace, blank lines, and redundant quotes.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-minifier",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Minifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Strip unnecessary whitespace, blank lines, redundant quotes, and BOM 
            markers from CSV files. Reduce file size for faster uploads and data transfers.
          </p>
        </div>

        <CsvMinifier />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What CSV Minifier Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool removes every unnecessary byte from your CSV file. It strips leading and trailing whitespace from fields, removes blank rows, eliminates redundant quote characters, and strips BOM markers. The result is a smaller file that loads faster and uses less bandwidth.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Gets Removed
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Leading/trailing whitespace:</strong> Spaces and tabs at the start or end of field values get trimmed. "  John  " becomes "John".
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Blank rows:</strong> Empty lines between or after data rows are removed. These often appear after editing in spreadsheet software.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Redundant quotes:</strong> Fields quoted unnecessarily lose their quotes. "John" becomes John unless the value contains special characters.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>BOM markers:</strong> The Byte Order Mark at file start (common from Windows Excel) gets stripped.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Trailing newlines:</strong> Extra blank lines at the end of the file are removed.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>API uploads with size limits:</strong> Reduce file size to stay under upload limits for services like Google Ads, Facebook Ads, or Shopify.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Email attachments:</strong> Smaller files attach easier and don't bounce from size restrictions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Version control:</strong> Smaller CSV files in Git repos reduce clone times and storage.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Web downloads:</strong> If you offer CSV downloads to users, minified files load faster and use less bandwidth.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Database imports:</strong> Smaller files import faster into MySQL, PostgreSQL, or BigQuery.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Size Reduction Examples
          </h2>
          <p className="text-muted-foreground mb-4">
            Typical size reductions vary by source:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Excel exports:</strong> 10-20% reduction from removing BOM, trimming spaces, and eliminating redundant quotes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Database exports:</strong> 5-15% reduction, mostly from trimming whitespace and removing blank rows.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Manually edited files:</strong> 15-30% reduction if the file has accumulated blank rows and inconsistent formatting over time.
          </p>
          <p className="text-muted-foreground mb-6">
            The tool shows you exact before/after sizes so you can see the savings.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            What Stays Intact
          </h2>
          <p className="text-muted-foreground mb-4">
            Minification doesn't change your actual data. Column order, row order, and field values remain unchanged (except for trimmed whitespace). The file is functionally identical — just smaller.
          </p>
          <p className="text-muted-foreground mb-6">
            Quoted fields that need quotes (because they contain commas, quotes, or newlines) keep their quotes. Only unnecessary quoting is removed.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            CSV Minifier vs CSV Formatter
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>CSV Minifier</strong> focuses on reducing file size. It removes whitespace and blank rows aggressively.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>CSV Formatter</strong> focuses on standardizing structure. It can add quotes for RFC 4180 compliance and normalize line endings, which may actually increase file size slightly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Whitespace in values:</strong> If your data legitimately has leading or trailing spaces (like formatted addresses), minification removes them. Review output if whitespace is meaningful.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Not compression:</strong> This removes unnecessary characters but doesn't apply compression algorithms like gzip. For maximum size reduction, minify then gzip.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Will minifying break my CSV?</h3>
          <p className="text-muted-foreground mb-4">
            No. The tool only removes characters that CSV parsers ignore anyway. Your data structure and values remain intact.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this remove duplicate rows?</h3>
          <p className="text-muted-foreground mb-4">
            No. Minification only removes whitespace and formatting overhead. Use CSV Duplicate Remover to eliminate duplicate data rows.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I recover the original file?</h3>
          <p className="text-muted-foreground mb-4">
            No. Minification is destructive — whitespace is permanently removed. Keep a backup if you need the original formatting.
          </p>

          <h3 className="text-xl font-semibold mb-2">How large of files can this process?</h3>
          <p className="text-muted-foreground mb-6">
            Files up to 100MB work well in most browsers. Larger files depend on available memory. The entire file processes in your browser.
          </p>
        </div>
      </div>
    </>
  );
}
