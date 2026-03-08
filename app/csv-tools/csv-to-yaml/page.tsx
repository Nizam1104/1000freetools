import CsvToYaml from "@/components/csv-tools/csv-to-yaml";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to YAML Converter - Convert CSV to YAML List with Type Inference",
  description:
    "Convert CSV files to YAML format with type inference and configurable indentation. Free online CSV to YAML converter for configuration files.",
  openGraph: {
    title: "CSV to YAML Converter - Convert CSV to YAML List with Type Inference",
    description:
      "Convert CSV to YAML with type inference and configurable indentation.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/csv-tools/csv-to-yaml",
  },
};

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            CSV to YAML Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Convert CSV data to YAML list of mappings. Supports type inference 
            and configurable indentation for clean, readable output.
          </p>
        </div>

        <CsvToYaml />

        <div className="prose max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            What This Converter Does
          </h2>
          <p className="text-muted-foreground mb-6">
            This tool transforms CSV data into YAML format. Each CSV row becomes a YAML mapping (dictionary), and all rows form a YAML list. Options include automatic type inference for numbers and booleans, plus configurable indentation (2, 4, or 8 spaces).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Example Conversion
          </h2>
          <p className="text-muted-foreground mb-4">Input CSV:</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-4">
{`name,age,active,role
Alice,30,true,admin
Bob,25,false,user
Charlie,35,true,moderator`}
          </pre>
          <p className="text-muted-foreground mb-4">Output YAML (with type inference):</p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm mb-6">
{`- name: Alice
  age: 30
  active: true
  role: admin
- name: Bob
  age: 25
  active: false
  role: user
- name: Charlie
  age: 35
  active: true
  role: moderator`}
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Conversion Options
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Type inference:</strong> Automatically converts values to appropriate YAML types. "30" becomes 30 (integer), "true" becomes true (boolean), empty cells become null.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Indentation:</strong> Choose 2, 4, or 8 spaces for nested indentation. 2 spaces is YAML convention and produces more compact output.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>String escaping:</strong> Special characters in values are properly quoted and escaped for valid YAML syntax.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            When to Use YAML
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Configuration files:</strong> YAML is popular for app configuration (Docker Compose, Kubernetes, GitHub Actions, Ansible).
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Static site generators:</strong> Jekyll, Hugo, and Gatsby use YAML for front matter and data files.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>CI/CD pipelines:</strong> GitHub Actions, GitLab CI, and CircleCI use YAML for workflow definitions.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Data serialization:</strong> YAML is more human-readable than JSON for configuration and data that humans edit.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Infrastructure as code:</strong> Terraform, CloudFormation, and other IaC tools often use YAML for resource definitions.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Type Inference Details
          </h2>
          <p className="text-muted-foreground mb-4">
            When enabled, the converter analyzes each value:
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Integers:</strong> "42", "-17", "0" become YAML integers.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Floats:</strong> "3.14", "-0.5", "1.5e10" become YAML floats.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Booleans:</strong> "true", "false", "yes", "no" (case-insensitive) become YAML booleans.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Null:</strong> Empty cells, "null", "NULL", "~" become YAML null.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>Strings:</strong> Everything else stays quoted or unquoted as appropriate for YAML syntax.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            YAML vs JSON for Configuration
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>YAML advantages:</strong> More readable (no braces or quotes needed for simple values), supports comments, cleaner for nested structures.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>JSON advantages:</strong> Universally supported, stricter syntax (less ambiguity), faster to parse programmatically.
          </p>
          <p className="text-muted-foreground mb-6">
            Use YAML when humans will read or edit the file. Use JSON when the file is primarily for machine consumption.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Limitations
          </h2>
          <p className="text-muted-foreground mb-4">
            <strong>Flat structure only:</strong> CSV is flat, so output is a list of flat mappings. Nested YAML structures require manual editing after conversion.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Complex types:</strong> YAML supports anchors, aliases, and multi-line strings. These aren't generated from simple CSV data.
          </p>
          <p className="text-muted-foreground mb-6">
            <strong>File size:</strong> Works best with files under 20MB. Large files may cause slow performance in the browser.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <h3 className="text-xl font-semibold mb-2">Does this handle special characters in values?</h3>
          <p className="text-muted-foreground mb-4">
            Yes. Values containing colons, quotes, or other YAML-special characters are properly quoted and escaped.
          </p>

          <h3 className="text-xl font-semibold mb-2">Can I convert YAML back to CSV?</h3>
          <p className="text-muted-foreground mb-4">
            This tool only converts CSV to YAML. For YAML to CSV, you'd need a separate tool or script that flattens YAML structures.
          </p>

          <h3 className="text-xl font-semibold mb-2">What indentation should I use?</h3>
          <p className="text-muted-foreground mb-4">
            2 spaces is the YAML community standard and produces the most compact output. 4 spaces is more readable for deeply nested structures.
          </p>

          <h3 className="text-xl font-semibold mb-2">Does this preserve UTF-8 encoding?</h3>
          <p className="text-muted-foreground mb-6">
            Yes. Output is UTF-8 encoded, preserving accented characters, emojis, and non-Latin scripts.
          </p>
        </div>
      </div>
    </>
  );
}
