"use client";

import { useState } from "react";
import { JsonEditor } from "@/components/utils/json-editor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function JsonKeyValueExtractor() {
  const [jsonInput, setJsonInput] = useState("");
  const [keyNames, setKeyNames] = useState("");
  const [outputFormat, setOutputFormat] = useState<"array" | "object">("array");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const extractKeys = () => {
    setError(null);
    setResult(null);
    setCopied(false);

    if (!jsonInput.trim()) {
      setError("Please enter JSON input");
      return;
    }

    if (!keyNames.trim()) {
      setError("Please enter key names (comma-separated)");
      return;
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonInput);
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const keys = keyNames
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k);

    try {
      if (Array.isArray(parsedJson)) {
        if (outputFormat === "array") {
          const extracted = parsedJson.map((item) => {
            if (typeof item === "object" && item !== null) {
              const obj: Record<string, unknown> = {};
              keys.forEach((key) => {
                if (key in item) {
                  obj[key] = (item as Record<string, unknown>)[key];
                }
              });
              return obj;
            }
            return {};
          });
          setResult(JSON.stringify(extracted, null, 2));
        } else {
          const extracted: Record<string, unknown[]> = {};
          keys.forEach((key) => {
            extracted[key] = parsedJson
              .filter(
                (item) =>
                  typeof item === "object" && item !== null && key in item,
              )
              .map((item) => (item as Record<string, unknown>)[key]);
          });
          setResult(JSON.stringify(extracted, null, 2));
        }
      } else if (typeof parsedJson === "object" && parsedJson !== null) {
        const extracted: Record<string, unknown> = {};
        keys.forEach((key) => {
          if (key in parsedJson) {
            extracted[key] = (parsedJson as Record<string, unknown>)[key];
          }
        });

        if (outputFormat === "array") {
          setResult(JSON.stringify([extracted], null, 2));
        } else {
          setResult(JSON.stringify(extracted, null, 2));
        }
      } else {
        setError("JSON input must be an object or array of objects");
      }
    } catch (e) {
      setError(`Extraction error: ${(e as Error).message}`);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "extracted-keys.json";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Result downloaded!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            JSON Key-Value Extractor
          </h1>
          <p className="text-muted-foreground">
            Extract specific keys from JSON objects or arrays. Paste your JSON,
            enter the key names you want to extract, and get clean, filtered
            results instantly.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <label
              htmlFor="keyNames"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Key Names (comma-separated)
            </label>
            <input
              id="keyNames"
              type="text"
              value={keyNames}
              onChange={(e) => setKeyNames(e.target.value)}
              placeholder="e.g., id, name, email"
              className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            <div className="mt-4">
              <span className="block text-sm font-medium text-foreground mb-2">
                Output Format
              </span>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="outputFormat"
                    value="array"
                    checked={outputFormat === "array"}
                    onChange={() => setOutputFormat("array")}
                    className="mr-2"
                  />
                  <span className="text-foreground">Array of Objects</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="outputFormat"
                    value="object"
                    checked={outputFormat === "object"}
                    onChange={() => setOutputFormat("object")}
                    className="mr-2"
                  />
                  <span className="text-foreground">Single Object</span>
                </label>
              </div>
            </div>

            <button
              onClick={extractKeys}
              className="w-full mt-6 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Extract Keys
            </button>
          </div>

          <div>
            <label
              htmlFor="jsonInput"
              className="block text-sm font-medium text-foreground mb-2"
            >
              JSON Input
            </label>
            <JsonEditor
              value={jsonInput}
              onChange={setJsonInput}
              placeholder={`[\n  {"id": 1, "name": "John", "email": "john@example.com"},\n  {"id": 2, "name": "Jane", "email": "jane@example.com"}\n]`}
            />
          </div>
        </div>

        {(result || error) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">
                {error ? "Error" : "Extracted Result"}
              </h2>
              {result && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="text-sm px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadResult}
                    className="text-sm px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
            {error ? (
              <p className="text-destructive text-sm">{error}</p>
            ) : (
              <JsonEditor
                value={result || ""}
                readOnly
                placeholder="Extracted result will appear here..."
              />
            )}
          </div>
        )}

        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            About JSON Key-Value Extractor
          </h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4">
              Working with large JSON datasets often means wading through fields
              you don't need. Whether you're cleaning API responses, preparing
              data for analysis, or debugging nested structures, manually
              filtering JSON is tedious. This JSON key extractor solves that
              problem by letting you specify exactly which keys you want to
              keep, then instantly generating a clean, filtered result.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              How to Extract Keys from JSON
            </h3>
            <ol className="space-y-2 text-muted-foreground mb-6">
              <li>
                Paste your JSON object or array of objects into the input field
              </li>
              <li>
                Enter the key names you want to extract, separated by commas
              </li>
              <li>
                Choose your preferred output format (array or single object)
              </li>
              <li>Click "Extract Keys" and copy your filtered results</li>
            </ol>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>
                <strong>Handles arrays and objects:</strong> Works with both
                single JSON objects and arrays of objects
              </li>
              <li>
                <strong>Flexible output formats:</strong> Choose between array
                of objects or a single grouped object
              </li>
              <li>
                <strong>Instant results:</strong> All processing happens in your
                browser with no server delays
              </li>
              <li>
                <strong>One-click copy:</strong> Copy extracted results to
                clipboard instantly
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-muted-foreground mb-6">
              <div>
                <p className="font-medium text-foreground">
                  Can this tool handle nested JSON objects?
                </p>
                <p>
                  Currently, this extractor works with top-level keys only. For
                  nested key extraction, try our JSON path query tool.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  What happens if a key doesn't exist in the JSON?
                </p>
                <p>
                  Missing keys are silently skipped. The output will only
                  contain keys that were found in the input JSON.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Is my JSON data sent to a server?
                </p>
                <p>
                  No. All processing happens locally in your browser. Your data
                  never leaves your device.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Can I extract keys from a JSON array?
                </p>
                <p>
                  Yes. Paste a JSON array of objects and the tool will extract
                  the specified keys from each object in the array.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  What's the difference between array and object output?
                </p>
                <p>
                  Array output gives you an array of filtered objects. Object
                  output groups all values by key, useful for collecting all
                  values of each field.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Related JSON Tools
            </h3>
            <p className="text-muted-foreground mb-4">
              If you're working with JSON data, you might also find these tools
              useful:
            </p>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <a
                  href="/json-tools/json-formatter-beautifier"
                  className="text-primary hover:underline"
                >
                  Format and beautify messy JSON
                </a>
              </li>
              <li>
                <a
                  href="/json-tools/json-validator"
                  className="text-primary hover:underline"
                >
                  Validate JSON syntax and structure
                </a>
              </li>
              <li>
                <a
                  href="/json-tools/json-filter"
                  className="text-primary hover:underline"
                >
                  Filter JSON arrays by conditions
                </a>
              </li>
              <li>
                <a
                  href="/json-tools/jsonpath-query"
                  className="text-primary hover:underline"
                >
                  Query nested JSON with JSONPath
                </a>
              </li>
              <li>
                <a
                  href="/json-tools/json-to-csv"
                  className="text-primary hover:underline"
                >
                  Convert JSON arrays to CSV format
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
