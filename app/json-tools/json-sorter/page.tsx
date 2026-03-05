"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/ui/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  Trash2,
  ArrowUpDown,
  ArrowDownAZ,
  ArrowUpAZ,
  Copy,
  Check,
  ChevronDown,
  SortAsc,
  SortDesc,
  Hash,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortMode = "key-asc" | "key-desc" | "value-asc" | "value-desc";

/** Recursively collect all unique object keys from any JSON value */
function collectKeys(
  value: unknown,
  keys: Set<string> = new Set(),
): Set<string> {
  if (value === null || typeof value !== "object") return keys;
  if (Array.isArray(value)) {
    value.forEach((item) => collectKeys(item, keys));
  } else {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      keys.add(k);
      collectKeys(v, keys);
    }
  }
  return keys;
}

/** Sort an object's keys alphabetically */
function sortByKey(obj: unknown, order: "asc" | "desc"): unknown {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => sortByKey(item, order));

  const entries = Object.entries(obj as Record<string, unknown>);
  entries.sort(([a], [b]) =>
    order === "asc" ? a.localeCompare(b) : b.localeCompare(a),
  );
  const result: Record<string, unknown> = {};
  for (const [k, v] of entries) result[k] = sortByKey(v, order);
  return result;
}

/** Compare two primitive values for sorting */
function compareValues(a: unknown, b: unknown, order: "asc" | "desc"): number {
  const aStr = a === null || a === undefined ? "" : String(a);
  const bStr = b === null || b === undefined ? "" : String(b);

  // Attempt numeric comparison
  const aNum = Number(a);
  const bNum = Number(b);
  let cmp: number;
  if (!isNaN(aNum) && !isNaN(bNum)) {
    cmp = aNum - bNum;
  } else {
    cmp = aStr.localeCompare(bStr);
  }
  return order === "asc" ? cmp : -cmp;
}

/** Sort array of objects by a specific key's value */
function sortArrayByValue(
  arr: unknown[],
  targetKey: string,
  order: "asc" | "desc",
): unknown[] {
  return [...arr].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)?.[targetKey];
    const bVal = (b as Record<string, unknown>)?.[targetKey];
    return compareValues(aVal, bVal, order);
  });
}

/** Recursively sort objects: for each array containing objects, sort by the target key's value */
function sortByValue(
  obj: unknown,
  targetKey: string,
  order: "asc" | "desc",
): unknown {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    const sorted = sortArrayByValue(obj, targetKey, order);
    return sorted.map((item) => sortByValue(item, targetKey, order));
  }
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    result[k] = sortByValue(v, targetKey, order);
  }
  return result;
}

export default function JsonSorterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("key-asc");
  const [selectedKey, setSelectedKey] = useState<string>("__all__");
  const [indent, setIndent] = useState("2");
  const [copied, setCopied] = useState(false);

  /** Parse input silently to extract available keys */
  const parsedInput = useMemo(() => {
    if (!input.trim()) return null;
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  }, [input]);

  const availableKeys = useMemo(() => {
    if (!parsedInput) return [];
    return Array.from(collectKeys(parsedInput)).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [parsedInput]);

  const sortJson = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to sort");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const indentSize = parseInt(indent, 10);

      let sorted: unknown;

      if (sortMode === "key-asc") {
        sorted = sortByKey(parsed, "asc");
      } else if (sortMode === "key-desc") {
        sorted = sortByKey(parsed, "desc");
      } else {
        // value-based sorting
        const order = sortMode === "value-asc" ? "asc" : "desc";
        const key = selectedKey === "__all__" ? "" : selectedKey;

        if (!key) {
          toast.error("Please select a specific key to sort by value");
          return;
        }
        sorted = sortByValue(parsed, key, order);
      }

      setOutput(JSON.stringify(sorted, null, indentSize));
      toast.success("JSON sorted successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, sortMode, selectedKey, indent]);

  const clearAll = () => {
    setInput("");
    setOutput("");
    setSelectedKey("__all__");
  };

  const loadSample = () => {
    const sample = [
      { name: "Charlie", age: 35, score: 78, city: "Chicago" },
      { name: "Alice", age: 28, score: 92, city: "Austin" },
      { name: "Bob", age: 22, score: 85, city: "Boston" },
      { name: "Diana", age: 31, score: 67, city: "Denver" },
    ];
    setInput(JSON.stringify(sample, null, 2));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const isValueSort = sortMode === "value-asc" || sortMode === "value-desc";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Sorter – Sort JSON Keys &amp; Values
          </h1>
          <p className="text-muted-foreground">
            Sort JSON by key name (A→Z / Z→A) or by any key's value. Select a
            specific key from the dropdown to sort arrays of objects by that
            field. Works recursively at all nesting levels.
          </p>
        </div>

        {/* Sort Mode Tabs */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-start">
              {/* Sort Mode Selector */}
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  Sort By
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "key-asc", label: "Key A→Z", Icon: ArrowUpAZ },
                      {
                        value: "key-desc",
                        label: "Key Z→A",
                        Icon: ArrowDownAZ,
                      },
                      { value: "value-asc", label: "Value ↑", Icon: SortAsc },
                      { value: "value-desc", label: "Value ↓", Icon: SortDesc },
                    ] as {
                      value: SortMode;
                      label: string;
                      Icon: React.ElementType;
                    }[]
                  ).map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      onClick={() => setSortMode(value)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                        sortMode === value
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-auto w-px bg-border mx-1 self-stretch hidden sm:block" />

              {/* Key Selector — always visible, required for value sort */}
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {isValueSort ? "Sort Key (required)" : "Filter Key"}
                </Label>
                <Select value={selectedKey} onValueChange={setSelectedKey}>
                  <SelectTrigger
                    className={`w-[200px] ${
                      isValueSort && selectedKey === "__all__"
                        ? "border-orange-400 text-orange-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a key…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__all__">
                      {isValueSort ? "— pick a key —" : "All keys"}
                    </SelectItem>
                    {availableKeys.length > 0 ? (
                      availableKeys.map((k) => (
                        <SelectItem key={k} value={k}>
                          {k}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="__none__" disabled>
                        {input.trim()
                          ? "No keys found"
                          : "Paste JSON to see keys"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {isValueSort && selectedKey === "__all__" && (
                  <p className="text-xs text-orange-500 mt-0.5">
                    Pick a key to sort array items by its value
                  </p>
                )}
              </div>

              <div className="h-auto w-px bg-border mx-1 self-stretch hidden sm:block" />

              {/* Indent */}
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                  Indent
                </Label>
                <Select value={indent} onValueChange={setIndent}>
                  <SelectTrigger className="w-[110px]">
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

              {/* Actions */}
              <div className="flex flex-col gap-1">
                <Label className="text-xs text-muted-foreground uppercase tracking-wide opacity-0 select-none">
                  Actions
                </Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={loadSample}>
                    <FileJson className="h-4 w-4 mr-2" />
                    Sample
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button onClick={sortJson}>
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort JSON
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Editor */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="json-input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <JsonEditor
                id="json-input"
                value={input}
                onChange={setInput}
                placeholder="Paste your JSON here…"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label
                  htmlFor="json-output"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Sorted Output
                </Label>
                {output && (
                  <Button variant="ghost" size="sm" onClick={copyOutput}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                )}
              </div>
              <JsonEditor
                id="json-output"
                value={output}
                readOnly
                placeholder="Sorted JSON will appear here…"
              />
            </CardContent>
          </Card>
        </div>

        {/* Feature explainer cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: ArrowUpAZ,
              title: "Key A→Z",
              desc: "Sort every object's keys in ascending alphabetical order — recursively at all nesting levels.",
            },
            {
              icon: ArrowDownAZ,
              title: "Key Z→A",
              desc: "Sort every object's keys in descending alphabetical order — works on nested objects too.",
            },
            {
              icon: SortAsc,
              title: "Value ↑",
              desc: "Sort array items by a selected key's value in ascending order. Numbers and strings both supported.",
            },
            {
              icon: SortDesc,
              title: "Value ↓",
              desc: "Sort array items by a selected key's value in descending order. Numeric comparison used when possible.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border bg-card p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold text-sm">{title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Example */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Examples</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Sort by Key (A→Z)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Before</p>
                    <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto">{`{
  "zebra": 1,
  "apple": 2,
  "mango": 3
}`}</pre>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">After</p>
                    <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto">{`{
  "apple": 2,
  "mango": 3,
  "zebra": 1
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Sort by Value (age ↑)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Before</p>
                    <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto">{`[
  {"name":"Bob","age":35},
  {"name":"Alice","age":22}
]`}</pre>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">After</p>
                    <pre className="text-xs bg-muted/50 p-3 rounded overflow-auto">{`[
  {"name":"Alice","age":22},
  {"name":"Bob","age":35}
]`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-4 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Sorter</h2>
          <p className="text-muted-foreground mb-6">
            JSON object key order doesn't affect parsing but matters for
            readability and diff comparison. This tool sorts JSON keys
            alphabetically at all nesting levels, or sorts JSON arrays by any
            key's value. Consistent key ordering makes version control diffs
            cleaner and data comparison easier.
          </p>

          <h3 className="text-xl font-semibold mb-3">Sort by Key Name</h3>
          <p className="text-muted-foreground mb-6">
            Choose <strong>Key A→Z</strong> or <strong>Key Z→A</strong> to
            reorder every object's properties alphabetically. This works
            recursively — every nested object at every depth gets sorted. Array
            items are not reordered (arrays are inherently ordered by position).
          </p>

          <h3 className="text-xl font-semibold mb-3">Sort by Value</h3>
          <p className="text-muted-foreground mb-6">
            Choose <strong>Value ↑</strong> or <strong>Value ↓</strong>, then
            pick a key from the dropdown. The tool finds all arrays of objects
            and sorts them by the selected key's value. Numeric keys sort
            numerically; string keys sort lexicographically. The key dropdown is
            auto-populated from your JSON — just paste your data and all
            available keys appear instantly.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            {[
              {
                q: "Does sorting affect data meaning?",
                a: "No. JSON objects are unordered by specification. Sorting only changes presentation. Values are never modified.",
              },
              {
                q: "Are arrays sorted by key sort?",
                a: "No. Key sort reorders properties within objects only. Array element order is always preserved. Value sort specifically reorders array items.",
              },
              {
                q: "How does value sort work for nested arrays?",
                a: "It recurses through all nested structures. Any array of objects at any nesting level gets sorted by the selected key.",
              },
              {
                q: "What if my value is a number vs string?",
                a: "Numeric values are compared as numbers. Strings are compared lexicographically. Mixed types fall back to string comparison.",
              },
              {
                q: "Why don't I see keys in the dropdown?",
                a: "Paste valid JSON first. The dropdown is populated automatically once your JSON is parsed successfully.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="font-medium mb-1">{q}</p>
                <p className="text-muted-foreground">{a}</p>
              </div>
            ))}
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
    </div>
  );
}
