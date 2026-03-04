"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Key, Copy, Check, List } from "lucide-react";
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
  const [outputFormat, setOutputFormat] = useState<"list" | "json" | "csv">("list");
  const [copied, setCopied] = useState(false);
  const [includePaths, setIncludePaths] = useState(false);

  const extractKeys = useCallback((obj: unknown, prefix = ""): string[] => {
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
      const fullPath = includePaths ? (prefix ? `${prefix}.${key}` : key) : key;
      result.push(fullPath);
      result.push(...extractKeys(value, fullPath));
    }

    return result;
  }, [includePaths]);

  const getUniqueKeys = useCallback((allKeys: string[]): string[] => {
    if (includePaths) {
      return [...new Set(allKeys)];
    }
    return [...new Set(allKeys.map((k) => k.split(".").pop()?.replace(/\[\d+\]/g, "") || k))].sort();
  }, [includePaths]);

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

  const formatOutput = (keyList: string[], format: "list" | "json" | "csv"): string => {
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

  const formattedOutput = useMemo(() => formatOutput(keys, outputFormat), [keys, outputFormat]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Key Extractor – Extract All JSON Keys</h1>
          <p className="text-muted-foreground">
            Extract every unique key from any JSON object or array with one click. Our free JSON Key Extractor outputs a clean list of all keys for quick analysis and mapping.
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
                <Label htmlFor="format" className="text-sm text-muted-foreground whitespace-nowrap">
                  Output Format:
                </Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as "list" | "json" | "csv")}>
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
                <Label htmlFor="includePaths" className="text-sm text-muted-foreground cursor-pointer">
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
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  Extracted Keys ({keys.length})
                </Label>
                {keys.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={copyOutput}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </div>
              <Textarea
                id="output"
                value={formattedOutput}
                readOnly
                placeholder="Extracted keys will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
