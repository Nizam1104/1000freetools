import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Faqs from "@/components/utils/Faqs";
import Script from "next/script";
import Link from "next/link";
import { FileType, ArrowRight } from "lucide-react";

const tomlTools = [
  {
    name: "CSV to TOML Converter",
    description: "Convert CSV data to TOML format",
    href: "/toml-tools/csv-to-toml-converter",
  },
  {
    name: "ENV to TOML Converter",
    description: "Convert .env files to TOML configuration",
    href: "/toml-tools/env-to-toml-converter",
  },
  {
    name: "INI to TOML Converter",
    description: "Convert INI files to TOML format",
    href: "/toml-tools/ini-to-toml-converter",
  },
  {
    name: "JSON to TOML Converter",
    description: "Convert JSON objects to TOML format",
    href: "/toml-tools/json-to-toml-converter",
  },
  {
    name: "Properties to TOML Converter",
    description: "Convert Java properties files to TOML",
    href: "/toml-tools/properties-to-toml-converter",
  },
  {
    name: "TOML Beautifier/Formatter",
    description: "Format and beautify TOML files",
    href: "/toml-tools/toml-beautifier-formatter",
  },
  {
    name: "TOML Comment Remover",
    description: "Remove comments from TOML files",
    href: "/toml-tools/toml-comment-remover",
  },
  {
    name: "TOML Diff/Compare",
    description: "Compare two TOML files and highlight differences",
    href: "/toml-tools/toml-diff-compare",
  },
  {
    name: "TOML Key/Value Extractor",
    description: "Extract specific keys or values from TOML",
    href: "/toml-tools/toml-key-value-extractor",
  },
  {
    name: "TOML Merge Tool",
    description: "Merge multiple TOML files into one",
    href: "/toml-tools/toml-merge-tool",
  },
  {
    name: "TOML Minifier/Compressor",
    description: "Minify TOML by removing whitespace and comments",
    href: "/toml-tools/toml-minifier-compressor",
  },
  {
    name: "TOML Schema Generator/Validator",
    description: "Generate or validate TOML schemas",
    href: "/toml-tools/toml-schema-generator-validator",
  },
  {
    name: "TOML to C# Class Generator",
    description: "Generate C# classes from TOML structure",
    href: "/toml-tools/toml-to-csharp-class-generator",
  },
  {
    name: "TOML to CSV Converter",
    description: "Convert TOML data to CSV format",
    href: "/toml-tools/toml-to-csv-converter",
  },
  {
    name: "TOML to ENV Converter",
    description: "Convert TOML to .env file format",
    href: "/toml-tools/toml-to-env-converter",
  },
  {
    name: "TOML to Go Struct Converter",
    description: "Generate Go structs from TOML",
    href: "/toml-tools/toml-to-go-struct-converter",
  },
  {
    name: "TOML to INI Converter",
    description: "Convert TOML to INI format",
    href: "/toml-tools/toml-to-ini-converter",
  },
  {
    name: "TOML to Java Properties Converter",
    description: "Convert TOML to Java properties format",
    href: "/toml-tools/toml-to-java-properties-converter",
  },
  {
    name: "TOML to JavaScript Object Converter",
    description: "Convert TOML to JavaScript objects",
    href: "/toml-tools/toml-to-javascript-object-converter",
  },
  {
    name: "TOML to JSON Converter",
    description: "Convert TOML to JSON format",
    href: "/toml-tools/toml-to-json-converter",
  },
  {
    name: "TOML to Markdown Table Converter",
    description: "Convert TOML to Markdown tables",
    href: "/toml-tools/toml-to-markdown-table-converter",
  },
  {
    name: "TOML to PHP Array Converter",
    description: "Convert TOML to PHP arrays",
    href: "/toml-tools/toml-to-php-array-converter",
  },
  {
    name: "TOML to Properties Converter",
    description: "Convert TOML to Java properties",
    href: "/toml-tools/toml-to-properties-converter",
  },
  {
    name: "TOML to Python Dictionary Converter",
    description: "Convert TOML to Python dictionaries",
    href: "/toml-tools/toml-to-python-dictionary-converter",
  },
  {
    name: "TOML to Ruby Hash Converter",
    description: "Convert TOML to Ruby hashes",
    href: "/toml-tools/toml-to-ruby-hash-converter",
  },
  {
    name: "TOML to Rust Struct Generator",
    description: "Generate Rust structs from TOML",
    href: "/toml-tools/toml-to-rust-struct-generator",
  },
  {
    name: "TOML to SQL Converter",
    description: "Convert TOML data to SQL INSERT statements",
    href: "/toml-tools/toml-to-sql-converter",
  },
  {
    name: "TOML to TypeScript Interface Generator",
    description: "Generate TypeScript interfaces from TOML",
    href: "/toml-tools/toml-to-typescript-interface-generator",
  },
  {
    name: "TOML to XML Converter",
    description: "Convert TOML to XML format",
    href: "/toml-tools/toml-to-xml-converter",
  },
  {
    name: "TOML to YAML Converter",
    description: "Convert TOML to YAML format",
    href: "/toml-tools/toml-to-yaml-converter",
  },
  {
    name: "TOML Validator/Linter",
    description: "Validate TOML syntax and structure",
    href: "/toml-tools/toml-validator-linter",
  },
  {
    name: "XML to TOML Converter",
    description: "Convert XML to TOML format",
    href: "/toml-tools/xml-to-toml-converter",
  },
  {
    name: "YAML to TOML Converter",
    description: "Convert YAML to TOML format",
    href: "/toml-tools/yaml-to-toml-converter",
  },
];

export const metadata: Metadata = {
  title: "Free TOML Tools Online - 33 TOML Converter & Editor Tools",
  description:
    "Free online TOML tools for converting, editing, and validating TOML configuration files. Convert TOML to JSON, YAML, XML and more. All tools run in your browser.",
  openGraph: {
    title: "Free TOML Tools Online - 33 TOML Converter & Editor Tools",
    description:
      "Free online TOML tools for converting, editing, and validating TOML configuration files. Convert TOML to JSON, YAML, XML and more. All tools run in your browser.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/toml-tools",
  },
};

export default function TomlToolsPage() {
  const faqsData = [
    {
      question: "Are these TOML tools really free?",
      answer:
        "Yes. All 33 TOML tools are completely free — no registration, no paywalls, no usage limits. Use them as often as you need.",
    },
    {
      question: "Is my TOML data private and secure?",
      answer:
        "All processing happens in your browser using JavaScript. Your TOML data never leaves your device or gets uploaded to any server.",
    },
    {
      question: "What is TOML used for?",
      answer:
        "TOML (Tom's Obvious, Minimal Language) is a configuration file format designed for readability. It's commonly used for Rust Cargo packages, Python Poetry, Hugo static sites, and other applications needing human-readable configuration.",
    },
    {
      question: "Can I use these tools offline?",
      answer:
        "Once the page loads, all tools work offline since processing happens locally. You need internet only to load the initial page.",
    },
    {
      question: "How does TOML compare to JSON or YAML?",
      answer:
        "TOML is more readable than JSON for configuration (no trailing commas, comments allowed). It's more explicit than YAML (no indentation sensitivity, clearer types). Each format has its place — TOML excels at configuration files.",
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
              <FileType className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Free TOML Tools
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Free online TOML tools for converting, editing, and validating TOML configuration files.
              Convert TOML to JSON, YAML, XML — all in your browser.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Available Tools
          </h2>
          <ToolLinkCards tools={tomlTools} />
        </section>

        {/* More Tools Link */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Need More Config Tools?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our YAML tools or JSON tools for more configuration utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yaml-tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                YAML Tools
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
              What These TOML Tools Do
            </h2>
            <p className="text-muted-foreground mb-6">
              This is a collection of 33 free TOML tools that run entirely in your browser. No software installation, no server uploads, no waiting. You paste TOML content or upload files, click a button, and get results instantly.
            </p>
            <p className="text-muted-foreground mb-6">
              The tools cover four main workflows: converting TOML to other formats (JSON, YAML, XML, programming language structures), converting other formats to TOML (JSON, YAML, INI, CSV, ENV), editing and validating TOML (formatter, minifier, validator, diff), and extracting or merging TOML data.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              How to Use These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              Most tools follow the same pattern:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Paste your TOML content or upload a .toml file</li>
              <li>Select the conversion or operation type</li>
              <li>Adjust settings like indentation or type inference</li>
              <li>Copy the result or download as a file</li>
            </ol>
            <p className="text-muted-foreground mb-6">
              Everything happens client-side using JavaScript TOML parsers. Your data stays in your browser tab and never touches any server.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Who Uses These Tools
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Rust developers</strong> work with Cargo.toml files, generate Rust structs from configuration, or convert between dependency formats.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Python developers</strong> use TOML for Poetry configuration, convert requirements.txt to TOML, or generate Python dictionaries from TOML.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>DevOps engineers</strong> convert configuration between formats (JSON, YAML, INI, TOML), validate configuration files, or merge configurations from multiple sources.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Web developers</strong> work with Hugo static site configuration, convert theme settings between formats, or generate TypeScript interfaces from configuration schemas.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Tool Categories
            </h2>

            <h3 className="text-xl font-semibold mb-3">Format Conversion to TOML</h3>
            <p className="text-muted-foreground mb-4">
              JSON to TOML, YAML to TOML, XML to TOML, INI to TOML, CSV to TOML, ENV to TOML, and Properties to TOML converters transform various formats into TOML structure.
            </p>

            <h3 className="text-xl font-semibold mb-3">TOML to Data Formats</h3>
            <p className="text-muted-foreground mb-4">
              TOML to JSON, TOML to YAML, TOML to XML, TOML to CSV, TOML to INI, TOML to Properties, TOML to ENV, TOML to Markdown Table converters transform TOML to other data formats.
            </p>

            <h3 className="text-xl font-semibold mb-3">TOML to Code Generation</h3>
            <p className="text-muted-foreground mb-4">
              TOML to Go Struct, TOML to Rust Struct, TOML to TypeScript Interface, TOML to C# Class, TOML to PHP Array, TOML to Python Dictionary, TOML to Ruby Hash, TOML to JavaScript Object, TOML to Java Properties converters generate code from TOML.
            </p>

            <h3 className="text-xl font-semibold mb-3">TOML to SQL</h3>
            <p className="text-muted-foreground mb-4">
              TOML to SQL Converter generates INSERT statements from TOML data for database seeding.
            </p>

            <h3 className="text-xl font-semibold mb-3">TOML Editing</h3>
            <p className="text-muted-foreground mb-4">
              TOML Beautifier/Formatter indents and formats TOML. TOML Minifier/Compressor removes whitespace. TOML Comment Remover strips comments. TOML Merge Tool combines multiple files.
            </p>

            <h3 className="text-xl font-semibold mb-3">TOML Validation</h3>
            <p className="text-muted-foreground mb-4">
              TOML Validator/Linter checks syntax. TOML Schema Generator/Validator validates structure. TOML Diff/Compare highlights differences. TOML Key/Value Extractor pulls specific data.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Limitations and Gotchas
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>TOML spec versions:</strong> TOML 1.0 is current standard. Some tools may not support all TOML 1.0 features like inline tables or arrays of tables.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Type inference:</strong> Converting from untyped formats (JSON without schema) may infer incorrect types. Review generated code before use.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Nested structures:</strong> Deep nesting may not convert cleanly to flat formats like INI or ENV. Complex tables may require manual adjustment.
            </p>
            <p className="text-muted-foreground mb-6">
              <strong>Code generation:</strong> Generated structs and interfaces are starting points. You may need to add validation, methods, or custom fields.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              Why 1000freetools
            </h2>
            <p className="text-muted-foreground mb-6">
              TOML tools often mean installing language-specific packages, writing conversion scripts, or using command-line tools. But sometimes you need to quickly convert a Cargo.toml to JSON, validate a Hugo config, or generate a Go struct from TOML. These tools exist because configuration shouldn't require a build process. Everything runs in your browser — no installation, no dependencies, no friction.
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
