import CsvSampleGenerator from "@/components/csv-tools/csv-sample-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV Sample Generator - Extract Random Samples from CSV Files",
  description:
    "Extract random samples from large CSV files. Sample by count or percentage with stratified sampling option. Free online CSV sampling tool.",
  openGraph: {
    title: "CSV Sample Generator - Extract Random Samples from CSV Files",
    description:
      "Extract random or stratified samples from CSV files.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-sample-generator",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV Sample Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Extract random samples from CSV files. Sample by row count 
            or percentage with optional stratified sampling.
          </p>
        </div>

        <CsvSampleGenerator />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Tool Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool extracts a random sample of rows from your CSV file. Choose a fixed number of rows (e.g., 100 rows) or a percentage (e.g., 10% of all rows). Optional stratified sampling ensures the sample maintains the same distribution as the original data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Sampling Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Fixed count:</strong> Extract exactly N random rows. Useful when you need a specific sample size.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Percentage:</strong> Extract X% of all rows. Useful when you want a proportional sample.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Stratified sampling:</strong> Maintain the same distribution of values in a selected column. If 30% of your data is "Active", 30% of the sample will be "Active".
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Seed value:</strong> Set a seed for reproducible random sampling. Same seed = same sample every time.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Random Sample
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV (1000 rows):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`id,name,status,score
1,Alice,Active,85
2,Bob,Inactive,72
... (998 more rows)
1000,Zoe,Active,91`}
          </pre>
          <p className="text-muted-foreground mb-4">Sample: 10% (100 rows)</p>
          <p className="text-muted-foreground mb-4">Output CSV (100 random rows):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`id,name,status,score
23,Carol,Active,88
156,David,Inactive,65
... (98 more rows)
892,Eve,Active,79`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Example: Stratified Sample
          </h2>
          <p className="text-muted-foreground mb-4">Input distribution:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`Status distribution:
Active:   600 rows (60%)
Inactive: 300 rows (30%)
Pending:  100 rows (10%)`}
          </pre>
          <p className="text-muted-foreground mb-4">Stratified sample (100 rows):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Status distribution in sample:
Active:   60 rows (60%)
Inactive: 30 rows (30%)
Pending:  10 rows (10%)`}
          </pre>
          <p className="text-muted-foreground mb-6">
            The sample preserves the original distribution.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use This
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Quick data exploration:</strong> Sample a large file to understand its structure before full processing.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Testing:</strong> Create smaller test datasets from production data for development environments.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Statistical analysis:</strong> Work with a manageable sample when the full dataset is too large.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Machine learning:</strong> Create training/test splits from your data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Quality assurance:</strong> Randomly sample records for manual review or audit.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Simple Random vs Stratified
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Simple random sampling:</strong> Every row has equal chance of selection. Fast and simple, but may not represent rare categories well.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Stratified sampling:</strong> Ensures each group is proportionally represented. Better for analysis where group distribution matters.
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Example: Fraud detection dataset
- 99% legitimate transactions
- 1% fraudulent transactions

Simple random sample of 100: May have 0-2 fraud cases
Stratified sample of 100: Exactly 1 fraud case (1%)`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Sample Size Guidelines
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>For exploration:</strong> 100-1000 rows usually sufficient to understand structure.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>For testing:</strong> Match your typical production batch size.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>For analysis:</strong> Larger samples give more accurate results. 10% is common for large datasets.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>For rare events:</strong> Use stratified sampling or ensure sample is large enough to capture rare cases.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Reproducible Sampling
          </h2>
          <p className="text-muted-foreground mb-4">
            Use the seed option for reproducible samples:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`Seed: 42 → Same 100 rows every time
Seed: (empty) → Different random sample each run`}
          </pre>
          <p className="text-muted-foreground mb-6">
            Useful for tests and analyses that need consistent data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Large files:</strong> The entire file loads into memory. Files over 100MB may cause slow performance.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Very small samples:</strong> Sampling 1 row from 1 million may not be truly random due to algorithm limitations.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Stratified with many groups:</strong> If the stratification column has many unique values, some groups may have too few rows for proper sampling.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Is the sampling truly random?</h3>
          <p className="text-muted-foreground mb-4">
            The tool uses a seeded random number generator. Without a seed, each run produces different results. With a seed, results are reproducible.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I sample without replacement?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Each row can only be selected once. You won't get duplicate rows in your sample.
          </p>

          <h3 className="text-xl font-semibold mb-2">What if I request more rows than exist?</h3>
          <p className="text-muted-foreground mb-6">
            The tool returns all available rows if you request more than exist. No error is thrown.
          </p>
        </div>
      </div>
    </>
  );
}
