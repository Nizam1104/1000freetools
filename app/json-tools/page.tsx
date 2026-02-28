import Link from "next/link";
import { Metadata } from "next";
import {
  FileJson,
  Code2,
  Search,
  List,
  ArrowRight,
  Copy,
  Download,
  Minimize2,
  Maximize2,
  Check,
  AlertTriangle,
  ArrowUpDown,
  Key,
  HardDrive,
  FileSpreadsheet,
  GitMerge,
  GitCompare,
  Layers,
  Shield,
  Zap,
  Lock,
  Eye,
  EyeOff,
  RefreshCcw,
  Settings,
  Terminal,
  BookOpen,
  TreeDeciduous,
  Play,
  FileCode,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Tools - Free Online JSON Utilities | 1000 Free Tools",
  description:
    "Free online JSON tools: validate, format, minify, convert, search, and analyze JSON data. All tools run in your browser—fast, secure, and privacy-focused.",
  alternates: {
    canonical: 'https://1000freetools.com/json-tools'
  },
  openGraph: {
    title: "JSON Tools - Free Online JSON Utilities",
    description:
      "Comprehensive JSON tools for developers: validator, formatter, converter, searcher, and more.",
    type: "website",
  },
};

export default function JsonToolsPage() {
  const tools = [
    // Validation & Analysis
    {
      name: "JSON Validator",
      description: "Validates JSON syntax, highlights errors with line and column numbers",
      href: "/json-tools/json-validator",
      icon: Check,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      category: "Validation"
    },
    {
      name: "JSON Schema Validator",
      description: "Validates JSON data against a provided JSON Schema",
      href: "/json-tools/json-schema-validator",
      icon: FileCode,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      category: "Validation"
    },
    {
      name: "JSON Config Validator",
      description: "Validates JSON configuration files and checks required keys",
      href: "/json-tools/json-config-validator",
      icon: Settings,
      color: "text-indigo-600",
      bgColor: "bg-indigo-600/10",
      category: "Validation"
    },
    {
      name: "JSON Linter",
      description: "Detects syntax errors, duplicate keys, trailing commas",
      href: "/json-tools/json-linter",
      icon: AlertTriangle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      category: "Validation"
    },
    {
      name: "JSON Duplicate Key Finder",
      description: "Detects duplicate keys within JSON objects",
      href: "/json-tools/json-duplicate-key-finder",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      category: "Validation"
    },
    {
      name: "JSON Empty Field Finder",
      description: "Identifies null, empty string, or missing values",
      href: "/json-tools/json-empty-field-finder",
      icon: EyeOff,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      category: "Validation"
    },
    {
      name: "JSON Depth Analyzer",
      description: "Calculates maximum nesting depth of a JSON structure",
      href: "/json-tools/json-depth-analyzer",
      icon: Layers,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      category: "Analysis"
    },
    {
      name: "JSON Key Frequency Analyzer",
      description: "Analyzes how often each key appears in JSON",
      href: "/json-tools/json-key-frequency",
      icon: Key,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      category: "Analysis"
    },
    {
      name: "JSON Array/Object Counter",
      description: "Counts arrays, objects, keys, and values",
      href: "/json-tools/json-array-object-counter",
      icon: HardDrive,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      category: "Analysis"
    },
    {
      name: "JSON Size Calculator",
      description: "Calculates JSON size in bytes, KB, MB",
      href: "/json-tools/json-size-calculator",
      icon: HardDrive,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      category: "Analysis"
    },

    // Formatting
    {
      name: "JSON Formatter/Beautifier",
      description: "Formats raw JSON into readable indented structure",
      href: "/json-tools/json-formatter-beautifier",
      icon: Maximize2,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      category: "Formatting"
    },
    {
      name: "JSON Minifier",
      description: "Removes whitespace to reduce JSON size",
      href: "/json-tools/json-minifier",
      icon: Minimize2,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      category: "Formatting"
    },
    {
      name: "JSON Pretty Print",
      description: "Converts compact JSON to human-readable format",
      href: "/json-tools/json-pretty-print",
      icon: FileJson,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      category: "Formatting"
    },
    {
      name: "JSON Sorter",
      description: "Sorts JSON keys alphabetically recursively",
      href: "/json-tools/json-sorter",
      icon: ArrowUpDown,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      category: "Formatting"
    },

    // Comparison & Diff
    {
      name: "JSON Diff Tool",
      description: "Compares two JSON objects, highlights changes",
      href: "/json-tools/json-diff",
      icon: GitCompare,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      category: "Comparison"
    },
    {
      name: "JSON Merge Tool",
      description: "Merges JSON objects with configurable strategies",
      href: "/json-tools/json-merge",
      icon: GitMerge,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
      category: "Comparison"
    },
    {
      name: "JSON Patch Generator",
      description: "Generates JSON Patch operations (RFC 6902)",
      href: "/json-tools/json-patch-generator",
      icon: FileCode,
      color: "text-lime-500",
      bgColor: "bg-lime-500/10",
      category: "Comparison"
    },

    // Transformation
    {
      name: "JSON Flatten Tool",
      description: "Flattens nested JSON into dot-notation",
      href: "/json-tools/json-flatten",
      icon: Minimize2,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      category: "Transformation"
    },
    {
      name: "JSON Unflatten Tool",
      description: "Converts flattened JSON back to nested structure",
      href: "/json-tools/json-unflatten",
      icon: Maximize2,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      category: "Transformation"
    },
    {
      name: "JSON Transformer",
      description: "Transforms JSON structure using custom rules",
      href: "/json-tools/json-transformer",
      icon: RefreshCcw,
      color: "text-fuchsia-500",
      bgColor: "bg-fuchsia-500/10",
      category: "Transformation"
    },
    {
      name: "JSON Rename Keys",
      description: "Renames JSON keys across nested structures",
      href: "/json-tools/json-rename-keys",
      icon: Code2,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      category: "Transformation"
    },
    {
      name: "JSON Remove Keys",
      description: "Removes specified keys from JSON recursively",
      href: "/json-tools/json-remove-keys",
      icon: Minimize2,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      category: "Transformation"
    },
    {
      name: "JSON Extract Sub-JSON",
      description: "Extracts nested portions based on key path",
      href: "/json-tools/json-extract-subjson",
      icon: FileJson,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      category: "Transformation"
    },

    // Query & Filter
    {
      name: "JSONPath Query Tool",
      description: "Runs JSONPath queries against JSON data",
      href: "/json-tools/jsonpath-query",
      icon: Search,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      category: "Query"
    },
    {
      name: "JMESPath Query Tool",
      description: "Executes JMESPath expressions for advanced querying",
      href: "/json-tools/jmespath-query",
      icon: Search,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      category: "Query"
    },
    {
      name: "JSON Filter Tool",
      description: "Filters JSON arrays based on conditions",
      href: "/json-tools/json-filter",
      icon: List,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      category: "Query"
    },
    {
      name: "JSON Map Reduce",
      description: "Applies map/reduce transformations on arrays",
      href: "/json-tools/json-map-reduce",
      icon: RefreshCcw,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      category: "Query"
    },
    {
      name: "JSON Key Extractor",
      description: "Extracts all unique keys from JSON",
      href: "/json-tools/json-key-extractor",
      icon: Key,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      category: "Query"
    },
    {
      name: "JSON Value Search",
      description: "Searches JSON by key or value with highlights",
      href: "/json-tools/json-value-search",
      icon: Search,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      category: "Query"
    },

    // Encoding & Security
    {
      name: "JSON Escape/Unescape",
      description: "Escapes or unescapes special characters",
      href: "/json-tools/json-escape-unescape",
      icon: Code2,
      color: "text-slate-500",
      bgColor: "bg-slate-500/10",
      category: "Encoding"
    },
    {
      name: "JSON Encode/Decode",
      description: "URL encodes and decodes JSON strings",
      href: "/json-tools/json-encode-decode",
      icon: Lock,
      color: "text-zinc-500",
      bgColor: "bg-zinc-500/10",
      category: "Encoding"
    },
    {
      name: "JSON Base64 Encode/Decode",
      description: "Encodes JSON to Base64 and decodes back",
      href: "/json-tools/json-base64",
      icon: Lock,
      color: "text-neutral-500",
      bgColor: "bg-neutral-500/10",
      category: "Encoding"
    },
    {
      name: "JSON JWT Decoder",
      description: "Decodes JWT tokens into readable JSON",
      href: "/json-tools/json-jwt-decoder",
      icon: Eye,
      color: "text-red-600",
      bgColor: "bg-red-600/10",
      category: "Security"
    },
    {
      name: "JSON Sensitive Data Masker",
      description: "Masks emails, tokens, passwords in JSON",
      href: "/json-tools/json-sensitive-data-maser",
      icon: EyeOff,
      color: "text-amber-600",
      bgColor: "bg-amber-600/10",
      category: "Security"
    },
    {
      name: "JSON Obfuscator",
      description: "Minifies and obfuscates JSON for safe sharing",
      href: "/json-tools/json-obfuscator",
      icon: Shield,
      color: "text-gray-600",
      bgColor: "bg-gray-600/10",
      category: "Security"
    },

    // Generators
    {
      name: "JSON Array Generator",
      description: "Generates JSON arrays with configurable types",
      href: "/json-tools/json-array-generator",
      icon: List,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      category: "Generator"
    },
    {
      name: "JSON Random Object Generator",
      description: "Generates random JSON objects for testing",
      href: "/json-tools/json-random-object",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-600/10",
      category: "Generator"
    },
    {
      name: "JSON API Response Generator",
      description: "Generates mock API-style JSON responses",
      href: "/json-tools/json-api-response-generator",
      icon: FileCode,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      category: "Generator"
    },
    {
      name: "JSON Pagination Generator",
      description: "Wraps JSON with pagination metadata",
      href: "/json-tools/json-pagination-generator",
      icon: List,
      color: "text-indigo-600",
      bgColor: "bg-indigo-600/10",
      category: "Generator"
    },
    {
      name: "JSON Nested Structure Generator",
      description: "Generates deeply nested JSON for stress testing",
      href: "/json-tools/json-nested-structure",
      icon: Layers,
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      category: "Generator"
    },
    {
      name: "JSON Enum Generator",
      description: "Generates JSON enums and value lists",
      href: "/json-tools/json-enum-generator",
      icon: Code2,
      color: "text-pink-600",
      bgColor: "bg-pink-600/10",
      category: "Generator"
    },
    {
      name: "JSON Date Time Generator",
      description: "Generates ISO, UTC, custom datetime values",
      href: "/json-tools/json-datetime-generator",
      icon: RefreshCcw,
      color: "text-cyan-600",
      bgColor: "bg-cyan-600/10",
      category: "Generator"
    },
    {
      name: "JSON Schema Example Generator",
      description: "Generates example JSON from JSON Schema",
      href: "/json-tools/json-schema-example-generator",
      icon: FileCode,
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10",
      category: "Generator"
    },

    // API & Code Generation
    {
      name: "JSON API Formatter",
      description: "Formats JSON API responses consistently",
      href: "/json-tools/json-api-formatter",
      icon: FileJson,
      color: "text-sky-600",
      bgColor: "bg-sky-600/10",
      category: "API"
    },
    {
      name: "JSON API Error Formatter",
      description: "Generates standardized JSON error responses",
      href: "/json-tools/json-api-error-formatter",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-600/10",
      category: "API"
    },
    {
      name: "JSON to Fetch Code Generator",
      description: "Generates JavaScript fetch API code",
      href: "/json-tools/json-fetch-code-generator",
      icon: Terminal,
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
      category: "Code Gen"
    },
    {
      name: "JSON to Axios Code Generator",
      description: "Generates Axios request code snippets",
      href: "/json-tools/json-axios-code-generator",
      icon: Terminal,
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      category: "Code Gen"
    },
    {
      name: "JSON to GraphQL Input",
      description: "Converts JSON to GraphQL input syntax",
      href: "/json-tools/json-to-graphql",
      icon: Code2,
      color: "text-pink-600",
      bgColor: "bg-pink-600/10",
      category: "Code Gen"
    },
    {
      name: "JSON to SQL Insert",
      description: "Generates SQL INSERT statements from JSON",
      href: "/json-tools/json-to-sql-insert",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      category: "Code Gen"
    },
    {
      name: "JSON to MongoDB",
      description: "Converts JSON to MongoDB document format",
      href: "/json-tools/json-to-mongodb",
      icon: Database,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      category: "Code Gen"
    },

    // Config & Conversion
    {
      name: "JSON Env Converter",
      description: "Converts JSON config to .env format",
      href: "/json-tools/json-env-converter",
      icon: Settings,
      color: "text-amber-600",
      bgColor: "bg-amber-600/10",
      category: "Conversion"
    },
    {
      name: "JSON to CSV",
      description: "Converts JSON arrays to CSV format",
      href: "/json-tools/json-to-csv",
      icon: FileSpreadsheet,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      category: "Conversion"
    },
    {
      name: "CSV to JSON",
      description: "Parses CSV and converts to JSON",
      href: "/json-tools/csv-to-json",
      icon: FileJson,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to XML",
      description: "Transforms JSON to XML structure",
      href: "/json-tools/json-to-xml",
      icon: Code2,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      category: "Conversion"
    },
    {
      name: "XML to JSON",
      description: "Parses XML and converts to JSON",
      href: "/json-tools/xml-to-json",
      icon: Code2,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to YAML",
      description: "Converts JSON to YAML format",
      href: "/json-tools/json-to-yaml",
      icon: List,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to TypeScript",
      description: "Generates TypeScript interfaces from JSON",
      href: "/json-tools/json-to-typescript",
      icon: FileCode,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to JavaScript",
      description: "Converts JSON to JavaScript objects",
      href: "/json-tools/json-to-javascript",
      icon: FileCode,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Python",
      description: "Converts JSON to Python dictionaries",
      href: "/json-tools/json-to-python",
      icon: FileCode,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Java",
      description: "Generates Java classes from JSON",
      href: "/json-tools/json-to-java",
      icon: FileCode,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Go",
      description: "Generates Go structs from JSON",
      href: "/json-tools/json-to-go",
      icon: FileCode,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to PHP",
      description: "Converts JSON to PHP arrays",
      href: "/json-tools/json-to-php",
      icon: FileCode,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to C#",
      description: "Generates C# classes from JSON",
      href: "/json-tools/json-to-csharp",
      icon: FileCode,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Kotlin",
      description: "Generates Kotlin data classes from JSON",
      href: "/json-tools/json-to-kotlin",
      icon: FileCode,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Swift",
      description: "Generates Swift structs from JSON",
      href: "/json-tools/json-to-swift",
      icon: FileCode,
      color: "text-red-600",
      bgColor: "bg-red-600/10",
      category: "Conversion"
    },
    {
      name: "JSON to Markdown Table",
      description: "Converts JSON arrays to Markdown tables",
      href: "/json-tools/json-to-markdown-table",
      icon: List,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to TSV",
      description: "Converts JSON to tab-separated values",
      href: "/json-tools/json-to-tsv",
      icon: FileSpreadsheet,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Text",
      description: "Extracts text content from JSON",
      href: "/json-tools/json-to-text",
      icon: FileCode,
      color: "text-slate-500",
      bgColor: "bg-slate-500/10",
      category: "Conversion"
    },
    {
      name: "JSON to Excel",
      description: "Converts JSON to Excel format",
      href: "/json-tools/json-to-excel",
      icon: FileSpreadsheet,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      category: "Conversion"
    },

    // Educational & Visualization
    {
      name: "JSON Explainer",
      description: "Explains JSON structure in plain language",
      href: "/json-tools/json-explainer",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      category: "Educational"
    },
    {
      name: "JSON Error Explanation",
      description: "Explains JSON parsing errors and fixes",
      href: "/json-tools/json-error-explanation",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-600/10",
      category: "Educational"
    },
    {
      name: "JSON Structure Visualizer",
      description: "Visualizes JSON as interactive tree",
      href: "/json-tools/json-structure-visualizer",
      icon: TreeDeciduous,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      category: "Educational"
    },
    {
      name: "JSON Step by Step Parser",
      description: "Shows JSON parsing token by token",
      href: "/json-tools/json-step-by-step-parser",
      icon: Play,
      color: "text-purple-600",
      bgColor: "bg-purple-600/10",
      category: "Educational"
    },
    {
      name: "JSON Playground",
      description: "Live editor with instant formatting",
      href: "/json-tools/json-playground",
      icon: Play,
      color: "text-pink-600",
      bgColor: "bg-pink-600/10",
      category: "Educational"
    },
    {
      name: "JSON Viewer",
      description: "Tree view with expand/collapse, search",
      href: "/json-tools/json-viewer",
      icon: Eye,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
      category: "Educational"
    },
  ];

  const categories = Array.from(new Set(tools.map(t => t.category))).sort();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FileJson className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            JSON Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {tools.length}+ free online JSON utilities for developers. Validate, format, convert,
            search, and analyze JSON data—all in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#tools"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md"
            >
              Browse Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Use Our JSON Tools?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Processing</h3>
              <p className="text-muted-foreground">
                All tools run in your browser for immediate results
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">
                Your JSON data never leaves your device
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Copy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy & Download</h3>
              <p className="text-muted-foreground">
                Easily copy results or download as files
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Always Free</h3>
              <p className="text-muted-foreground">
                No registration, no limits, completely free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid by Category */}
      <section id="tools" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            All JSON Tools
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A comprehensive suite of {tools.length} JSON utilities organized by category
          </p>

          {categories.map(category => {
            const categoryTools = tools.filter(t => t.category === category);
            return (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        href={tool.href}
                        key={tool.name}
                        className="block p-6 border border-border rounded-lg bg-card hover:border-primary hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${tool.bgColor}`}>
                            <Icon className={`h-6 w-6 ${tool.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">API Development</h3>
              <p className="text-muted-foreground text-sm">
                Validate and format JSON responses from APIs, convert between
                formats for different integrations.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Data Migration</h3>
              <p className="text-muted-foreground text-sm">
                Convert JSON to CSV, XML, or other formats for data migration
                between systems.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Debugging</h3>
              <p className="text-muted-foreground text-sm">
                Find syntax errors, duplicate keys, and structural issues in
                JSON data quickly.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Data Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Extract keys, search values, and analyze JSON structure for
                better understanding.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Configuration</h3>
              <p className="text-muted-foreground text-sm">
                Convert between JSON, YAML, and XML for different configuration
                file formats.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-3">Testing</h3>
              <p className="text-muted-foreground text-sm">
                Generate mock data, random objects, and test payloads for
                development and QA.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Database({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  );
}
