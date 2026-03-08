import CsvRandomRowGenerator from "@/components/csv-tools/csv-random-row-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Random Row Generator - Generate Fake Test Data with Configurable Columns",
  description:
    "Generate realistic fake CSV data with configurable column types: names, emails, dates, numbers, booleans, UUIDs. Free online CSV test data generator.",
  openGraph: {
    title: "CSV Random Row Generator - Generate Fake Test Data",
    description:
      "Generate realistic fake CSV data for testing and development.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-random-row-generator",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        

        <CsvRandomRowGenerator />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool generates fake but realistic CSV data for testing and development. Define your columns with different data types, specify how many rows you need, and get a CSV file with synthetic data. Perfect for populating test databases, testing imports, or creating sample datasets.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Column Types
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Name:</strong> Generates realistic first and last names (e.g., "Alice Johnson", "Bob Smith").
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Email:</strong> Creates valid email addresses (e.g., "john.doe@example.com"). Configurable domain.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Date:</strong> Random dates within a specified range. Configurable format (YYYY-MM-DD, MM/DD/YYYY, etc.).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Number:</strong> Random integers or decimals within min/max range. Configurable decimal places.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Boolean:</strong> Random true/false values. Configurable probability (e.g., 70% true, 30% false).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>UUID:</strong> Generates unique UUIDs (e.g., "550e8400-e29b-41d4-a716-446655440000").
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Custom list:</strong> Random selection from your own list of values (e.g., ["Active", "Inactive", "Pending"]).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Generated Data
          </h2>
          <p className="text-muted-foreground mb-4">Configuration:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Columns:
- id: UUID
- name: Name
- email: Email (domain: example.com)
- signup_date: Date (2023-01-01 to 2024-12-31)
- age: Number (18-65)
- active: Boolean (80% true)
- status: Custom ["Active", "Inactive", "Pending"]

Rows: 5`}
          </pre>
          <p className="text-muted-foreground mb-4">Generated CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,name,email,signup_date,age,active,status
a1b2c3d4-...,Alice Johnson,alice.johnson@example.com,2023-05-15,34,true,Active
e5f6g7h8-...,Bob Smith,bob.smith@example.com,2024-02-28,28,true,Inactive
i9j0k1l2-...,Carol White,carol.white@example.com,2023-11-03,45,false,Pending
m3n4o5p6-...,David Brown,david.brown@example.com,2024-06-20,52,true,Active
q7r8s9t0-...,Eve Davis,eve.davis@example.com,2023-08-12,23,true,Active`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Database seeding:</strong> Populate development and test databases with realistic data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>API testing:</strong> Create test payloads for API development and testing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Performance testing:</strong> Generate large datasets to test system performance under load.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Demo environments:</strong> Create sample data for product demos and screenshots.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Import testing:</strong> Test CSV import functionality without using real customer data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Privacy compliance:</strong> Use fake data instead of production data for development (GDPR, HIPAA compliance).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Configuration Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Row count:</strong> Generate 1 to 10,000 rows. Larger counts for performance testing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Seed value:</strong> Set a seed for reproducible random data. Same seed = same generated data.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Email domain:</strong> Specify the domain for generated emails (e.g., "test.com", "example.org").
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Date range:</strong> Set start and end dates for random date generation.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Number range:</strong> Configure min, max, and decimal places for numeric columns.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Boolean probability:</strong> Set the percentage of true vs false values.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Reproducible Data
          </h2>
          <p className="text-muted-foreground mb-4">
            Use the seed option for reproducible random data:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Seed: 12345 → Same 100 rows every time
Seed: 67890 → Different but consistent 100 rows`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Useful for tests that need consistent data across runs.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Not cryptographically secure:</strong> Generated data is random but not suitable for security purposes.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Limited name variety:</strong> Name generation uses a predefined list. May not represent all cultures.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Maximum rows:</strong> Limited to 10,000 rows per generation. For larger datasets, generate in batches.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Is the generated data realistic?</h3>
          <p className="text-muted-foreground mb-4">
            Names, emails, and dates look realistic but are completely fake. No real people or companies are represented.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I export to formats other than CSV?</h3>
          <p className="text-muted-foreground mb-4">
            This tool generates CSV only. Convert to JSON, SQL, or other formats using other tools in this suite.
          </p>

          <h3 className="text-xl font-semibold mb-2">How do I generate more than 10,000 rows?</h3>
          <p className="text-muted-foreground mb-6">
            Generate multiple batches with different seeds and merge them using CSV File Merger.
          </p>
        </div>
      </div>
    </>
  );
}
