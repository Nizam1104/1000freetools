import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { FileCode, ArrowRight } from "lucide-react";

const yamlTools = [
  {
    name: "CSV to YAML Converter",
    description: "Convert CSV data to YAML format",
    href: "/yaml-tools/csv-to-yaml-converter",
  },
  {
    name: "INI to YAML Converter",
    description: "Convert INI files to YAML format",
    href: "/yaml-tools/ini-to-yaml-converter",
  },
  {
    name: "JSON to YAML Converter",
    description: "Convert JSON objects to YAML format",
    href: "/yaml-tools/json-to-yaml-converter",
  },
  {
    name: "Properties to YAML Converter",
    description: "Convert Java properties files to YAML",
    href: "/yaml-tools/properties-to-yaml-converter",
  },
  {
    name: "TOML to YAML Converter",
    description: "Convert TOML configuration to YAML",
    href: "/yaml-tools/toml-to-yaml-converter",
  },
  {
    name: "XML to YAML Converter",
    description: "Convert XML to YAML format",
    href: "/yaml-tools/xml-to-yaml-converter",
  },
  {
    name: "YAML Comment Remover",
    description: "Remove comments from YAML files",
    href: "/yaml-tools/yaml-comment-remover",
  },
  {
    name: "YAML Diff Checker",
    description: "Compare two YAML files and highlight differences",
    href: "/yaml-tools/yaml-diff-checker",
  },
  {
    name: "YAML Editor",
    description: "Edit YAML files with syntax highlighting",
    href: "/yaml-tools/yaml-editor",
  },
  {
    name: "YAML Escape/Unescape",
    description: "Escape or unescape special characters in YAML",
    href: "/yaml-tools/yaml-escape-unescape",
  },
  {
    name: "YAML Formatter/Beautifier",
    description: "Format and beautify YAML files",
    href: "/yaml-tools/yaml-formatter-beautifier",
  },
  {
    name: "YAML Key Sorter",
    description: "Sort YAML keys alphabetically",
    href: "/yaml-tools/yaml-key-sorter",
  },
  {
    name: "YAML Linter",
    description: "Validate YAML syntax and style",
    href: "/yaml-tools/yaml-linter",
  },
  {
    name: "YAML Merge Tool",
    description: "Merge multiple YAML files into one",
    href: "/yaml-tools/yaml-merge-tool",
  },
  {
    name: "YAML Minifier/Compressor",
    description: "Minify YAML by removing whitespace and comments",
    href: "/yaml-tools/yaml-minifier-compressor",
  },
  {
    name: "YAML Prettifier (Custom)",
    description: "Format YAML with custom indentation rules",
    href: "/yaml-tools/yaml-prettifier-custom",
  },
  {
    name: "YAML Schema Validator",
    description: "Validate YAML against JSON Schema",
    href: "/yaml-tools/yaml-schema-validator",
  },
  {
    name: "YAML to CSV Converter",
    description: "Convert YAML data to CSV format",
    href: "/yaml-tools/yaml-to-csv-converter",
  },
  {
    name: "YAML to ENV Converter",
    description: "Convert YAML to .env file format",
    href: "/yaml-tools/yaml-to-env-converter",
  },
  {
    name: "YAML to Go Struct",
    description: "Generate Go structs from YAML",
    href: "/yaml-tools/yaml-to-go-struct",
  },
  {
    name: "YAML to Graphviz DOT",
    description: "Convert YAML to Graphviz DOT diagrams",
    href: "/yaml-tools/yaml-to-graphviz-dot",
  },
  {
    name: "YAML to HTML Table",
    description: "Convert YAML to HTML tables",
    href: "/yaml-tools/yaml-to-html-table",
  },
  {
    name: "YAML to INI Converter",
    description: "Convert YAML to INI format",
    href: "/yaml-tools/yaml-to-ini-converter",
  },
  {
    name: "YAML to JSON Converter",
    description: "Convert YAML to JSON format",
    href: "/yaml-tools/yaml-to-json-converter",
  },
  {
    name: "YAML to Markdown Table",
    description: "Convert YAML to Markdown tables",
    href: "/yaml-tools/yaml-to-markdown-table",
  },
  {
    name: "YAML to Properties Converter",
    description: "Convert YAML to Java properties",
    href: "/yaml-tools/yaml-to-properties-converter",
  },
  {
    name: "YAML to Python Dict",
    description: "Convert YAML to Python dictionaries",
    href: "/yaml-tools/yaml-to-python-dict",
  },
  {
    name: "YAML to SQL Insert",
    description: "Convert YAML to SQL INSERT statements",
    href: "/yaml-tools/yaml-to-sql-insert",
  },
  {
    name: "YAML to TOML Converter",
    description: "Convert YAML to TOML format",
    href: "/yaml-tools/yaml-to-toml-converter",
  },
  {
    name: "YAML to XML Converter",
    description: "Convert YAML to XML format",
    href: "/yaml-tools/yaml-to-xml-converter",
  },
  {
    name: "YAML Validator",
    description: "Validate YAML syntax and structure",
    href: "/yaml-tools/yaml-validator",
  },
  {
    name: "YAML Version Converter",
    description: "Convert between YAML 1.1 and YAML 1.2",
    href: "/yaml-tools/yaml-version-converter",
  },
];

export const metadata: Metadata = {
  title: "Free YAML Tools Online - 32 YAML Converter & Editor Tools",
  description:
    "Free online YAML tools for converting, editing, and validating YAML files. Convert YAML to JSON, XML, CSV and more. All tools run in your browser.",
  openGraph: {
    title: "Free YAML Tools Online - 32 YAML Converter & Editor Tools",
    description:
      "Free online YAML tools for converting, editing, and validating YAML files. Convert YAML to JSON, XML, CSV and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/yaml-tools",
  },
};

export default function YamlToolsPage() {
  const faqsData = [
    {
      question: "Are these YAML tools really free?",
      answer:
        "Yes. All 32 YAML tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my YAML data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your YAML data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What is YAML used for?",
      answer:
        "YAML is commonly used for configuration files (Docker Compose, Kubernetes, GitHub Actions, Ansible), data serialization, and settings files. Its human-readable format makes it popular for DevOps and development workflows.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "What's the difference between YAML 1.1 and 1.2?",
      answer:
        "YAML 1.2 fixed ambiguities in 1.1, especially around type inference. For example, 'on' and 'off' are booleans in 1.1 but strings in 1.2. The Version Converter tool helps migrate between versions.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <FileCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free YAML Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online YAML tools for converting, editing, and validating YAML files.
              Convert YAML to JSON, XML, CSV — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={yamlTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Config Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our JSON tools or TOML tools for more configuration utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/json-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                JSON Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/explore-all-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                Browse All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Main SEO Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              What These YAML Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 32 free YAML tools that run entirely in your browser. No software installation, no server uploads, no waiting. You paste YAML content or upload files, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting YAML to other formats (JSON, XML, CSV, TOML, code structures), converting other formats to YAML (JSON, XML, CSV, INI, TOML, Properties), editing and validating YAML (formatter, linter, validator, diff), and transforming YAML data (merge, sort keys, minify).
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your YAML content or upload a .yaml/.yml file</li>
              <li>Select the conversion or operation type</li>
              <li>Adjust settings like indentation or type handling</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript YAML parsers. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>DevOps engineers</strong> work with Kubernetes manifests, Docker Compose files, GitHub Actions workflows, and Ansible playbooks — all YAML-based.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Developers</strong> convert configuration between formats, validate CI/CD pipelines, or generate code structures from YAML schemas.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Data engineers</strong> transform YAML data to CSV for analysis, convert to SQL for database imports, or merge configurations from multiple sources.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Technical writers</strong> convert YAML to Markdown tables for documentation, format YAML for readability, or validate documentation configuration files.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Format Conversion to YAML</h3>
            <p className="text-muted-foreground mb-4">
              JSON to YAML, XML to YAML, TOML to YAML, CSV to YAML, INI to YAML, and Properties to YAML converters transform various formats into YAML structure.
            </p>

            <h3 className="text-xl font-semibold mb-3">YAML to Data Formats</h3>
            <p className="text-muted-foreground mb-4">
              YAML to JSON, YAML to XML, YAML to TOML, YAML to CSV, YAML to INI, YAML to Properties, YAML to ENV, YAML to HTML Table, YAML to Markdown Table converters transform YAML to other data formats.
            </p>

            <h3 className="text-xl font-semibold mb-3">YAML to Code Generation</h3>
            <p className="text-muted-foreground mb-4">
              YAML to Go Struct generates Go types. YAML to Python Dict creates Python dictionaries. YAML to SQL Insert produces database INSERT statements. YAML to Graphviz DOT creates visual diagrams.
            </p>

            <h3 className="text-xl font-semibold mb-3">YAML Editing</h3>
            <p className="text-muted-foreground mb-4">
              YAML Editor provides syntax highlighting. YAML Formatter/Beautifier indents properly. YAML Minifier/Compressor removes whitespace. YAML Comment Remover strips comments. YAML Merge Tool combines files. YAML Key Sorter alphabetizes keys. YAML Prettifier applies custom formatting.
            </p>

            <h3 className="text-xl font-semibold mb-3">YAML Validation</h3>
            <p className="text-muted-foreground mb-4">
              YAML Validator checks syntax. YAML Linter validates style. YAML Schema Validator checks against JSON Schema. YAML Diff Checker highlights differences. YAML Escape/Unescape handles special characters. YAML Version Converter migrates between 1.1 and 1.2.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>YAML indentation:</strong> YAML is indentation-sensitive. Incorrect spacing causes parse errors. Use 2-space indentation consistently.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Type inference:</strong> YAML 1.1 infers types from values ('on' = true, '1' = integer). YAML 1.2 is stricter. Use quotes for strings that look like other types.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Anchors and aliases:</strong> YAML anchors (&) and aliases (*) may not convert cleanly to formats like JSON that don't support references.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Multi-document YAML:</strong> Some tools process only the first document in multi-document YAML (separated by ---). Split files if needed.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              YAML tools often mean installing Python packages, using command-line utilities, or relying on IDE plugins. But sometimes you need to quickly convert a Kubernetes manifest to JSON, validate a GitHub Actions workflow, or merge Docker Compose files. These tools exist because configuration shouldn't require a virtual environment. Everything runs in your browser — no installation, no dependencies, no friction.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 mb-12">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Faqs faqs={faqsData} />
        </section>
      </div>
    </>
  );
}
