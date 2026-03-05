"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Wrench } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms" },
];

const toolsByCategory = [
  {
    categoryName: "Image Tools",
    tools: [
      {
        name: "Image Compressor",
        description:
          "Compress images online - reduce file size while maintaining quality",
        href: "/image-tools/image-compressor",
      },
      {
        name: "Image Editor",
        description: "Edit images online with powerful editing tools",
        href: "/image-tools/image-editor",
      },
      {
        name: "Pick Color Code from Image",
        description:
          "Extract color codes from images - get HEX, RGB, HSL values",
        href: "/image-tools/pick-color-code-from-image",
      },
      {
        name: "Image Format Conversions",
        description:
          "Convert images between different formats - JPEG, PNG, WebP, AVIF and more",
        href: "/image-tools/image-format-conversions",
      },
      {
        name: "Background Remover",
        description: "Remove background from images automatically",
        href: "/image-tools/background-remover",
      },
      {
        name: "Image to GIF",
        description: "Convert images to animated GIF format",
        href: "/image-tools/image-to-gif",
      },
      {
        name: "Image Filters",
        description: "Apply beautiful filters and effects to your images",
        href: "/image-tools/image-filters",
      },
      {
        name: "Crop Image",
        description: "Crop images to your desired size and aspect ratio",
        href: "/image-tools/crop-image",
      },
      {
        name: "Sharpen Image",
        description: "Enhance image sharpness and clarity online",
        href: "/image-tools/sharpen-image",
      },
      {
        name: "Resize Image Dimensions",
        description: "Resize images by changing width and height dimensions",
        href: "/image-tools/resize-image-dimensions",
      },
      {
        name: "Image to PDF",
        description: "Convert images to PDF documents",
        href: "/image-tools/image-to-pdf",
      },
      {
        name: "Add Watermark on Image",
        description: "Add text or image watermarks to protect your photos",
        href: "/image-tools/add-watermark-on-image",
      },
      {
        name: "Blur Image",
        description: "Apply blur effect to images or specific areas",
        href: "/image-tools/blur-image",
      },
    ],
  },
  {
    categoryName: "Design Tools",
    tools: [
      { name: "Favicon Generator", href: "/design-tools/favicon-generator" },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: [
      {
        name: "Mock Data Generator",
        href: "/developer-tools/mock-data-generator",
      },
      {
        name: "Javascript Online Playground",
        href: "/developer-tools/js-online-compiler",
      },
    ],
  },
  {
    categoryName: "Video Tools",
    tools: [
      {
        name: "Video Compressor",
        description: "Compress videos online - reduce file size, No size limit",
        href: "/video-tools/video-compressor",
      },
      {
        name: "Video MetaData Viewer",
        description: "See Video or Audio files metadata",
        href: "/video-tools/video-metadata-viewer",
      },
      {
        name: "Video Player",
        description: "Play any video file format instantly, Supports subtitles",
        href: "/video-tools/video-player",
      },
      {
        name: "Video Format Converter",
        description:
          "Convert between video formats, Supports wide range of video formats",
        href: "/video-tools/video-format-converter",
      },
      {
        name: "Change Video FPS",
        description:
          "Change video frame rate to 24fps, 30fps, 60fps or custom FPS",
        href: "/video-tools/change-video-fps",
      },
      {
        name: "Crop Video",
        description: "Crop videos online - remove unwanted edges and reframe",
        href: "/video-tools/crop-video",
      },
      {
        name: "Enhance Video Quality",
        description: "Upscale, sharpen, denoise and improve video quality",
        href: "/video-tools/enhance-video-quality",
      },
      {
        name: "Extract Audio from Video",
        description:
          "Extract audio from video files - save as MP3, AAC, or WAV",
        href: "/video-tools/extract-audio-from-video",
      },
      {
        name: "Resize Video Dimensions",
        description: "Resize video to 4K, 1080p, 720p or custom dimensions",
        href: "/video-tools/resize-video-dimensions",
      },
      {
        name: "Rotate Video",
        description: "Rotate videos 90°, 180° or 270° - fix orientation",
        href: "/video-tools/rotate-video",
      },
      {
        name: "Video Color Space Transformation",
        description: "Adjust brightness, contrast, saturation, hue and more",
        href: "/video-tools/video-color-space-transformation",
      },
      {
        name: "Video Grayscale",
        description: "Convert videos to black and white instantly",
        href: "/video-tools/video-grayscale",
      },
      {
        name: "Video Overlays",
        description: "Add watermarks, logos or image overlays to videos",
        href: "/video-tools/video-overlays",
      },
      {
        name: "Video Transparency Maker",
        description:
          "Adjust video opacity and transparency with custom background",
        href: "/video-tools/video-transparency-maker",
      },
    ],
  },
  {
    categoryName: "JSON Tools",
    tools: [
      {
        name: "JSON Formatter / Beautifier",
        description:
          "Formats raw JSON into a readable, indented structure with configurable spacing, collapsible nodes, and copy/download support.",
        href: "/json-tools/json-formatter-beautifier",
      },
      {
        name: "JSON Minifier",
        description:
          "Removes whitespace, line breaks, and unnecessary characters to reduce JSON size while preserving validity.",
        href: "/json-tools/json-minifier",
      },
      {
        name: "JSON Validator",
        description:
          "Validates JSON syntax, highlights errors with line and column numbers, and explains parsing issues.",
        href: "/json-tools/json-validator",
      },
      {
        name: "JSON Viewer",
        description:
          "Displays JSON in a tree view with expand/collapse, search, and raw view toggle.",
        href: "/json-tools/json-viewer",
      },
      {
        name: "JSON Pretty Print",
        description:
          "Converts compact JSON into human-readable formatted output with customizable indentation.",
        href: "/json-tools/json-pretty-print",
      },
      {
        name: "JSON Linter",
        description:
          "Detects syntax errors, duplicate keys, trailing commas, and structural issues in JSON.",
        href: "/json-tools/json-linter",
      },
      {
        name: "JSON Sorter",
        description:
          "Sorts JSON object keys alphabetically (A–Z or Z–A) recursively while keeping values intact.",
        href: "/json-tools/json-sorter",
      },
      {
        name: "JSON Key Extractor",
        description:
          "Extracts all unique keys from a JSON object or array and outputs them as a list.",
        href: "/json-tools/json-key-extractor",
      },
      {
        name: "JSON Value Search / Filter",
        description:
          "Searches JSON by key or value and filters matching nodes with highlight support.",
        href: "/json-tools/json-value-search",
      },
      {
        name: "JSON Size Calculator",
        description:
          "Calculates the size of JSON data in bytes, KB, and MB, with minified vs formatted comparison.",
        href: "/json-tools/json-size-calculator",
      },
      {
        name: "JSON to CSV Converter",
        description:
          "Converts JSON arrays into CSV format with header detection and delimiter options.",
        href: "/json-tools/json-to-csv",
      },
      {
        name: "CSV to JSON Converter",
        description:
          "Parses CSV files or text and converts them into structured JSON objects or arrays.",
        href: "/json-tools/csv-to-json",
      },
      {
        name: "JSON to XML Converter",
        description:
          "Transforms JSON into equivalent XML structure with configurable root and attribute handling.",
        href: "/json-tools/json-to-xml",
      },
      {
        name: "XML to JSON Converter",
        description:
          "Parses XML input and converts it into JSON while preserving hierarchy.",
        href: "/json-tools/xml-to-json",
      },
      {
        name: "JSON to YAML Converter",
        description:
          "Converts JSON into YAML format with clean indentation and readable syntax.",
        href: "/json-tools/json-to-yaml",
      },
      {
        name: "YAML to JSON Converter",
        description: "Parses YAML input and converts it into valid JSON.",
        href: "/json-tools/yaml-to-json",
      },
      {
        name: "JSON to TSV Converter",
        description:
          "Converts JSON arrays into tab-separated values for spreadsheet usage.",
        href: "/json-tools/json-to-tsv",
      },
      {
        name: "JSON to Excel Converter",
        description:
          "Exports JSON data into XLSX format using client-side spreadsheet generation.",
        href: "/json-tools/json-to-excel",
      },
      {
        name: "JSON to Markdown Table",
        description:
          "Converts JSON arrays into Markdown table format with headers and alignment.",
        href: "/json-tools/json-to-markdown-table",
      },
      {
        name: "JSON to Text Converter",
        description: "Flattens JSON into readable plain text key-value pairs.",
        href: "/json-tools/json-to-text",
      },
      {
        name: "JSON to JavaScript Object",
        description:
          "Converts JSON into JavaScript object notation with proper formatting.",
        href: "/json-tools/json-to-javascript",
      },
      {
        name: "JSON to TypeScript Interface",
        description:
          "Generates TypeScript interfaces from JSON including optional fields and nested types.",
        href: "/json-tools/json-to-typescript",
      },
      {
        name: "JSON to Python Dict",
        description: "Converts JSON into Python dictionary syntax.",
        href: "/json-tools/json-to-python",
      },
      {
        name: "JSON to Java POJO",
        description:
          "Generates Java POJO classes with fields, getters, and setters from JSON.",
        href: "/json-tools/json-to-java",
      },
      {
        name: "JSON to C# Class",
        description:
          "Generates C# model classes from JSON with proper data types.",
        href: "/json-tools/json-to-csharp",
      },
      {
        name: "JSON to Go Struct",
        description: "Generates Go structs with json tags from JSON input.",
        href: "/json-tools/json-to-go",
      },
      {
        name: "JSON to PHP Array",
        description: "Converts JSON into PHP associative array syntax.",
        href: "/json-tools/json-to-php",
      },
      {
        name: "JSON to Kotlin Data Class",
        description:
          "Generates Kotlin data classes with nullable and non-nullable fields.",
        href: "/json-tools/json-to-kotlin",
      },
      {
        name: "JSON to Swift Struct",
        description: "Generates Swift structs conforming to Codable from JSON.",
        href: "/json-tools/json-to-swift",
      },
      {
        name: "JSON Schema Generator",
        description:
          "Automatically generates JSON Schema definitions from sample JSON data.",
        href: "/json-tools/json-schema-example-generator",
      },
      {
        name: "JSON Schema Validator",
        description:
          "Validates JSON data against a provided JSON Schema and reports errors.",
        href: "/json-tools/json-schema-validator",
      },
      {
        name: "JSON Diff Tool",
        description:
          "Compares two JSON objects and highlights added, removed, and changed fields.",
        href: "/json-tools/json-diff",
      },
      {
        name: "JSON Merge Tool",
        description:
          "Merges multiple JSON objects using configurable merge strategies.",
        href: "/json-tools/json-merge",
      },
      {
        name: "JSON Patch Generator",
        description:
          "Generates JSON Patch operations to transform one JSON into another.",
        href: "/json-tools/json-patch-generator",
      },
      {
        name: "JSON Flatten Tool",
        description: "Flattens nested JSON into dot-notation key-value pairs.",
        href: "/json-tools/json-flatten",
      },
      {
        name: "JSON Unflatten Tool",
        description:
          "Converts flattened dot-notation JSON back into nested structure.",
        href: "/json-tools/json-unflatten",
      },
      {
        name: "JSON Key Frequency Analyzer",
        description: "Analyzes how often each key appears in a JSON dataset.",
        href: "/json-tools/json-key-frequency",
      },
      {
        name: "JSON Depth Analyzer",
        description: "Calculates maximum nesting depth of a JSON structure.",
        href: "/json-tools/json-depth-analyzer",
      },
      {
        name: "JSON Array/Object Counter",
        description:
          "Counts arrays, objects, keys, and values inside JSON data.",
        href: "/json-tools/json-array-object-counter",
      },
      {
        name: "JSON Duplicate Key Finder",
        description:
          "Detects duplicate keys within JSON objects that may cause data loss.",
        href: "/json-tools/json-duplicate-key-finder",
      },
      {
        name: "JSON Empty Field Finder",
        description:
          "Identifies null, empty string, or missing values in JSON data.",
        href: "/json-tools/json-empty-field-finder",
      },
      {
        name: "JSONPath Query Tool",
        description:
          "Runs JSONPath queries against JSON data and displays matching results.",
        href: "/json-tools/jsonpath-query",
      },
      {
        name: "JMESPath Query Tool",
        description:
          "Executes JMESPath expressions on JSON for advanced querying.",
        href: "/json-tools/jmespath-query",
      },
      {
        name: "JSON Filter Tool",
        description:
          "Filters JSON arrays based on conditions like equals, contains, or range.",
        href: "/json-tools/json-filter",
      },
      {
        name: "JSON Map Reduce Tool",
        description:
          "Applies map and reduce style transformations on JSON arrays.",
        href: "/json-tools/json-map-reduce",
      },
      {
        name: "JSON Transformer",
        description:
          "Transforms JSON structure using user-defined rules and mappings.",
        href: "/json-tools/json-transformer",
      },
      {
        name: "JSON Rename Keys Tool",
        description: "Renames selected JSON keys across nested structures.",
        href: "/json-tools/json-rename-keys",
      },
      {
        name: "JSON Remove Keys Tool",
        description: "Removes specified keys from JSON objects recursively.",
        href: "/json-tools/json-remove-keys",
      },
      {
        name: "JSON Extract Sub-JSON Tool",
        description:
          "Extracts a specific nested portion of JSON based on a key path.",
        href: "/json-tools/json-extract-subjson",
      },
      {
        name: "JSON Escape Unescape Tool",
        description: "Escapes or unescapes special characters in JSON strings.",
        href: "/json-tools/json-escape-unescape",
      },
      {
        name: "JSON Encode Decode Tool",
        description:
          "Encodes and decodes JSON strings safely for transport or storage.",
        href: "/json-tools/json-encode-decode",
      },
      {
        name: "JSON Stringify Parse Playground",
        description:
          "Interactive playground to experiment with JSON.stringify and JSON.parse options.",
        href: "/json-tools/json-stringify-parse",
      },
      {
        name: "JSON Base64 Encode Decode",
        description: "Encodes JSON to Base64 and decodes Base64 back to JSON.",
        href: "/json-tools/json-base64",
      },
      {
        name: "JSON JWT Decoder",
        description:
          "Decodes JWT payloads and headers into readable JSON without verification.",
        href: "/json-tools/json-jwt-decoder",
      },
      {
        name: "JSON Sensitive Data Masker",
        description:
          "Masks sensitive fields like emails, tokens, or passwords in JSON data.",
        href: "/json-tools/json-sensitive-data-maser",
      },
      {
        name: "JSON Obfuscator",
        description:
          "Minifies and obfuscates JSON keys and values for safer sharing.",
        href: "/json-tools/json-obfuscator",
      },
      {
        name: "JSON Array Generator",
        description:
          "Generates JSON arrays with configurable length and value types.",
        href: "/json-tools/json-array-generator",
      },
      {
        name: "JSON Random Object Generator",
        description: "Generates random JSON objects for testing and demos.",
        href: "/json-tools/json-random-object",
      },
      {
        name: "JSON API Response Generator",
        description:
          "Generates mock API-style JSON responses with status, data, and pagination.",
        href: "/json-tools/json-api-response-generator",
      },
      {
        name: "JSON Pagination Generator",
        description:
          "Wraps JSON data with pagination metadata like page, limit, and total.",
        href: "/json-tools/json-pagination-generator",
      },
      {
        name: "JSON Nested Structure Generator",
        description:
          "Generates deeply nested JSON structures for stress testing.",
        href: "/json-tools/json-nested-structure",
      },
      {
        name: "JSON Enum Generator",
        description: "Generates JSON enums and allowed value lists.",
        href: "/json-tools/json-enum-generator",
      },
      {
        name: "JSON Date Time Generator",
        description:
          "Generates ISO, UTC, and custom formatted date-time values in JSON.",
        href: "/json-tools/json-datetime-generator",
      },
      {
        name: "JSON API Formatter",
        description:
          "Formats JSON API responses to a consistent and readable structure.",
        href: "/json-tools/json-api-formatter",
      },
      {
        name: "JSON API Error Formatter",
        description: "Generates standardized JSON error responses for APIs.",
        href: "/json-tools/json-api-error-formatter",
      },
      {
        name: "JSON Config File Validator",
        description:
          "Validates JSON configuration files and checks required keys.",
        href: "/json-tools/json-config-validator",
      },
      {
        name: "JSON Env Converter",
        description: "Converts JSON configuration into .env key-value format.",
        href: "/json-tools/json-env-converter",
      },
      {
        name: "JSON to Fetch Code Generator",
        description:
          "Generates JavaScript fetch API code from JSON request definitions.",
        href: "/json-tools/json-fetch-code-generator",
      },
      {
        name: "JSON to Axios Code Generator",
        description: "Generates Axios request code snippets from JSON input.",
        href: "/json-tools/json-axios-code-generator",
      },
      {
        name: "JSON to GraphQL Input Generator",
        description: "Converts JSON objects into GraphQL input syntax.",
        href: "/json-tools/json-to-graphql",
      },
      {
        name: "JSON to SQL Insert Generator",
        description: "Generates SQL INSERT statements from JSON arrays.",
        href: "/json-tools/json-to-sql-insert",
      },
      {
        name: "JSON to MongoDB Converter",
        description:
          "Converts JSON into MongoDB-compatible document structure.",
        href: "/json-tools/json-to-mongodb",
      },
      {
        name: "JSON Explainer",
        description:
          "Explains JSON structure in simple human-readable language.",
        href: "/json-tools/json-explainer",
      },
      {
        name: "JSON Error Explanation Tool",
        description: "Explains JSON parsing errors and how to fix them.",
        href: "/json-tools/json-error-explanation",
      },
      {
        name: "JSON Structure Visualizer",
        description: "Visualizes JSON hierarchy as a tree or graph.",
        href: "/json-tools/json-structure-visualizer",
      },
      {
        name: "JSON Playground",
        description:
          "Live editor to modify JSON and instantly see formatted output.",
        href: "/json-tools/json-playground",
      },
      {
        name: "JSON Step by Step Parser",
        description:
          "Shows how JSON is parsed token by token for learning purposes.",
        href: "/json-tools/json-step-by-step-parser",
      },
      {
        name: "JSON Schema Example Generator",
        description: "Generates example JSON data from a given JSON Schema.",
        href: "/json-tools/json-schema-example-generator",
      },
    ],
  },
  {
    categoryName: "Color Tools",
    tools: [
      {
        name: "Gradient Step Generator",
        description: "Generate smooth color gradients with customizable steps",
        href: "/color-tools/gradient-step-generator",
      },
      {
        name: "Gradient Palette Generator",
        description: "Create beautiful gradient palettes for your designs",
        href: "/color-tools/gradient-palette-generator",
      },
      {
        name: "Duotone Palette Generator",
        description: "Generate duotone color palettes from images or colors",
        href: "/color-tools/duotone-palette-generator",
      },
      {
        name: "Dominant Color Finder",
        description: "Extract dominant colors from images automatically",
        href: "/color-tools/dominant-color-finder",
      },
      {
        name: "Favorite Colors Manager",
        description: "Save, organize and manage your favorite color palettes",
        href: "/color-tools/favorite-colors-manager",
      },
      {
        name: "Color Palettes",
        description:
          "Browse and create stunning color palettes for any project",
        href: "/color-tools/color-palettes",
      },
      {
        name: "Contrast Checker",
        description:
          "Check color contrast ratios for WCAG accessibility compliance",
        href: "/color-tools/contrast-checker",
      },
      {
        name: "Web Safe Color Picker",
        description: "Pick from 216 web-safe colors that display consistently",
        href: "/color-tools/web-safe-color-picker",
      },
      {
        name: "Color Temperature to RGB",
        description: "Convert color temperature in Kelvin to RGB values",
        href: "/color-tools/color-temperature-to-rgb",
      },
      {
        name: "CSS Variables Generator",
        description: "Generate CSS custom properties for your color schemes",
        href: "/color-tools/css-variables-generator",
      },
      {
        name: "Advanced Color Picker",
        description: "Pick and fine-tune colors with advanced controls",
        href: "/color-tools/advanced-color-picker",
      },
      {
        name: "Color Scale Generator",
        description:
          "Create color scales with varying lightness and saturation",
        href: "/color-tools/color-scale-generator",
      },
      {
        name: "HSL to HEX Converter",
        description: "Convert HSL color values to HEX format instantly",
        href: "/color-tools/hsl-to-hex-converter",
      },
      {
        name: "Palette Duplicate Finder",
        description: "Find and remove duplicate colors from your palettes",
        href: "/color-tools/palette-duplicate-finder",
      },
      {
        name: "HEX to RGB Converter",
        description: "Convert HEX color codes to RGB values instantly",
        href: "/color-tools/hex-to-rgb-converter",
      },
      {
        name: "Color History Tool",
        description: "Track and revisit colors you've used previously",
        href: "/color-tools/color-history-tool",
      },
      {
        name: "HEX to CMYK Converter",
        description: "Convert HEX colors to CMYK for print design",
        href: "/color-tools/hex-to-cmyk-converter",
      },
      {
        name: "Shade Tint Tone Generator",
        description: "Generate shades, tints, and tones of any color",
        href: "/color-tools/shade-tint-tone-generator",
      },
      {
        name: "Palette Contrast Viewer",
        description: "Visualize how colors contrast when used together",
        href: "/color-tools/palette-contrast-viewer",
      },
      {
        name: "Palette Export Tool",
        description:
          "Export color palettes in multiple formats (CSS, JSON, etc.)",
        href: "/color-tools/palette-export-tool",
      },
      {
        name: "Text Color Suggestion Tool",
        description: "Get text color suggestions for any background color",
        href: "/color-tools/text-color-suggestion-tool",
      },
      {
        name: "Palette Sorter",
        description: "Sort palette colors by hue, saturation, or lightness",
        href: "/color-tools/palette-sorter",
      },
      {
        name: "Random Color Palette Generator",
        description: "Generate random color palettes for inspiration",
        href: "/color-tools/random-color-palette-generator",
      },
      {
        name: "RGB to HEX Converter",
        description: "Convert RGB color values to HEX format instantly",
        href: "/color-tools/rgb-to-hex-converter",
      },
      {
        name: "Color Harmony Generator",
        description:
          "Create harmonious color schemes (complementary, analogous, etc.)",
        href: "/color-tools/color-harmony-generator",
      },
      {
        name: "CSS Gradient Generator",
        description:
          "Generate CSS gradient code for linear and radial gradients",
        href: "/color-tools/css-gradient-generator",
      },
      {
        name: "Complementary Color Finder",
        description: "Find complementary colors that pair well together",
        href: "/color-tools/complementary-color-finder",
      },
      {
        name: "Custom Color Palette Generator",
        description: "Create custom palettes based on your preferred colors",
        href: "/color-tools/custom-color-palette-generator",
      },
      {
        name: "Palette Comparison Tool",
        description: "Compare multiple color palettes side by side",
        href: "/color-tools/palette-comparison-tool",
      },
      {
        name: "CSS Color Name Converter",
        description: "Convert between CSS color names and their HEX/RGB values",
        href: "/color-tools/css-color-name-converter",
      },
      {
        name: "HSL to HSV Converter",
        description: "Convert HSL color values to HSV format",
        href: "/color-tools/hsl-to-hsv-converter",
      },
      {
        name: "Monochrome Palette Generator",
        description:
          "Generate monochromatic color palettes from a single color",
        href: "/color-tools/monochrome-palette-generator",
      },
      {
        name: "Pastel Palette Generator",
        description: "Create soft pastel color palettes for gentle designs",
        href: "/color-tools/pastel-palette-generator",
      },
      {
        name: "RGB to HSL Converter",
        description: "Convert RGB color values to HSL format",
        href: "/color-tools/rgb-to-hsl-converter",
      },
      {
        name: "Warm or Cool Color Detector",
        description: "Determine if a color is warm or cool toned",
        href: "/color-tools/warm-or-cool-color-detector",
      },
      {
        name: "Dark Light Mode Preview",
        description: "Preview how colors look in dark and light modes",
        href: "/color-tools/dark-light-mode-preview",
      },
      {
        name: "Color Palette Generator",
        description: "Generate complete color palettes for your projects",
        href: "/color-tools/color-palette-generator",
      },
      {
        name: "RGB to CMYK Converter",
        description: "Convert RGB colors to CMYK for print production",
        href: "/color-tools/rgb-to-cmyk-converter",
      },
      {
        name: "Palette Merger",
        description: "Merge multiple color palettes into one unified palette",
        href: "/color-tools/palette-merger",
      },
      {
        name: "Color Picker",
        description: "Simple and intuitive color picker tool",
        href: "/color-tools/color-picker",
      },
      {
        name: "Color Wheel",
        description:
          "Interactive color wheel for exploring color relationships",
        href: "/color-tools/color-wheel",
      },
      {
        name: "HEX to HSL Converter",
        description: "Convert HEX color codes to HSL values",
        href: "/color-tools/hex-to-hsl-converter",
      },
      {
        name: "Extract Colors from Image",
        description: "Extract all colors from uploaded images",
        href: "/color-tools/extract-colors-from-image",
      },
    ],
  },
  {
    categoryName: "Unit Converters",
    tools: [
      {
        name: "Length Converter",
        href: "/unit-converters/length",
      },
      {
        name: "Weight and Mass Converter",
        href: "/unit-converters/weight-and-mass",
      },
      {
        name: "Volume Converter",
        href: "/unit-converters/volume",
      },
      {
        name: "Temperature Converter",
        href: "/unit-converters/temperature",
      },
      {
        name: "Area Converter",
        href: "/unit-converters/area",
      },
      {
        name: "Pressure Converter",
        href: "/unit-converters/pressure",
      },
      {
        name: "Energy Converter",
        href: "/unit-converters/energy",
      },
      {
        name: "Power Converter",
        href: "/unit-converters/power",
      },
      {
        name: "Force Converter",
        href: "/unit-converters/force",
      },
      {
        name: "Time Converter",
        href: "/unit-converters/time",
      },
      {
        name: "Speed Converter",
        href: "/unit-converters/speed",
      },
      {
        name: "Angle Converter",
        href: "/unit-converters/angle",
      },
      {
        name: "Fuel Consumption Converter",
        href: "/unit-converters/fuel-consumption",
      },
      {
        name: "Data Storage Converter",
        href: "/unit-converters/data-storage",
      },
      {
        name: "Dry Volume Converter",
        href: "/unit-converters/volume-dry",
      },
      {
        name: "Angular Velocity Converter",
        href: "/unit-converters/velocity-angular",
      },
      {
        name: "Acceleration Converter",
        href: "/unit-converters/acceleration",
      },
      {
        name: "Angular Acceleration Converter",
        href: "/unit-converters/acceleration-angular",
      },
      {
        name: "Density Converter",
        href: "/unit-converters/density",
      },
      {
        name: "Specific Volume Converter",
        href: "/unit-converters/specific-volume",
      },
      {
        name: "Moment of Inertia Converter",
        href: "/unit-converters/moment-of-inertia",
      },
      {
        name: "Moment of Force Converter",
        href: "/unit-converters/moment-of-force",
      },
      {
        name: "Torque Converter",
        href: "/unit-converters/torque",
      },
      {
        name: "Fuel Efficiency by Mass Converter",
        href: "/unit-converters/fuel-efficiency-mass",
      },
      {
        name: "Fuel Efficiency by Volume Converter",
        href: "/unit-converters/fuel-efficiency-volume",
      },
      {
        name: "Temperature Interval Converter",
        href: "/unit-converters/temperature-interval",
      },
      {
        name: "Thermal Expansion Converter",
        href: "/unit-converters/thermal-expansion",
      },
      {
        name: "Thermal Resistance Converter",
        href: "/unit-converters/thermal-resistance",
      },
      {
        name: "Thermal Conductivity Converter",
        href: "/unit-converters/thermal-conductivity",
      },
      {
        name: "Specific Heat Capacity Converter",
        href: "/unit-converters/specific-heat-capacity",
      },
      {
        name: "Heat Density Converter",
        href: "/unit-converters/heat-density",
      },
      {
        name: "Heat Flux Density Converter",
        href: "/unit-converters/heat-flux-density",
      },
      {
        name: "Heat Transfer Coefficient Converter",
        href: "/unit-converters/heat-transfer-coefficient",
      },
      {
        name: "Volumetric Flow Rate Converter",
        href: "/unit-converters/flow",
      },
      {
        name: "Mass Flow Rate Converter",
        href: "/unit-converters/flow-mass",
      },
      {
        name: "Molar Flow Rate Converter",
        href: "/unit-converters/flow-molar",
      },
      {
        name: "Mass Flux Density Converter",
        href: "/unit-converters/mass-flux-density",
      },
      {
        name: "Molar Concentration Converter",
        href: "/unit-converters/concentration-molar",
      },
      {
        name: "Solution Concentration Converter",
        href: "/unit-converters/concentration-solution",
      },
      {
        name: "Dynamic Viscosity Converter",
        href: "/unit-converters/viscosity-dynamic",
      },
      {
        name: "Kinematic Viscosity Converter",
        href: "/unit-converters/viscosity-kinematic",
      },
      {
        name: "Surface Tension Converter",
        href: "/unit-converters/surface-tension",
      },
      {
        name: "Permeability Converter",
        href: "/unit-converters/permeability",
      },
      {
        name: "Luminance Converter",
        href: "/unit-converters/luminance",
      },
      {
        name: "Luminous Intensity Converter",
        href: "/unit-converters/luminous-intensity",
      },
      {
        name: "Illuminance Converter",
        href: "/unit-converters/illumination",
      },
      {
        name: "Digital Image Resolution Converter",
        href: "/unit-converters/digital-image-resolution",
      },
      {
        name: "Frequency Converter",
        href: "/unit-converters/frequency",
      },
      {
        name: "Wavelength Converter",
        href: "/unit-converters/wavelength",
      },
      {
        name: "Electric Charge Converter",
        href: "/unit-converters/charge",
      },
      {
        name: "Linear Charge Density Converter",
        href: "/unit-converters/linear-charge-density",
      },
      {
        name: "Surface Charge Density Converter",
        href: "/unit-converters/surface-charge-density",
      },
      {
        name: "Volume Charge Density Converter",
        href: "/unit-converters/volume-charge-density",
      },
      {
        name: "Electric Current Converter",
        href: "/unit-converters/current",
      },
      {
        name: "Linear Current Density Converter",
        href: "/unit-converters/linear-current-density",
      },
      {
        name: "Surface Current Density Converter",
        href: "/unit-converters/surface-current-density",
      },
      {
        name: "Electric Field Strength Converter",
        href: "/unit-converters/electric-field-strength",
      },
      {
        name: "Electric Potential Converter",
        href: "/unit-converters/electric-potential",
      },
      {
        name: "Electric Resistance Converter",
        href: "/unit-converters/electric-resistance",
      },
      {
        name: "Electric Resistivity Converter",
        href: "/unit-converters/electric-resistivity",
      },
      {
        name: "Electric Conductance Converter",
        href: "/unit-converters/electric-conductance",
      },
      {
        name: "Electric Conductivity Converter",
        href: "/unit-converters/electric-conductivity",
      },
      {
        name: "Capacitance Converter",
        href: "/unit-converters/electrostatic-capacitance",
      },
      {
        name: "Inductance Converter",
        href: "/unit-converters/inductance",
      },
      {
        name: "Magnetomotive Force Converter",
        href: "/unit-converters/magnetomotive-force",
      },
      {
        name: "Magnetic Field Strength Converter",
        href: "/unit-converters/magnetic-field-strength",
      },
      {
        name: "Magnetic Flux Converter",
        href: "/unit-converters/magnetic-flux",
      },
      {
        name: "Magnetic Flux Density Converter",
        href: "/unit-converters/magnetic-flux-density",
      },
      {
        name: "Rebar Weight Calculator",
        href: "/unit-converters/rebar-weight-calculator",
      },
      {
        name: "Concrete Volume Calculator & Converter",
        href: "/unit-converters/concrete-volume-converter",
      },
      {
        name: "Concrete Mix Ratio Calculator",
        href: "/unit-converters/concrete-mix-ratio-converter",
      },
      {
        name: "Brick Calculator",
        href: "/unit-converters/brick-calculator",
      },
      {
        name: "Tile Calculator",
        href: "/unit-converters/tile-calculator",
      },
      {
        name: "Cement, Sand & Aggregate Calculator",
        href: "/unit-converters/cement-sand-aggregate-converter",
      },
      {
        name: "Lumber Board Feet Calculator",
        href: "/unit-converters/lumber-board-feet-converter",
      },
      {
        name: "Floor Area Converter",
        href: "/unit-converters/floor-area-converter",
      },
      {
        name: "Roofing Sheet Coverage Calculator",
        href: "/unit-converters/roofing-sheet-coverage-converter",
      },
      {
        name: "Cups to Grams Converter",
        href: "/unit-converters/cups-to-grams",
      },
      {
        name: "Cups to ml Converter",
        href: "/unit-converters/cups-to-ml",
      },
      {
        name: "Oven Temperature Converter",
        href: "/unit-converters/oven-temperature-converter",
      },
      {
        name: "Baking Pan Size Converter",
        href: "/unit-converters/baking-pan-size-converter",
      },
      {
        name: "Ingredient Density Converter",
        href: "/unit-converters/ingredient-density-converter",
      },
      {
        name: "Sourdough Hydration Calculator",
        href: "/unit-converters/sourdough-hydration-converter",
      },
      {
        name: "Image DPI Converter",
        href: "/unit-converters/image-dpi-converter",
      },
      {
        name: "Video Frame Rate Converter",
        href: "/unit-converters/video-frame-rate-converter",
      },
      {
        name: "Audio Bitrate Converter",
        href: "/unit-converters/audio-bitrate-converter",
      },
      {
        name: "Unix Timestamp Converter",
        href: "/unit-converters/unix-timestamp-converter",
      },
      {
        name: "Time Duration Calculator",
        href: "/unit-converters/time-duration-calculator",
      },
      {
        name: "Age Calculator",
        href: "/unit-converters/age-calculator",
      },
      {
        name: "Date Difference Calculator",
        href: "/unit-converters/date-difference-calculator",
      },
      {
        name: "Light-Years to Parsecs Converter",
        href: "/unit-converters/light-years-to-parsecs",
      },
      {
        name: "Astronomical Unit (AU) Converter",
        href: "/unit-converters/astronomical-unit-converter",
      },
      {
        name: "Apparent Magnitude Converter",
        href: "/unit-converters/apparent-magnitude-converter",
      },
      {
        name: "Planet Weight Calculator",
        href: "/unit-converters/planet-weight-converter",
      },
      {
        name: "Radiation Dose Converter",
        href: "/unit-converters/radiation-dose-converter",
      },
      {
        name: "Radioactivity Converter",
        href: "/unit-converters/radioactivity-converter",
      },
      {
        name: "Radiation Exposure Dose Converter",
        href: "/unit-converters/exposure-dose-converter",
      },
      {
        name: "Sound Pressure Converter — Pa to dB",
        href: "/unit-converters/sound-pressure-pa-to-db",
      },
      {
        name: "Frequency to Musical Note Converter",
        href: "/unit-converters/frequency-to-musical-note-converter",
      },
      {
        name: "Wind Speed Converter",
        href: "/unit-converters/wind-speed-converter",
      },
      {
        name: "Rainfall Converter",
        href: "/unit-converters/rainfall-converter",
      },
      {
        name: "Humidity Ratio Converter",
        href: "/unit-converters/humidity-ratio-converter",
      },
      {
        name: "Dew Point Calculator",
        href: "/unit-converters/dew-point-calculator",
      },
      {
        name: "Fabric GSM Converter",
        href: "/unit-converters/fabric-gsm-converter",
      },
      {
        name: "Thread Count Converter",
        href: "/unit-converters/thread-count-converter",
      },
      {
        name: "Clothing Size Converter",
        href: "/unit-converters/clothing-size-converter",
      },
      {
        name: "BMI Calculator — Body Mass Index",
        href: "/unit-converters/bmi-calculator",
      },
      {
        name: "Calorie Burn Rate Calculator",
        href: "/unit-converters/calorie-burn-rate-converter",
      },
      {
        name: "Running Pace to Speed Converter",
        href: "/unit-converters/running-pace-to-speed-converter",
      },
      {
        name: "Height Converter — cm to ft & In",
        href: "/unit-converters/height-converter",
      },
      {
        name: "Shoe Size Converter",
        href: "/unit-converters/shoe-size-converter",
      },
      {
        name: "Ring Size Converter",
        href: "/unit-converters/ring-size-converter",
      },
      {
        name: "Horsepower to Animals Converter",
        href: "/unit-converters/horsepower-to-animals-converter",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6" />
              <span className="font-bold text-lg">1000 Free Tools</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              A great collection of tools for everyday tasks.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://x.com/1000freetools"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Quick Links Section */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Popular Tools Section */}
        <div className="lg:col-span-3">
          <h3 className="font-semibold mb-4 mt-8">Popular Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsByCategory.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium mb-3 text-foreground">
                  {category.categoryName}
                </h4>
                <ul className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex}>
                      <Link
                        href={tool.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 1000 Free Tools. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
