"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowUpDown, ArrowDownAZ, ArrowUpAZ, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JsonSorterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [indent, setIndent] = useState("2");
  const [copied, setCopied] = useState(false);

  const sortObjectKeys = useCallback((obj: unknown, order: "asc" | "desc"): unknown => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => sortObjectKeys(item, order));
    }

    const entries = Object.entries(obj);
    const sorted = entries.sort(([a], [b]) => {
      if (order === "asc") {
        return a.localeCompare(b);
      }
      return b.localeCompare(a);
    });

    const result: Record<string, unknown> = {};
    for (const [key, value] of sorted) {
      result[key] = sortObjectKeys(value, order);
    }
    return result;
  }, []);

  const sortJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to sort");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const sorted = sortObjectKeys(parsed, sortOrder);
      const indentSize = parseInt(indent, 10);
      setOutput(JSON.stringify(sorted, null, indentSize));
      toast.success("JSON sorted successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, sortOrder, indent, sortObjectKeys]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = {
      zebra: "last",
      apple: "first",
      nested: {
        zulu: "z",
        alpha: "a",
        mixed: {
          zebra: "z",
          apple: "a",
        },
      },
      array: [
        { name: "item1", id: 1 },
        { name: "item2", id: 2 },
      ],
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Sorter – Sort JSON Keys Alphabetically</h1>
          <p className="text-muted-foreground">
            Sort JSON object keys alphabetically in ascending or descending order recursively. Free online JSON Sorter keeps your values intact while organizing your data cleanly.
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
                <Label htmlFor="sortOrder" className="text-sm text-muted-foreground whitespace-nowrap">
                  Sort Order:
                </Label>
                <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">
                      <div className="flex items-center gap-2">
                        <ArrowUpAZ className="h-4 w-4" />
                        A → Z
                      </div>
                    </SelectItem>
                    <SelectItem value="desc">
                      <div className="flex items-center gap-2">
                        <ArrowDownAZ className="h-4 w-4" />
                        Z → A
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="indent" className="text-sm text-muted-foreground whitespace-nowrap">
                  Indent:
                </Label>
                <Select value={indent} onValueChange={setIndent}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Minified</SelectItem>
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                    <SelectItem value="8">8 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={sortJson}>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort Keys
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
                  Sorted Output
                </Label>
                {output && (
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
                value={output}
                readOnly
                placeholder="Sorted JSON will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
