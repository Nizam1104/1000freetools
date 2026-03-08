import CsvEmailExtractor from "@/components/csv-tools/csv-email-extractor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Email Extractor - Extract Valid Email Addresses from CSV Files",
  description:
    "Extract all valid email addresses from CSV files. Filter by domain, deduplicate, and validate email format. Free online CSV email extraction tool.",
  openGraph: {
    title: "CSV Email Extractor - Extract Valid Email Addresses from CSV Files",
    description:
      "Extract and validate email addresses from CSV files with domain filtering.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-email-extractor",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Email Extractor
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Extract all valid email addresses from CSV files. 
            Filter by domain, deduplicate, and validate email format.
          </p>
        </div>

        <CsvEmailExtractor />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool scans all columns in your CSV file and extracts valid email addresses. It validates email format using regex, optionally deduplicates results, filters by domain, and provides statistics on extracted emails. Export as a simple list or CSV format.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Extraction Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Deduplicate emails:</strong> Remove duplicate email addresses. Each unique email appears only once.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Validate email format:</strong> Only extract emails matching standard email format (user@domain.com).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Include only specific domain:</strong> Extract only emails from a specific domain (e.g., "@gmail.com", "@company.com").
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Exclude domains:</strong> Filter out emails from specific domains (e.g., exclude "@gmail.com, @yahoo.com" to get only business emails).
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Output format:</strong> Choose between simple list (one email per line) or CSV with metadata.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Extraction
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,contact,notes
Alice,alice@example.com,Primary contact
Bob,bob@gmail.com,Secondary
Charlie,invalid-email,Not valid
Diana,diana@example.com,CEO
Eve,eve@example.com,CTO`}
          </pre>
          <p className="text-muted-foreground mb-4">Extract with validation, deduplication:</p>
          <p className="text-muted-foreground mb-4">Output (list format):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`alice@example.com
bob@gmail.com
diana@example.com
eve@example.com`}
          </pre>
          <p className="text-muted-foreground mb-6">
            "invalid-email" was excluded (invalid format). 4 valid emails extracted.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Domain Filtering
          </h2>
          <p className="text-muted-foreground mb-4">Same input, include only "@example.com":</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`alice@example.com
diana@example.com
eve@example.com`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Gmail address excluded. Only company domain emails extracted.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Marketing list building:</strong> Extract email addresses from customer databases for campaign targeting.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Contact consolidation:</strong> Gather all emails from scattered data into a single mailing list.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Lead qualification:</strong> Filter emails by domain to separate business leads from personal emails.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data cleaning:</strong> Identify and extract valid emails from messy contact data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Compliance auditing:</strong> Review what email addresses are stored in your databases.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Email Validation
          </h2>
          <p className="text-muted-foreground mb-4">
            The tool validates emails against standard format:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Valid formats:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`user@domain.com
user.name@domain.co.uk
user+tag@domain.org
user_name@subdomain.domain.com`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>Invalid formats:</strong>
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`invalid-email (no @)
@domain.com (no local part)
user@ (no domain)
user@domain (no TLD)
user name@domain.com (space in local part)`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Note: Validation checks format only, not whether the email actually exists.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Statistics Provided
          </h2>
          <p className="text-muted-foreground mb-4">
            After extraction, see:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Extraction Results:
- Total emails found: 1,247
- Valid emails: 1,180
- Invalid emails: 67
- Unique emails: 1,053
- Duplicate emails removed: 127

Top domains:
- gmail.com: 423 (36%)
- yahoo.com: 215 (18%)
- company.com: 180 (15%)
- outlook.com: 142 (12%)
- Other: 220 (19%)`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Domain Filtering Tips
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Include single domain:</strong> Enter "@company.com" to get only company emails.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Exclude free providers:</strong> Enter "@gmail.com, @yahoo.com, @hotmail.com, @outlook.com" to get only business emails.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Multiple domains:</strong> Separate multiple domains with commas.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Case insensitive:</strong> Domain matching is case-insensitive. "@Gmail.com" matches "@gmail.com".
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Output Formats
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>List format:</strong> One email per line. Best for copying into email tools or simple text files.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`alice@example.com
bob@example.com
charlie@example.com`}
          </pre>
          <p className="text-muted-foreground mb-4">
            <strong>CSV format:</strong> Includes metadata like source row and validation status.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`email,valid,source_row
alice@example.com,true,5
bob@example.com,true,12
charlie@example.com,true,18`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Format validation only:</strong> This tool checks email format, not whether addresses actually exist or can receive mail.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> Works best with files under 50MB. Very large files may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Embedded emails:</strong> Emails must be in recognizable format. Obfuscated emails (e.g., "alice at example dot com") won't be detected.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this verify if emails are real?</h3>
          <p className="text-muted-foreground mb-4">
            No. This tool only validates email format. It doesn't check if the email address actually exists or can receive mail.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I extract emails from specific columns only?</h3>
          <p className="text-muted-foreground mb-4">
            This tool scans all columns. For specific columns, extract them first using CSV Column Extractor.
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I handle international email addresses?</h3>
          <p className="text-muted-foreground mb-6">
            The validator supports standard ASCII email addresses. International domains (IDN) with non-ASCII characters may not be fully supported.
          </p>
        </div>
      </div>
    </>
  );
}
