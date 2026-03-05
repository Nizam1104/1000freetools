import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore All Tools - 1000 Free Online Tools",
  description:
    "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
  openGraph: {
    title: "Explore All Tools - 1000 Free Online Tools",
    description:
      "Browse all free online tools including image compressors, design utilities, developer tools and more. All tools run directly in your browser with no registration required.",
    type: "website",
  },
  alternates: {
    canonical: "https://1000freetools.com/explore-all-tools",
  },
};

// All tools data grouped by category
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
      {
        name: "Favicon Generator",
        description:
          "Create Professional Looking Favicon for Free, supports text, image, and emojis",
        href: "/design-tools/favicon-generator",
      },
    ],
  },
  {
    categoryName: "Developer Tools",
    tools: [
      {
        name: "Mock Data Generator",
        description:
          "Generate realistic test data for your applications to speed up development and testing.",
        href: "/developer-tools/mock-data-generator",
      },
      {
        name: "Javascript Online Playground",
        description:
          "Write, run, and test JavaScript code directly in your browser",
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
        description:
          "Instantly convert between all units of length and distance — meters, feet, inches, kilometers, miles, yards, and more. Free online length converter for everyday and scientific use.",
        href: "/unit-converters/length",
      },
      {
        name: "Weight and Mass Converter",
        description:
          "Convert weight and mass units instantly — kilograms, pounds, grams, ounces, tons, and more. Accurate and easy-to-use online weight converter for cooking, shipping, and science.",
        href: "/unit-converters/weight-and-mass",
      },
      {
        name: "Volume Converter",
        description:
          "Convert volume units effortlessly — liters, gallons, milliliters, cubic feet, fluid ounces, and more. Perfect for cooking, engineering, and everyday volume conversions.",
        href: "/unit-converters/volume",
      },
      {
        name: "Temperature Converter",
        description:
          "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Use our free online temperature converter for weather, cooking, and scientific calculations.",
        href: "/unit-converters/temperature",
      },
      {
        name: "Area Converter",
        description:
          "Convert area units quickly and accurately — square meters, acres, hectares, square feet, square kilometers, and more. Ideal for real estate, land measurement, and construction.",
        href: "/unit-converters/area",
      },
      {
        name: "Pressure Converter",
        description:
          "Convert pressure units including pascals, bar, PSI, atmospheres, torr, and more. Free online pressure converter for engineering, science, and industrial applications.",
        href: "/unit-converters/pressure",
      },
      {
        name: "Energy Converter",
        description:
          "Convert energy units instantly — joules, calories, kilowatt-hours, BTU, electronvolts, and more. Use our free energy converter for physics, nutrition, and engineering needs.",
        href: "/unit-converters/energy",
      },
      {
        name: "Power Converter",
        description:
          "Convert power units including watts, kilowatts, horsepower, megawatts, and more. Accurate online power converter for mechanical, electrical, and engineering calculations.",
        href: "/unit-converters/power",
      },
      {
        name: "Force Converter",
        description:
          "Convert force units including newtons, pound-force, kilogram-force, dynes, and more. Free online force converter for physics, engineering, and scientific applications.",
        href: "/unit-converters/force",
      },
      {
        name: "Time Converter",
        description:
          "Convert time units instantly — seconds, minutes, hours, days, weeks, months, and years. Simple and accurate online time unit converter for everyday and scientific use.",
        href: "/unit-converters/time",
      },
      {
        name: "Speed Converter",
        description:
          "Convert speed and velocity units instantly — km/h, mph, m/s, knots, and more. Free online speed converter for travel, sports, physics, and engineering.",
        href: "/unit-converters/speed",
      },
      {
        name: "Angle Converter",
        description:
          "Convert angle units including degrees, radians, gradians, arcminutes, arcseconds, and more. Accurate online angle converter for geometry, trigonometry, and engineering.",
        href: "/unit-converters/angle",
      },
      {
        name: "Fuel Consumption Converter",
        description:
          "Convert fuel consumption and efficiency units — MPG, L/100km, km/L, and more. Free online fuel economy converter for cars, trucks, and fleet management.",
        href: "/unit-converters/fuel-consumption",
      },
      {
        name: "Data Storage Converter",
        description:
          "Convert digital storage units — bytes, kilobytes, megabytes, gigabytes, terabytes, and beyond. Free online data storage converter for computing, cloud storage, and IT professionals.",
        href: "/unit-converters/data-storage",
      },
      {
        name: "Dry Volume Converter",
        description:
          "Convert dry volume units including dry pints, dry gallons, bushels, pecks, and more. Accurate online dry measure converter for agriculture, cooking, and commodity trading.",
        href: "/unit-converters/volume-dry",
      },
      {
        name: "Angular Velocity Converter",
        description:
          "Convert angular velocity units — radians per second, degrees per second, RPM, and more. Free online angular velocity converter for physics, mechanics, and engineering.",
        href: "/unit-converters/velocity-angular",
      },
      {
        name: "Acceleration Converter",
        description:
          "Convert acceleration units including m/s², g-force, ft/s², Gal, and more. Accurate online acceleration converter for physics, aerospace, and mechanical engineering.",
        href: "/unit-converters/acceleration",
      },
      {
        name: "Angular Acceleration Converter",
        description:
          "Convert angular acceleration units including rad/s², deg/s², and rev/min². Free online angular acceleration converter for rotational dynamics and mechanical engineering.",
        href: "/unit-converters/acceleration-angular",
      },
      {
        name: "Density Converter",
        description:
          "Convert density units instantly — kg/m³, g/cm³, lb/ft³, lb/in³, and more. Free online density converter for material science, chemistry, and engineering.",
        href: "/unit-converters/density",
      },
      {
        name: "Specific Volume Converter",
        description:
          "Convert specific volume units including m³/kg, L/kg, ft³/lb, and more. Accurate online specific volume converter for thermodynamics and fluid mechanics.",
        href: "/unit-converters/specific-volume",
      },
      {
        name: "Moment of Inertia Converter",
        description:
          "Convert moment of inertia units — kg·m², g·cm², lb·ft², and more. Free online moment of inertia converter for mechanical engineering and rotational dynamics.",
        href: "/unit-converters/moment-of-inertia",
      },
      {
        name: "Moment of Force Converter",
        description:
          "Convert moment of force units including N·m, lbf·ft, kgf·m, and more. Free online bending moment converter for structural and mechanical engineering calculations.",
        href: "/unit-converters/moment-of-force",
      },
      {
        name: "Torque Converter",
        description:
          "Convert torque units instantly — newton-meters, pound-feet, kilogram-force centimeters, and more. Accurate online torque converter for automotive, mechanical, and industrial engineering.",
        href: "/unit-converters/torque",
      },
      {
        name: "Fuel Efficiency by Mass Converter",
        description:
          "Convert fuel efficiency by mass units — km/kg, miles/lb, and more. Free online mass-based fuel efficiency converter for rocket propulsion and alternative fuel vehicles.",
        href: "/unit-converters/fuel-efficiency-mass",
      },
      {
        name: "Fuel Efficiency by Volume Converter",
        description:
          "Convert volumetric fuel efficiency units — L/100km, MPG, km/L, and more. Accurate online fuel economy converter for vehicles, fleet management, and emissions calculations.",
        href: "/unit-converters/fuel-efficiency-volume",
      },
      {
        name: "Temperature Interval Converter",
        description:
          "Convert temperature interval and difference units between Celsius, Fahrenheit, Kelvin, and Rankine scales. Free online temperature difference converter for thermodynamics and HVAC.",
        href: "/unit-converters/temperature-interval",
      },
      {
        name: "Thermal Expansion Converter",
        description:
          "Convert thermal expansion coefficient units — per Kelvin, per Celsius, per Fahrenheit, and more. Free online thermal expansion converter for materials science and engineering.",
        href: "/unit-converters/thermal-expansion",
      },
      {
        name: "Thermal Resistance Converter",
        description:
          "Convert thermal resistance units including K/W, °C/W, and °F·h/BTU. Accurate online thermal resistance converter for HVAC, insulation, and electronics cooling design.",
        href: "/unit-converters/thermal-resistance",
      },
      {
        name: "Thermal Conductivity Converter",
        description:
          "Convert thermal conductivity units — W/(m·K), BTU/(h·ft·°F), cal/(s·cm·°C), and more. Free online thermal conductivity converter for insulation, materials, and heat transfer engineering.",
        href: "/unit-converters/thermal-conductivity",
      },
      {
        name: "Specific Heat Capacity Converter",
        description:
          "Convert specific heat capacity units — J/(kg·K), BTU/(lb·°F), cal/(g·°C), and more. Accurate online specific heat converter for thermodynamics, chemistry, and material science.",
        href: "/unit-converters/specific-heat-capacity",
      },
      {
        name: "Heat Density Converter",
        description:
          "Convert heat density units including J/m³, BTU/ft³, and cal/cm³. Free online heat density converter for combustion engineering, fuel analysis, and thermodynamic systems.",
        href: "/unit-converters/heat-density",
      },
      {
        name: "Heat Flux Density Converter",
        description:
          "Convert heat flux density units — W/m², BTU/(h·ft²), cal/(s·cm²), and more. Free online heat flux converter for thermal engineering, solar energy, and building insulation.",
        href: "/unit-converters/heat-flux-density",
      },
      {
        name: "Heat Transfer Coefficient Converter",
        description:
          "Convert heat transfer coefficient units — W/(m²·K), BTU/(h·ft²·°F), and more. Accurate online converter for convection, conduction, and HVAC engineering calculations.",
        href: "/unit-converters/heat-transfer-coefficient",
      },
      {
        name: "Volumetric Flow Rate Converter",
        description:
          "Convert volumetric flow rate units — m³/s, liters per minute, gallons per minute, CFM, and more. Free online flow rate converter for plumbing, HVAC, and fluid engineering.",
        href: "/unit-converters/flow",
      },
      {
        name: "Mass Flow Rate Converter",
        description:
          "Convert mass flow rate units — kg/s, lb/min, g/h, and more. Accurate online mass flow converter for chemical processing, aerospace, and industrial fluid systems.",
        href: "/unit-converters/flow-mass",
      },
      {
        name: "Molar Flow Rate Converter",
        description:
          "Convert molar flow rate units — mol/s, kmol/h, lbmol/min, and more. Free online molar flow converter for chemical engineering, reaction kinetics, and process design.",
        href: "/unit-converters/flow-molar",
      },
      {
        name: "Mass Flux Density Converter",
        description:
          "Convert mass flux density units — kg/(m²·s), lb/(ft²·s), and more. Free online mass flux converter for chemical engineering, filtration, and membrane technology.",
        href: "/unit-converters/mass-flux-density",
      },
      {
        name: "Molar Concentration Converter",
        description:
          "Convert molar concentration units — mol/L, mmol/L, mol/m³, and more. Free online molarity converter for chemistry, biochemistry, and laboratory solution preparation.",
        href: "/unit-converters/concentration-molar",
      },
      {
        name: "Solution Concentration Converter",
        description:
          "Convert solution concentration units — ppm, ppb, mg/L, percent, g/L, and more. Accurate online concentration converter for chemistry, water treatment, and environmental testing.",
        href: "/unit-converters/concentration-solution",
      },
      {
        name: "Dynamic Viscosity Converter",
        description:
          "Convert dynamic viscosity units — Pa·s, centipoise, poise, lb/(ft·s), and more. Free online dynamic viscosity converter for fluid mechanics, lubrication, and chemical engineering.",
        href: "/unit-converters/viscosity-dynamic",
      },
      {
        name: "Kinematic Viscosity Converter",
        description:
          "Convert kinematic viscosity units — m²/s, centistokes, stokes, ft²/s, and more. Accurate online kinematic viscosity converter for fluid dynamics, oil analysis, and hydraulic systems.",
        href: "/unit-converters/viscosity-kinematic",
      },
      {
        name: "Surface Tension Converter",
        description:
          "Convert surface tension units — N/m, mN/m, dyne/cm, lbf/ft, and more. Free online surface tension converter for chemistry, materials science, and fluid interface studies.",
        href: "/unit-converters/surface-tension",
      },
      {
        name: "Permeability Converter",
        description:
          "Convert permeability units including darcy, millidarcy, m², and more. Free online permeability converter for petroleum engineering, hydrogeology, and porous media analysis.",
        href: "/unit-converters/permeability",
      },
      {
        name: "Luminance Converter",
        description:
          "Convert luminance units — cd/m² (nits), foot-lamberts, stilb, and more. Free online luminance converter for display technology, photography, and lighting design.",
        href: "/unit-converters/luminance",
      },
      {
        name: "Luminous Intensity Converter",
        description:
          "Convert luminous intensity units — candela, millicandela, candlepower, and more. Accurate online luminous intensity converter for photometry, LED design, and lighting engineering.",
        href: "/unit-converters/luminous-intensity",
      },
      {
        name: "Illuminance Converter",
        description:
          "Convert illuminance units — lux, foot-candles, phot, nox, and more. Free online illumination converter for lighting design, photography, and workplace safety compliance.",
        href: "/unit-converters/illumination",
      },
      {
        name: "Digital Image Resolution Converter",
        description:
          "Convert digital image resolution units — DPI, PPI, dots/cm, pixels/mm, and more. Free online resolution converter for photography, printing, and graphic design.",
        href: "/unit-converters/digital-image-resolution",
      },
      {
        name: "Frequency Converter",
        description:
          "Convert frequency units — hertz, kilohertz, megahertz, gigahertz, RPM, and more. Free online frequency converter for electronics, audio engineering, and signal processing.",
        href: "/unit-converters/frequency",
      },
      {
        name: "Wavelength Converter",
        description:
          "Convert wavelength units and calculate frequency across the electromagnetic spectrum — nanometers, micrometers, angstroms, and more. Free online wavelength converter for optics and physics.",
        href: "/unit-converters/wavelength",
      },
      {
        name: "Electric Charge Converter",
        description:
          "Convert electric charge units — coulombs, millicoulombs, microcoulombs, ampere-hours, and more. Free online electric charge converter for electronics, electrochemistry, and physics.",
        href: "/unit-converters/charge",
      },
      {
        name: "Linear Charge Density Converter",
        description:
          "Convert linear charge density units — C/m, mC/mm, μC/cm, and more. Free online linear charge density converter for electrostatics and electrical engineering.",
        href: "/unit-converters/linear-charge-density",
      },
      {
        name: "Surface Charge Density Converter",
        description:
          "Convert surface charge density units — C/m², mC/cm², μC/mm², and more. Accurate online surface charge density converter for capacitor design and electrostatics.",
        href: "/unit-converters/surface-charge-density",
      },
      {
        name: "Volume Charge Density Converter",
        description:
          "Convert volume charge density units — C/m³, mC/cm³, μC/mm³, and more. Free online volume charge density converter for electrostatics, plasma physics, and electrical engineering.",
        href: "/unit-converters/volume-charge-density",
      },
      {
        name: "Electric Current Converter",
        description:
          "Convert electric current units — amperes, milliamperes, microamperes, kiloamperes, and more. Free online current converter for electronics, electrical engineering, and circuit design.",
        href: "/unit-converters/current",
      },
      {
        name: "Linear Current Density Converter",
        description:
          "Convert linear current density units — A/m, mA/cm, kA/m, and more. Free online linear current density converter for electromagnetics and electrical engineering.",
        href: "/unit-converters/linear-current-density",
      },
      {
        name: "Surface Current Density Converter",
        description:
          "Convert surface current density units — A/m², mA/cm², kA/m², and more. Accurate online surface current density converter for electromagnetic field analysis and power systems.",
        href: "/unit-converters/surface-current-density",
      },
      {
        name: "Electric Field Strength Converter",
        description:
          "Convert electric field strength units — V/m, kV/m, N/C, and more. Free online electric field converter for electrostatics, antenna design, and electromagnetic compatibility.",
        href: "/unit-converters/electric-field-strength",
      },
      {
        name: "Electric Potential Converter",
        description:
          "Convert electric potential and voltage units — volts, millivolts, kilovolts, megavolts, and more. Free online voltage converter for electronics, power systems, and electrical engineering.",
        href: "/unit-converters/electric-potential",
      },
      {
        name: "Electric Resistance Converter",
        description:
          "Convert electric resistance units — ohms, kilohms, megaohms, milliohms, and more. Free online resistance converter for circuit design, electronics, and electrical engineering.",
        href: "/unit-converters/electric-resistance",
      },
      {
        name: "Electric Resistivity Converter",
        description:
          "Convert electrical resistivity units — Ω·m, Ω·cm, μΩ·in, and more. Accurate online resistivity converter for material science, semiconductor design, and conductor selection.",
        href: "/unit-converters/electric-resistivity",
      },
      {
        name: "Electric Conductance Converter",
        description:
          "Convert electric conductance units — siemens, millisiemens, microsiemens, mho, and more. Free online conductance converter for electronics, electrochemistry, and electrical circuit analysis.",
        href: "/unit-converters/electric-conductance",
      },
      {
        name: "Electric Conductivity Converter",
        description:
          "Convert electrical conductivity units — S/m, mS/cm, μS/cm, and more. Free online conductivity converter for water quality testing, material science, and electrochemistry.",
        href: "/unit-converters/electric-conductivity",
      },
      {
        name: "Capacitance Converter",
        description:
          "Convert capacitance units — farads, microfarads, nanofarads, picofarads, and more. Free online capacitance converter for electronics, circuit design, and electrical engineering.",
        href: "/unit-converters/electrostatic-capacitance",
      },
      {
        name: "Inductance Converter",
        description:
          "Convert inductance units — henries, millihenries, microhenries, nanohenries, and more. Free online inductance converter for electronics, RF engineering, and coil and transformer design.",
        href: "/unit-converters/inductance",
      },
      {
        name: "Magnetomotive Force Converter",
        description:
          "Convert magnetomotive force units — ampere-turns, gilberts, kiloampere-turns, and more. Free online MMF converter for magnetic circuit design and electromagnetic engineering.",
        href: "/unit-converters/magnetomotive-force",
      },
      {
        name: "Magnetic Field Strength Converter",
        description:
          "Convert magnetic field strength units — A/m, oersteds, kA/m, and more. Accurate online H-field converter for electromagnetics, motor design, and magnetic material characterization.",
        href: "/unit-converters/magnetic-field-strength",
      },
      {
        name: "Magnetic Flux Converter",
        description:
          "Convert magnetic flux units — webers, milliwebers, maxwells, and more. Free online magnetic flux converter for transformer design, motor engineering, and electromagnetic analysis.",
        href: "/unit-converters/magnetic-flux",
      },
      {
        name: "Magnetic Flux Density Converter",
        description:
          "Convert magnetic flux density units — tesla, millitesla, gauss, microtesla, and more. Free online B-field converter for MRI, motor design, and electromagnetic engineering.",
        href: "/unit-converters/magnetic-flux-density",
      },
      {
        name: "Rebar Weight Calculator",
        description:
          "Calculate the total weight of steel rebar for your construction project. Enter bar diameter, length, and quantity to get accurate rebar weight in kg or lbs. Free online rebar weight calculator.",
        href: "/unit-converters/rebar-weight-calculator",
      },
      {
        name: "Concrete Volume Calculator & Converter",
        description:
          "Calculate concrete volume for slabs, columns, beams, and footings — and convert between cubic meters, cubic feet, and cubic yards. Free online concrete volume calculator for construction projects.",
        href: "/unit-converters/concrete-volume-converter",
      },
      {
        name: "Concrete Mix Ratio Calculator",
        description:
          "Convert concrete mix ratios and calculate exact cement, sand, and aggregate quantities for any volume. Free online concrete mix calculator for M10, M15, M20, M25, and custom mix designs.",
        href: "/unit-converters/concrete-mix-ratio-converter",
      },
      {
        name: "Brick Calculator",
        description:
          "Calculate how many bricks you need for any wall or project. Enter wall dimensions and brick size to get an accurate brick count with mortar allowance. Free online brick quantity estimator.",
        href: "/unit-converters/brick-calculator",
      },
      {
        name: "Tile Calculator",
        description:
          "Calculate how many tiles you need for any floor or wall area. Enter room and tile dimensions to get an accurate tile count with waste factor included. Free online tile quantity calculator.",
        href: "/unit-converters/tile-calculator",
      },
      {
        name: "Cement, Sand & Aggregate Calculator",
        description:
          "Calculate exact quantities of cement, sand, and aggregate needed for your concrete mix. Enter volume and mix ratio to get material amounts in kg, bags, and cubic meters. Free construction material calculator.",
        href: "/unit-converters/cement-sand-aggregate-converter",
      },
      {
        name: "Lumber Board Feet Calculator",
        description:
          "Calculate board feet of lumber instantly. Enter thickness, width, and length to get total board footage for any wood project. Free online lumber board feet converter for construction and carpentry.",
        href: "/unit-converters/lumber-board-feet-converter",
      },
      {
        name: "Floor Area Converter",
        description:
          "Convert floor area between square meters, square feet, square yards, and more. Free online floor area converter for real estate, interior design, and construction planning.",
        href: "/unit-converters/floor-area-converter",
      },
      {
        name: "Roofing Sheet Coverage Calculator",
        description:
          "Calculate how many roofing sheets you need for your roof area. Enter roof dimensions, sheet size, and overlap to get an accurate sheet count. Free online roofing coverage calculator.",
        href: "/unit-converters/roofing-sheet-coverage-converter",
      },
      {
        name: "Cups to Grams Converter",
        description:
          "Convert cups to grams for flour, sugar, butter, rice, oats, and 50+ ingredients. Get accurate weight measurements for any recipe with our free online cups to grams converter.",
        href: "/unit-converters/cups-to-grams",
      },
      {
        name: "Cups to ml Converter",
        description:
          "Convert cups to milliliters, tablespoons, fluid ounces, and liters instantly. Free online cups to ml converter for accurate liquid measurements in any recipe or cooking project.",
        href: "/unit-converters/cups-to-ml",
      },
      {
        name: "Oven Temperature Converter",
        description:
          "Convert oven temperatures between Celsius, Fahrenheit, and gas marks instantly. Free online oven temperature converter for baking — perfect for following recipes from any country.",
        href: "/unit-converters/oven-temperature-converter",
      },
      {
        name: "Baking Pan Size Converter",
        description:
          "Convert between baking pan sizes and find equivalent pan volumes to scale any recipe. Free online baking pan converter for round, square, rectangular, and springform tins.",
        href: "/unit-converters/baking-pan-size-converter",
      },
      {
        name: "Ingredient Density Converter",
        description:
          "Convert between volume and weight for common cooking ingredients using accurate density values. Free online ingredient converter for baking, cooking, and precise recipe scaling.",
        href: "/unit-converters/ingredient-density-converter",
      },
      {
        name: "Sourdough Hydration Calculator",
        description:
          "Calculate sourdough hydration percentage and convert between flour and water ratios instantly. Free online sourdough hydration converter for perfect bread dough consistency every time.",
        href: "/unit-converters/sourdough-hydration-converter",
      },
      {
        name: "Image DPI Converter",
        description:
          "Convert image DPI and calculate print size from pixel dimensions. Free online image DPI converter for photographers, designers, and print-ready file preparation.",
        href: "/unit-converters/image-dpi-converter",
      },
      {
        name: "Video Frame Rate Converter",
        description:
          "Convert video frame rates between 24fps, 30fps, 60fps, 120fps, and more. Calculate total frames for any video duration. Free online frame rate converter for video editors and filmmakers.",
        href: "/unit-converters/video-frame-rate-converter",
      },
      {
        name: "Audio Bitrate Converter",
        description:
          "Convert audio bitrate units and calculate file size from bitrate and duration. Free online audio bitrate converter for music production, podcasting, and streaming optimization.",
        href: "/unit-converters/audio-bitrate-converter",
      },
      {
        name: "Unix Timestamp Converter",
        description:
          "Convert Unix timestamps to readable dates and times — and back again. Free online epoch time converter for developers, database administrators, and system engineers.",
        href: "/unit-converters/unix-timestamp-converter",
      },
      {
        name: "Time Duration Calculator",
        description:
          "Calculate the exact duration between two times or add and subtract time intervals easily. Free online time duration calculator for work hours, project planning, and scheduling.",
        href: "/unit-converters/time-duration-calculator",
      },
      {
        name: "Age Calculator",
        description:
          "Calculate your exact age in years, months, and days from your date of birth. Free online age calculator — also find the age on any past or future date.",
        href: "/unit-converters/age-calculator",
      },
      {
        name: "Date Difference Calculator",
        description:
          "Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator for deadlines, anniversaries, and event planning.",
        href: "/unit-converters/date-difference-calculator",
      },
      {
        name: "Light-Years to Parsecs Converter",
        description:
          "Convert astronomical distances between light-years, parsecs, astronomical units, and kilometers. Free online space distance converter for astronomy, astrophysics, and science education.",
        href: "/unit-converters/light-years-to-parsecs",
      },
      {
        name: "Astronomical Unit (AU) Converter",
        description:
          "Convert astronomical units to light-years, parsecs, kilometers, miles, and more. Free online AU converter for planetary science, astronomy, and space exploration calculations.",
        href: "/unit-converters/astronomical-unit-converter",
      },
      {
        name: "Apparent Magnitude Converter",
        description:
          "Convert between apparent magnitude, absolute magnitude, and stellar luminosity. Free online magnitude converter for amateur astronomers, astrophysics students, and stargazers.",
        href: "/unit-converters/apparent-magnitude-converter",
      },
      {
        name: "Planet Weight Calculator",
        description:
          "Find out how much you would weigh on Mars, Jupiter, the Moon, and other planets. Free online planet weight calculator based on surface gravity for astronomy and science education.",
        href: "/unit-converters/planet-weight-converter",
      },
      {
        name: "Radiation Dose Converter",
        description:
          "Convert radiation dose units — gray, rad, sievert, rem, and more. Free online radiation dose converter for medical physics, radiology, nuclear safety, and health physics.",
        href: "/unit-converters/radiation-dose-converter",
      },
      {
        name: "Radioactivity Converter",
        description:
          "Convert radioactivity units — becquerels, curies, millicuries, rutherfords, and more. Free online radioactivity converter for nuclear medicine, radiation safety, and physics.",
        href: "/unit-converters/radioactivity-converter",
      },
      {
        name: "Radiation Exposure Dose Converter",
        description:
          "Convert radiation exposure dose units — roentgens, coulombs/kg, milliroentgens, and more. Free online exposure dose converter for radiology, health physics, and radiation protection.",
        href: "/unit-converters/exposure-dose-converter",
      },
      {
        name: "Sound Pressure Converter — Pa to dB",
        description:
          "Convert sound pressure between pascals and decibels (dB SPL) instantly. Free online sound pressure converter for acoustics, audio engineering, and noise measurement.",
        href: "/unit-converters/sound-pressure-pa-to-db",
      },
      {
        name: "Frequency to Musical Note Converter",
        description:
          "Convert any frequency in Hz to its corresponding musical note and octave — and back again. Free online pitch frequency converter for musicians, audio engineers, and music theory students.",
        href: "/unit-converters/frequency-to-musical-note-converter",
      },
      {
        name: "Wind Speed Converter",
        description:
          "Convert wind speed between km/h, mph, knots, m/s, and Beaufort scale. Free online wind speed converter for meteorology, sailing, aviation, and weather analysis.",
        href: "/unit-converters/wind-speed-converter",
      },
      {
        name: "Rainfall Converter",
        description:
          "Convert rainfall measurements between millimeters, inches, liters per square meter, and more. Free online precipitation converter for meteorology, hydrology, and agriculture.",
        href: "/unit-converters/rainfall-converter",
      },
      {
        name: "Humidity Ratio Converter",
        description:
          "Convert between relative humidity, absolute humidity, specific humidity, and humidity ratio. Free online humidity converter for HVAC, meteorology, and building climate control.",
        href: "/unit-converters/humidity-ratio-converter",
      },
      {
        name: "Dew Point Calculator",
        description:
          "Calculate dew point temperature from relative humidity and air temperature instantly. Free online dew point calculator for weather forecasting, HVAC design, and condensation analysis.",
        href: "/unit-converters/dew-point-calculator",
      },
      {
        name: "Fabric GSM Converter",
        description:
          "Convert fabric weight between GSM, oz/yd², and other textile units. Free online fabric GSM converter for fashion designers, garment manufacturers, and textile buyers.",
        href: "/unit-converters/fabric-gsm-converter",
      },
      {
        name: "Thread Count Converter",
        description:
          "Convert and compare thread count values across different measurement standards for bed sheets and fabrics. Free online thread count converter for textile buyers and bedding shoppers.",
        href: "/unit-converters/thread-count-converter",
      },
      {
        name: "Clothing Size Converter",
        description:
          "Convert clothing sizes between US, UK, EU, and Asian standards for men, women, and kids. Free online clothes size converter for international shopping and fashion retail.",
        href: "/unit-converters/clothing-size-converter",
      },
      {
        name: "BMI Calculator — Body Mass Index",
        description:
          "Calculate your Body Mass Index (BMI) from height and weight. Find out if you're underweight, normal weight, overweight, or obese. Free online BMI calculator for adults and children.",
        href: "/unit-converters/bmi-calculator",
      },
      {
        name: "Calorie Burn Rate Calculator",
        description:
          "Estimate calories burned per hour for running, cycling, swimming, walking, and more. Free online calorie burn rate converter based on activity type and body weight.",
        href: "/unit-converters/calorie-burn-rate-converter",
      },
      {
        name: "Running Pace to Speed Converter",
        description:
          "Convert running pace (min/km or min/mile) to speed (km/h or mph) instantly. Free online running pace converter for athletes, marathon runners, and fitness tracking.",
        href: "/unit-converters/running-pace-to-speed-converter",
      },
      {
        name: "Height Converter — cm to ft & In",
        description:
          "Convert height between centimeters, feet and inches, and meters. Free online height converter — instantly see your height in any unit, perfect for profiles, travel, and fitness.",
        href: "/unit-converters/height-converter",
      },
      {
        name: "Shoe Size Converter",
        description:
          "Convert shoe sizes between US, UK, EU, and international standards for men, women, and kids. Free online shoe size converter for global shopping and footwear retail.",
        href: "/unit-converters/shoe-size-converter",
      },
      {
        name: "Ring Size Converter",
        description:
          "Convert ring sizes between US, UK, EU, French, Swiss, and Japanese standards. Free online ring size converter for jewelry shopping, gifting, and custom ring orders worldwide.",
        href: "/unit-converters/ring-size-converter",
      },
      {
        name: "Horsepower to Animals Converter",
        description:
          "How many horses is your car's engine worth? Convert horsepower to fun animal equivalents — horses, hamsters, elephants, and more. A lighthearted power converter for curious minds.",
        href: "/unit-converters/horsepower-to-animals-converter",
      },
    ],
  },
];

export default function ExploreAllToolsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore All Tools
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
            Browse our comprehensive collection of free online tools that run
            directly in your browser.
          </p>
        </div>
      </section>

      {/* Loop through each tool category */}
      {toolsByCategory.map((category, categoryIndex) => (
        <section key={categoryIndex} className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            {category.categoryName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 sm:gap-y-4 md:gap-y-6 gap-x-2 sm:gap-x-4 md:gap-x-6">
            {category.tools.map((tool, toolIndex) => (
              <Link
                href={tool.href}
                key={toolIndex}
                className="bg-card rounded-lg p-4 hover:shadow-xl border transition-shadow duration-300"
              >
                <h3 className="text-primary text-base md:text-xl font-semibold">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
