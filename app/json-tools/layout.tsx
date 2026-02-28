import { Metadata } from "next";

interface JsonToolPageProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const toolMetadata: Record<string, { h1: string; p: string }> = {
  "csv-to-json": {
    h1: "CSV to JSON Converter – Free Online Tool",
    p: "Convert CSV files or pasted text into structured JSON objects or arrays in seconds. Our free CSV to JSON Converter handles headers automatically and supports any delimiter.",
  },
  "jmespath-query": {
    h1: "JMESPath Query Tool – Run JMESPath Online",
    p: "Execute JMESPath expressions on JSON for advanced filtering, projection, and transformation. Our free JMESPath tool is ideal for AWS CLI users and developers working with complex JSON.",
  },
  "json-api-error-formatter": {
    h1: "JSON API Error Formatter – Standard Error Responses",
    p: "Generate standardized JSON error response objects for REST APIs. Our free JSON API Error Formatter ensures consistent error formats with proper codes, messages, and details.",
  },
  "json-api-formatter": {
    h1: "JSON API Formatter – Standardize API Responses",
    p: "Format JSON API responses into a consistent, readable structure following best practices. Our free JSON API Formatter helps teams maintain uniform response formats across all endpoints.",
  },
  "json-api-response-generator": {
    h1: "JSON API Response Generator – Mock API Responses",
    p: "Generate realistic mock API JSON responses with status codes, data payloads, and pagination. Our free tool speeds up frontend development and API testing without a live backend.",
  },
  "json-array-generator": {
    h1: "JSON Array Generator – Generate JSON Arrays Online",
    p: "Generate JSON arrays with configurable length, types, and value ranges instantly. Our free JSON Array Generator is ideal for creating test data, mock datasets, and demos.",
  },
  "json-array-object-counter": {
    h1: "JSON Array & Object Counter Online",
    p: "Count all arrays, objects, keys, and values inside any JSON structure. Our free JSON Counter gives you a quick statistical overview of your JSON data composition.",
  },
  "json-axios-code-generator": {
    h1: "JSON to Axios Code Generator Online",
    p: "Generate Axios request code from JSON input with proper headers, methods, and body. Our free JSON to Axios generator helps developers scaffold HTTP calls in seconds.",
  },
  "json-base64": {
    h1: "JSON Base64 Encoder & Decoder Online",
    p: "Encode JSON to Base64 or decode Base64 strings back to JSON instantly. Our free tool is essential for handling JWT tokens, API payloads, and data transport encoding.",
  },
  "json-config-validator": {
    h1: "JSON Config File Validator Online",
    p: "Validate JSON configuration files and check for required keys and correct structure. Our free JSON Config Validator helps prevent misconfiguration errors before deployment.",
  },
  "json-datetime-generator": {
    h1: "JSON Date Time Generator – Generate Timestamps",
    p: "Generate ISO 8601, UTC, and custom formatted date-time values in JSON. Our free JSON Date Time Generator is perfect for mocking timestamps in test data and API responses.",
  },
  "json-depth-analyzer": {
    h1: "JSON Depth Analyzer – Check Nesting Depth",
    p: "Calculate the maximum nesting depth of any JSON structure instantly. Our free JSON Depth Analyzer helps developers understand complexity and avoid deeply nested data issues.",
  },
  "json-diff": {
    h1: "JSON Diff Tool – Compare Two JSON Objects",
    p: "Compare two JSON objects side by side and highlight added, removed, and changed fields instantly. Our free JSON Diff Tool makes reviewing API response changes and config diffs easy.",
  },
  "json-duplicate-key-finder": {
    h1: "JSON Duplicate Key Finder – Detect Duplicate Keys",
    p: "Find and flag duplicate keys in JSON objects that could cause silent data loss. Our free JSON Duplicate Key Finder helps you write cleaner, safer, and more reliable JSON.",
  },
  "json-empty-field-finder": {
    h1: "JSON Empty Field Finder – Find Null & Empty Values",
    p: "Identify null, empty string, and missing values in your JSON data instantly. Our free JSON Empty Field Finder helps you clean datasets and ensure data completeness.",
  },
  "json-encode-decode": {
    h1: "JSON Encode & Decode Tool Online",
    p: "Safely encode and decode JSON strings for transport or storage. Our free JSON Encode Decode Tool handles special characters and ensures your data survives serialization correctly.",
  },
  "json-enum-generator": {
    h1: "JSON Enum Generator – Generate JSON Enums Online",
    p: "Generate JSON enums and allowed value lists for schema design and documentation. Our free JSON Enum Generator helps standardize field values across your API and data models.",
  },
  "json-env-converter": {
    h1: "JSON to .env Converter – Export Config as ENV",
    p: "Convert JSON configuration objects into .env key-value format instantly. Our free JSON Env Converter makes it easy to migrate app settings between JSON configs and environment variables.",
  },
  "json-error-explanation": {
    h1: "JSON Error Explainer – Fix JSON Errors Online",
    p: "Get clear, plain-language explanations of JSON parsing errors and how to fix them. Our free JSON Error Explanation Tool helps developers and beginners debug invalid JSON fast.",
  },
  "json-escape-unescape": {
    h1: "JSON Escape & Unescape Tool Online",
    p: "Escape or unescape special characters in JSON strings instantly. Our free JSON Escape Unescape Tool ensures your strings are safe for storage, APIs, and code embedding.",
  },
  "json-explainer": {
    h1: "JSON Explainer – Understand JSON in Plain English",
    p: "Understand any JSON structure explained in simple, human-readable language. Our free JSON Explainer is perfect for beginners, non-developers, and anyone learning to work with JSON.",
  },
  "json-extract-subjson": {
    h1: "JSON Extract Tool – Extract Nested JSON by Path",
    p: "Extract a specific nested portion of JSON using a key path. Our free JSON Extract Sub-JSON Tool helps you isolate exactly the data you need from large, complex JSON documents.",
  },
  "json-fetch-code-generator": {
    h1: "JSON to Fetch Code Generator – Generate JS Fetch",
    p: "Generate JavaScript Fetch API code snippets from JSON request definitions. Our free tool saves development time by auto-generating ready-to-use HTTP request code.",
  },
  "json-filter": {
    h1: "JSON Filter Tool – Filter JSON Arrays Online",
    p: "Filter JSON arrays based on conditions like equals, contains, and range. Our free JSON Filter Tool lets you extract exactly the data you need without writing any code.",
  },
  "json-flatten": {
    h1: "JSON Flatten Tool – Flatten Nested JSON Online",
    p: "Flatten deeply nested JSON into simple dot-notation key-value pairs. Our free JSON Flatten Tool makes complex data easier to process, store, and analyze in flat systems.",
  },
  "json-formatter-beautifier": {
    h1: "JSON Formatter & Beautifier Online",
    p: "Format and beautify raw JSON instantly with our free online JSON Formatter. Customize indentation, collapse nodes, and download clean, readable JSON in one click.",
  },
  "json-jwt-decoder": {
    h1: "JWT Decoder – Decode JWT Tokens Online",
    p: "Decode JWT headers and payloads into readable JSON without signature verification. Our free JWT Decoder is the fastest way to inspect token claims during development and debugging.",
  },
  "json-key-extractor": {
    h1: "JSON Key Extractor – Extract All JSON Keys",
    p: "Extract every unique key from any JSON object or array with one click. Our free JSON Key Extractor outputs a clean list of all keys for quick analysis and mapping.",
  },
  "json-key-frequency": {
    h1: "JSON Key Frequency Analyzer Online",
    p: "Analyze how often each key appears across your JSON dataset. Our free JSON Key Frequency Analyzer is perfect for auditing API responses, datasets, and log files at scale.",
  },
  "json-linter": {
    h1: "JSON Linter – Detect JSON Errors Online",
    p: "Lint your JSON to catch syntax errors, duplicate keys, trailing commas, and structural issues. Our free JSON Linter helps you write clean and standards-compliant JSON.",
  },
  "json-map-reduce": {
    h1: "JSON Map Reduce Tool – Transform JSON Arrays",
    p: "Apply map and reduce style transformations to JSON arrays online. Our free JSON Map Reduce Tool helps developers test data transformations quickly without a full code setup.",
  },
  "json-merge": {
    h1: "JSON Merge Tool – Combine JSON Objects Online",
    p: "Merge multiple JSON objects using configurable merge strategies. Our free JSON Merge Tool handles deep merges, overwrites, and conflict resolution for complex data structures.",
  },
  "json-minifier": {
    h1: "JSON Minifier – Compress JSON Online",
    p: "Minify JSON by removing whitespace and line breaks to reduce file size. Free online JSON Minifier that preserves validity while optimizing your data for production.",
  },
  "json-nested-structure": {
    h1: "JSON Nested Structure Generator Online",
    p: "Generate deeply nested JSON structures for stress testing parsers, UIs, and APIs. Our free tool lets you configure nesting depth and breadth to simulate complex real-world data.",
  },
  "json-obfuscator": {
    h1: "JSON Obfuscator – Obfuscate JSON Online",
    p: "Minify and obfuscate JSON keys and values for safer sharing and publishing. Our free JSON Obfuscator helps protect data structure and logic from casual inspection.",
  },
  "json-pagination-generator": {
    h1: "JSON Pagination Generator – Add Pagination to JSON",
    p: "Wrap JSON data with standard pagination metadata including page, limit, and total count. Our free JSON Pagination Generator helps you quickly prototype paginated API responses.",
  },
  "json-patch-generator": {
    h1: "JSON Patch Generator – Generate Patch Operations",
    p: "Generate RFC 6902 JSON Patch operations to transform one JSON document into another. Our free tool is ideal for versioning APIs and tracking incremental JSON changes.",
  },
  "json-playground": {
    h1: "JSON Playground – Live JSON Editor Online",
    p: "Edit JSON in a live interactive playground and see formatted output instantly. Our free JSON Playground is the perfect environment for experimenting, learning, and testing JSON.",
  },
  "json-pretty-print": {
    h1: "JSON Pretty Print – Readable JSON Formatter",
    p: "Pretty print JSON with customizable indentation for maximum readability. Convert compact, hard-to-read JSON into clean, human-friendly formatted output instantly.",
  },
  "json-random-object": {
    h1: "Random JSON Object Generator Online",
    p: "Generate random JSON objects for testing, prototyping, and demos in seconds. Our free JSON Random Object Generator lets you customize fields, types, and nesting depth.",
  },
  "json-remove-keys": {
    h1: "JSON Remove Keys Tool – Delete JSON Keys Online",
    p: "Remove specified keys from JSON objects recursively with a single click. Our free JSON Remove Keys Tool is perfect for sanitizing API responses and stripping sensitive fields.",
  },
  "json-rename-keys": {
    h1: "JSON Rename Keys Tool – Rename JSON Keys Online",
    p: "Rename selected keys across nested JSON structures in bulk. Our free JSON Rename Keys Tool makes API response normalization and data migration fast and error-free.",
  },
  "json-schema-example-generator": {
    h1: "JSON Schema Example Generator Online",
    p: "Generate realistic example JSON data from any JSON Schema definition instantly. Our free tool helps developers test schema validation and create accurate mock data for their APIs.",
  },
  "json-schema-validator": {
    h1: "JSON Schema Validator – Validate Against Schema",
    p: "Validate JSON data against any JSON Schema and get detailed error reports. Our free JSON Schema Validator ensures your data conforms to expected types and structures.",
  },
  "json-sensitive-data-maser": {
    h1: "JSON Sensitive Data Masker – Mask JSON Fields",
    p: "Mask sensitive fields like emails, passwords, and API tokens in JSON data. Our free JSON Sensitive Data Masker makes it safe to share logs and API responses without exposing private information.",
  },
  "json-size-calculator": {
    h1: "JSON Size Calculator – Check JSON File Size",
    p: "Calculate the exact size of your JSON in bytes, KB, and MB. Compare minified vs formatted size instantly with our free JSON Size Calculator to optimize data transfer.",
  },
  "json-sorter": {
    h1: "JSON Sorter – Sort JSON Keys Alphabetically",
    p: "Sort JSON object keys alphabetically in ascending or descending order recursively. Free online JSON Sorter keeps your values intact while organizing your data cleanly.",
  },
  "json-step-by-step-parser": {
    h1: "JSON Step-by-Step Parser – Learn JSON Parsing",
    p: "See how JSON is parsed token by token in a visual, step-by-step walkthrough. Our free JSON Step by Step Parser is the ideal learning tool for understanding JSON structure and syntax.",
  },
  "json-stringify-parse": {
    h1: "JSON Stringify & Parse Playground Online",
    p: "Experiment with JSON.stringify and JSON.parse options interactively in your browser. Our free playground is perfect for learning JSON serialization and testing edge cases in JavaScript.",
  },
  "json-structure-visualizer": {
    h1: "JSON Structure Visualizer – Visualize JSON as Tree",
    p: "Visualize JSON data as an interactive tree or graph for better understanding. Our free JSON Structure Visualizer makes it easy to explore and present complex JSON hierarchies.",
  },
  "json-to-csharp": {
    h1: "JSON to C# Class Generator – Free Online",
    p: "Generate C# model classes with correct data types from any JSON input. Our free JSON to C# converter streamlines .NET development by eliminating manual class creation.",
  },
  "json-to-csv": {
    h1: "JSON to CSV Converter – Free Online Tool",
    p: "Convert JSON arrays to CSV format instantly with automatic header detection and custom delimiter options. Export structured JSON data into spreadsheet-ready CSV files for free.",
  },
  "json-to-excel": {
    h1: "JSON to Excel Converter – Export JSON to XLSX",
    p: "Export JSON data directly to Excel XLSX format using client-side generation. Our free JSON to Excel Converter requires no uploads — your data stays private in your browser.",
  },
  "json-to-go": {
    h1: "JSON to Go Struct Generator Online",
    p: "Generate Go structs with proper json tags from JSON input instantly. Our free JSON to Go converter helps Golang developers scaffold data models fast and accurately.",
  },
  "json-to-graphql": {
    h1: "JSON to GraphQL Input Converter Online",
    p: "Convert JSON objects into GraphQL input type syntax instantly. Our free JSON to GraphQL tool helps developers bridge REST JSON data with GraphQL schemas quickly.",
  },
  "json-to-java": {
    h1: "JSON to Java POJO Generator Online",
    p: "Generate Java POJO classes with fields, getters, and setters directly from JSON. Our free JSON to Java converter speeds up backend development and reduces boilerplate code.",
  },
  "json-to-javascript": {
    h1: "JSON to JavaScript Object Converter",
    p: "Convert JSON into properly formatted JavaScript object notation instantly. Our free tool is ideal for developers embedding JSON data directly into JavaScript or Node.js code.",
  },
  "json-to-kotlin": {
    h1: "JSON to Kotlin Data Class Generator",
    p: "Generate Kotlin data classes with nullable and non-nullable fields from JSON. Our free tool helps Android and Kotlin developers create accurate data models in seconds.",
  },
  "json-to-markdown-table": {
    h1: "JSON to Markdown Table Converter Online",
    p: "Convert JSON arrays into formatted Markdown tables with headers and column alignment. Perfect for documentation, README files, and GitHub wikis — free and instant.",
  },
  "json-to-mongodb": {
    h1: "JSON to MongoDB Document Converter Online",
    p: "Convert JSON into MongoDB-compatible document format with proper types and structure. Our free tool helps developers prepare JSON data for insertion into MongoDB collections.",
  },
  "json-to-php": {
    h1: "JSON to PHP Array Converter – Free Online",
    p: "Convert JSON into PHP associative array syntax instantly. Our free JSON to PHP Array tool makes it easy to use JSON data directly in your PHP scripts and applications.",
  },
  "json-to-python": {
    h1: "JSON to Python Dictionary Converter",
    p: "Convert JSON into Python dictionary syntax instantly. Our free JSON to Python Dict tool helps developers quickly translate JSON data into Python-ready code.",
  },
  "json-to-sql-insert": {
    h1: "JSON to SQL INSERT Statement Generator",
    p: "Generate SQL INSERT statements from JSON arrays automatically. Our free JSON to SQL tool makes importing JSON data into relational databases fast and error-free.",
  },
  "json-to-swift": {
    h1: "JSON to Swift Struct Generator Online",
    p: "Generate Swift structs conforming to Codable protocol from JSON. Our free JSON to Swift converter is perfect for iOS developers building type-safe data models quickly.",
  },
  "json-to-text": {
    h1: "JSON to Plain Text Converter Online",
    p: "Flatten JSON into readable plain text key-value pairs for reports, logs, or documentation. Our free JSON to Text Converter makes complex JSON data human-readable in seconds.",
  },
  "json-to-tsv": {
    h1: "JSON to TSV Converter – Tab-Separated Values",
    p: "Convert JSON arrays into tab-separated values (TSF) for easy spreadsheet and database import. Free online JSON to TSV Converter with instant preview and download support.",
  },
  "json-to-typescript": {
    h1: "JSON to TypeScript Interface Generator",
    p: "Generate TypeScript interfaces from JSON automatically, including optional fields and nested types. Save hours of manual typing with our free JSON to TypeScript converter.",
  },
  "json-to-xml": {
    h1: "JSON to XML Converter – Transform JSON Online",
    p: "Convert JSON to XML with configurable root element and attribute handling. Our free JSON to XML Converter produces valid, well-structured XML from any JSON input.",
  },
  "json-to-yaml": {
    h1: "JSON to YAML Converter – Free Online Tool",
    p: "Convert JSON to YAML with clean indentation and human-readable syntax. Our free JSON to YAML Converter is perfect for configuration files, CI/CD pipelines, and DevOps workflows.",
  },
  "json-transformer": {
    h1: "JSON Transformer – Reshape JSON Structures Online",
    p: "Transform JSON structure using user-defined rules and key mappings. Our free JSON Transformer is perfect for reshaping API responses to match your application's data model.",
  },
  "json-unflatten": {
    h1: "JSON Unflatten Tool – Restore Nested Structure",
    p: "Convert flattened dot-notation JSON back into a fully nested JSON structure. Our free JSON Unflatten Tool reverses flattening to restore your original data hierarchy.",
  },
  "json-validator": {
    h1: "JSON Validator – Validate JSON Online Free",
    p: "Validate JSON syntax instantly with our free online JSON Validator. Get precise error messages with line and column numbers to debug and fix malformed JSON fast.",
  },
  "json-value-search": {
    h1: "JSON Search & Filter Tool Online",
    p: "Search and filter JSON data by key or value with real-time highlight support. Quickly locate matching nodes inside large, complex JSON structures without manual scanning.",
  },
  "json-viewer": {
    h1: "JSON Viewer – Interactive Tree View Online",
    p: "View JSON data in a clean interactive tree with expand/collapse, search, and raw toggle. Our free JSON Viewer makes exploring complex JSON structures effortless.",
  },
  "jsonpath-query": {
    h1: "JSONPath Query Tool – Run JSONPath Online",
    p: "Execute JSONPath expressions against JSON data and view matching results instantly. Our free JSONPath Query Tool is perfect for testing queries before integrating them in code.",
  },
  "xml-to-json": {
    h1: "XML to JSON Converter – Free Online Tool",
    p: "Parse and convert XML into clean, structured JSON while preserving full hierarchy. Our free XML to JSON Converter handles nested elements, attributes, and complex XML documents.",
  },
  "yaml-to-json": {
    h1: "YAML to JSON Converter – Free Online Tool",
    p: "Parse YAML and convert it into valid JSON instantly. Our free YAML to JSON Converter supports multi-line strings, anchors, and complex YAML structures for seamless transformation.",
  },
};

/**
 * Generate static params for all JSON tool pages.
 * This ensures Next.js pre-renders every tool page at build time
 * with proper SEO metadata for Google crawlers.
 */
export function generateStaticParams() {
  return Object.keys(toolMetadata).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: JsonToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolMetadata[slug];

  if (!tool) {
    return {
      title: "JSON Tool",
      description: "Free online JSON tool",
      alternates: {
        canonical: `https://1000freetools.com/json-tools/${slug}`,
      },
    };
  }

  return {
    title: tool.h1,
    description: tool.p,
    alternates: {
      canonical: `https://1000freetools.com/json-tools/${slug}`,
    },
    openGraph: {
      title: tool.h1,
      description: tool.p,
      type: "website",
      locale: "en_US",
      url: `https://1000freetools.com/json-tools/${slug}`,
      siteName: "1000 Free Tools",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.h1,
      description: tool.p,
    },
  };
}

export default function JsonToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
