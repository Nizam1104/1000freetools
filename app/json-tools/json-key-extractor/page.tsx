"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  Key,
  Copy,
  Check,
  List,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JsonKeyExtractorPage() {
  const [input, setInput] = useState("");
  const [keys, setKeys] = useState<string[]>([]);
  const [outputFormat, setOutputFormat] = useState<"list" | "json" | "csv">(
    "list",
  );
  const [copied, setCopied] = useState(false);
  const [includePaths, setIncludePaths] = useState(false);

  const extractKeys = useCallback(
    (obj: unknown, prefix = ""): string[] => {
      if (obj === null || typeof obj !== "object") {
        return [];
      }

      if (Array.isArray(obj)) {
        const arrayKeys: string[] = [];
        obj.forEach((item, index) => {
          const itemPrefix = includePaths ? `${prefix}[${index}]` : prefix;
          arrayKeys.push(...extractKeys(item, itemPrefix));
        });
        return arrayKeys;
      }

      const entries = Object.entries(obj);
      const result: string[] = [];

      for (const [key, value] of entries) {
        const fullPath = includePaths
          ? prefix
            ? `${prefix}.${key}`
            : key
          : key;
        result.push(fullPath);
        result.push(...extractKeys(value, fullPath));
      }

      return result;
    },
    [includePaths],
  );

  const getUniqueKeys = useCallback(
    (allKeys: string[]): string[] => {
      if (includePaths) {
        return [...new Set(allKeys)];
      }
      return [
        ...new Set(
          allKeys.map(
            (k) =>
              k
                .split(".")
                .pop()
                ?.replace(/\[\d+\]/g, "") || k,
          ),
        ),
      ].sort();
    },
    [includePaths],
  );

  const extractJsonKeys = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to extract keys");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const allKeys = extractKeys(parsed);
      const uniqueKeys = getUniqueKeys(allKeys);
      setKeys(uniqueKeys);
      toast.success(`Extracted ${uniqueKeys.length} unique key(s)`);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, extractKeys, getUniqueKeys]);

  const clearAll = () => {
    setInput("");
    setKeys([]);
  };

  const loadSample = () => {
    const sample = {
      id: 1,
      name: "Example",
      user: {
        id: 101,
        name: "John",
        email: "john@example.com",
        address: {
          street: "123 Main St",
          city: "New York",
          country: "USA",
        },
      },
      items: [
        { id: 1, name: "Item 1", price: 10 },
        { id: 2, name: "Item 2", price: 20 },
      ],
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyOutput = async () => {
    if (keys.length === 0) return;
    const output = formatOutput(keys, outputFormat);
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = async () => {
    if (keys.length === 0) return;
    const output = formatOutput(keys, outputFormat);
    const blob = new Blob([output], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = outputFormat === "json" ? "keys.json" : outputFormat === "csv" ? "keys.csv" : "keys.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Keys downloaded!");
  };

  const formatOutput = (
    keyList: string[],
    format: "list" | "json" | "csv",
  ): string => {
    switch (format) {
      case "list":
        return keyList.join("\n");
      case "json":
        return JSON.stringify(keyList, null, 2);
      case "csv":
        return keyList.join(",");
      default:
        return keyList.join("\n");
    }
  };

  const formattedOutput = useMemo(
    () => formatOutput(keys, outputFormat),
    [keys, outputFormat],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Key Extractor – Extract All JSON Keys
          </h1>
          <p className="text-muted-foreground">
            Extract every unique key from any JSON object or array with one
            click. Our free JSON Key Extractor outputs a clean list of all keys
            for quick analysis and mapping.
          </p>
        </div>

        {/* Controls */}
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
                <Label
                  htmlFor="format"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Output Format:
                </Label>
                <Select
                  value={outputFormat}
                  onValueChange={(v) =>
                    setOutputFormat(v as "list" | "json" | "csv")
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">
                      <div className="flex items-center gap-2">
                        <List className="h-4 w-4" />
                        List
                      </div>
                    </SelectItem>
                    <SelectItem value="json">JSON Array</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includePaths"
                  checked={includePaths}
                  onChange={(e) => setIncludePaths(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label
                  htmlFor="includePaths"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Include full paths
                </Label>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={extractJsonKeys}>
                  <Key className="h-4 w-4 mr-2" />
                  Extract Keys
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <JsonEditor
                id="input"
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here..."
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label
                  htmlFor="output"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Extracted Keys ({keys.length})
                </Label>
                {keys.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyOutput}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadOutput}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                id="output"
                value={formattedOutput}
                readOnly
                placeholder="Extracted keys will appear here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Key Extractor
          </h2>
          <p className="text-muted-foreground mb-6">
            Understanding what keys exist in a JSON structure is essential for
            writing parsing code. This tool extracts every unique key from your
            JSON and outputs them as a clean list, JSON array, or CSV for easy
            reference.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON and click Extract Keys. The tool recursively
            traverses all nested objects and arrays, collecting every unique key
            it finds. Results appear in the output panel on the right.
          </p>
          <p className="text-muted-foreground mb-8">
            Choose your output format: List (one key per line), JSON Array, or
            CSV. Enable "Include full paths" to see the complete path to each
            key instead of just the key names.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You're writing TypeScript interfaces or validation schemas for an
            API response. Extract all keys first to ensure you don't miss any
            fields in your type definitions.
          </p>
          <p className="text-muted-foreground mb-8">
            This extracts keys but doesn't show their values or types. For
            complete structural analysis including value types, use the JSON
            Explainer or a schema inference tool.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What output formats are available?
              </p>
              <p className="text-muted-foreground">
                Choose from List (newline-separated), JSON Array, or CSV format.
                Select using the Output Format dropdown.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What does "Include full paths" do?
              </p>
              <p className="text-muted-foreground">
                When enabled, keys show their full path like
                "user.profile.email" instead of just "email". This helps
                identify where each key appears.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Are duplicate keys shown multiple times?
              </p>
              <p className="text-muted-foreground">
                No, only unique keys are shown. If "user.name" appears in
                multiple places, it's listed once unless you enable full paths.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Does it work with arrays?</p>
              <p className="text-muted-foreground">
                Yes, keys inside array elements are extracted. Array indices are
                shown in paths when "Include full paths" is enabled.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">How do I save the key list?</p>
              <p className="text-muted-foreground">
                Use the Copy button to paste into your code or documentation.
                The formatted output is ready to use in any text editor.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
