"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, FileText } from "lucide-react";
import { toast } from "sonner";

export default function JsonToTextConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"key-value" | "hierarchical" | "flat">("key-value");

  const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            Object.assign(result, flattenObject(item as Record<string, unknown>, `${newKey}[${index}]`));
          } else {
            result[`${newKey}[${index}]`] = item;
          }
        });
      } else {
        result[newKey] = value;
      }
    }

    return result;
  };

  const convertToJsonText = useCallback((obj: unknown, level = 0): string => {
    const indent = "  ".repeat(level);

    if (obj === null) {
      return `${indent}(null)`;
    }

    if (typeof obj === "object" && obj !== null) {
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          return `${indent}[]`;
        }
        return obj.map((item, index) => {
          if (typeof item === "object" && item !== null) {
            return `${indent}[${index}]:\n${convertToJsonText(item, level + 1)}`;
          }
          return `${indent}[${index}]: ${convertToJsonText(item, 0).trim()}`;
        }).join("\n");
      }

      const entries = Object.entries(obj);
      if (entries.length === 0) {
        return `${indent}{}`;
      }

      return entries.map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return `${indent}${key}:\n${convertToJsonText(value, level + 1)}`;
        }
        return `${indent}${key}: ${convertToJsonText(value, 0).trim()}`;
      }).join("\n");
    }

    return `${indent}${String(obj)}`;
  }, []);

  const convertJsonToText = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      let result = "";

      if (format === "key-value") {
        const flattened = flattenObject(parsed as Record<string, unknown>);
        result = Object.entries(flattened)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
      } else if (format === "hierarchical") {
        result = convertToJsonText(parsed);
      } else {
        const flattened = flattenObject(parsed as Record<string, unknown>);
        result = Object.entries(flattened)
          .map(([key, value]) => `${key} = ${value}`)
          .join("\n");
      }

      setOutput(result);
      toast.success("Converted to text successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, format, convertToJsonText]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify({
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        address: {
          street: "123 Main St",
          city: "New York",
          zip: "10001"
        },
        hobbies: ["reading", "gaming", "cooking"]
      },
      active: true
    }, null, 2);
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Text file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Plain Text Converter Online</h1>
          <p className="text-muted-foreground">
            Flatten JSON into readable plain text key-value pairs for reports, logs, or documentation. Our free JSON to Text Converter makes complex JSON data human-readable in seconds.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample JSON
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="format" className="text-sm text-muted-foreground whitespace-nowrap">
                  Format:
                </Label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as "key-value" | "hierarchical" | "flat")}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="key-value">Key-Value</option>
                  <option value="hierarchical">Hierarchical</option>
                  <option value="flat">Flat (key = value)</option>
                </select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToText}>
                  <FileText className="h-4 w-4 mr-2" />
                  Convert to Text
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  Text Output
                </Label>
                {output && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyOutput}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadText}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="Text output will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to Text Converter</h2>
        <p className="text-muted-foreground mb-6">
          Sometimes you need JSON data in plain text format for reports, logs, or documentation. This tool flattens JSON structures into readable key-value pairs that anyone can understand, no technical knowledge required.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          Choose from three output formats: Key-Value shows simple colon-separated pairs, Hierarchical preserves the nested structure with indentation, and Flat uses equals signs for configuration-style output.
        </p>
        <p className="text-muted-foreground mb-8">
          The tool processes each JSON property and converts it to text line by line. Nested objects are flattened using dot notation so you can see the full path to each value.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You need to include API response data in a user-facing report or email. Converting to plain text makes the information accessible without requiring JSON parsing knowledge.
        </p>
        <p className="text-muted-foreground mb-8">
          Note that complex nested structures may produce long key paths. For very deep JSON, the hierarchical format maintains better readability than the flattened options.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What happens to arrays in the output?</p>
            <p className="text-muted-foreground">Arrays are shown with index notation like items[0], items[1]. This preserves the order and lets you reference specific array elements in the text output.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I convert the text back to JSON?</p>
            <p className="text-muted-foreground">No, this is a one-way conversion. The text output loses structural information needed to reconstruct the original JSON. Keep your original JSON if you need to convert back.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Which format works best for logs?</p>
            <p className="text-muted-foreground">The Flat format with equals signs works well for log files since it resembles standard configuration file syntax that many logging systems can parse.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Are null values included?</p>
            <p className="text-muted-foreground">Yes, null values appear as (null) in hierarchical format or as empty values in key-value format. This helps identify missing or unset data fields.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I download the text output?</p>
            <p className="text-muted-foreground">Yes. Click the Download button to save the text as a .txt file, or use Copy to paste it directly into your document or email.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
