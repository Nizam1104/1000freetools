"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  ArrowUpDown,
  ArrowDownAZ,
  ArrowUpAZ,
  Copy,
  Check,
} from "lucide-react";
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

  const sortObjectKeys = useCallback(
    (obj: unknown, order: "asc" | "desc"): unknown => {
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
    },
    [],
  );

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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Sorter – Sort JSON Keys Alphabetically
          </h1>
          <p className="text-muted-foreground">
            Sort JSON object keys alphabetically in ascending or descending
            order recursively. Free online JSON Sorter keeps your values intact
            while organizing your data cleanly.
          </p>
        </div>

        {/* Why Sort Keys */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-5 border">
            <h2 className="text-lg font-semibold mb-3">Why Sort JSON Keys?</h2>
            <p className="text-muted-foreground mb-4">
              Your JSON object has keys in random order that makes it hard to
              read or compare. Maybe you need consistent ordering for version
              control diffs or just want properties organized logically.
              Manually reordering keys in nested structures takes forever.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Benefits of Sorted Keys:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Cleaner git diffs</li>
                  <li>• Easier to read and navigate</li>
                  <li>• Consistent output for comparisons</li>
                  <li>• Better for documentation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Sort Options:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Ascending (A to Z)</li>
                  <li>• Descending (Z to A)</li>
                  <li>• Recursive (all nesting levels)</li>
                  <li>• Custom indentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Example */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Example</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Input (Unsorted)
                </h3>
                <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto">
                  {`{
  "zebra": "z",
  "apple": "a",
  "mango": "m"
}`}
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Output (Sorted A→Z)
                </h3>
                <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto">
                  {`{
  "apple": "a",
  "mango": "m",
  "zebra": "z"
}`}
                </pre>
              </CardContent>
            </Card>
          </div>
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
                  htmlFor="sortOrder"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Sort Order:
                </Label>
                <Select
                  value={sortOrder}
                  onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">
                      <div className="flex items-center gap-2">
                        <ArrowUpAZ className="h-4 w-4" />A → Z
                      </div>
                    </SelectItem>
                    <SelectItem value="desc">
                      <div className="flex items-center gap-2">
                        <ArrowDownAZ className="h-4 w-4" />Z → A
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label
                  htmlFor="indent"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
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
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[500px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
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

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Sorter</h2>
        <p className="text-muted-foreground mb-6">
          JSON object key order doesn't affect parsing but matters for
          readability and diff comparison. This tool sorts JSON keys
          alphabetically at all nesting levels. Consistent key ordering makes
          version control diffs cleaner and data comparison easier.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the sorter works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON and click Sort JSON. The tool parses your input,
          recursively sorts all object keys alphabetically, and outputs the
          result with consistent formatting. Array order is preserved since
          arrays are ordered by definition.
        </p>
        <p className="text-muted-foreground mb-8">
          Nested objects get sorted at every level. The output uses 2-space
          indentation by default. Use Copy to grab the sorted JSON or Download
          to save it as a file.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're comparing two JSON files and key order differences are
          cluttering the diff. Or your team has inconsistent key ordering and
          you want to standardize. This tool also helps when preparing JSON for
          documentation where consistent order improves readability.
        </p>
        <p className="text-muted-foreground mb-8">
          Key sorting is cosmetic, not functional. JSON parsers don't guarantee
          key order. Don't rely on key order for application logic. Use arrays
          when order matters.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">
              Does sorting affect data meaning?
            </p>
            <p className="text-muted-foreground">
              No, JSON objects are unordered by specification. Sorting only
              changes presentation, not the actual data.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Are arrays sorted too?</p>
            <p className="text-muted-foreground">
              No, array order is preserved. Only object keys get sorted
              alphabetically.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">What about nested objects?</p>
            <p className="text-muted-foreground">
              All nested objects are sorted recursively. Every level gets
              alphabetically ordered keys.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">
              Can I sort by value instead of key?
            </p>
            <p className="text-muted-foreground">
              Not in this version. The tool sorts by key name only. Value-based
              sorting would require different logic.
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Why would I need sorted JSON?</p>
            <p className="text-muted-foreground">
              Sorted JSON produces consistent output for testing, cleaner git
              diffs, and easier visual comparison of files.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a
              href="/json-tools/json-formatter-beautifier"
              className="text-primary hover:underline"
            >
              JSON Formatter
            </a>{" "}
            – Format JSON with proper indentation
          </li>
          <li>
            <a
              href="/json-tools/json-diff"
              className="text-primary hover:underline"
            >
              JSON Diff
            </a>{" "}
            – Compare two JSON objects
          </li>
          <li>
            <a
              href="/json-tools/json-minifier"
              className="text-primary hover:underline"
            >
              JSON Minifier
            </a>{" "}
            – Compress JSON to single line
          </li>
        </ul>
      </div>
    </div>
  );
}
