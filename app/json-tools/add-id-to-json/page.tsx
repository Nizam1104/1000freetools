"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  Copy,
  Download,
  Sparkles,
  Trash2,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IdType = "uuid" | "sequential" | "random-string" | "custom";

export default function AddIdToJsonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [idType, setIdType] = useState<IdType>("uuid");
  const [keyName, setKeyName] = useState("id");
  const [customPattern, setCustomPattern] = useState("");
  const [stringLength, setStringLength] = useState("8");
  const [sequentialStart, setSequentialStart] = useState("1");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateId = useCallback(
    (index: number): string => {
      switch (idType) {
        case "uuid":
          return crypto.randomUUID();
        case "sequential":
          return String(parseInt(sequentialStart) + index);
        case "random-string":
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result = "";
          for (let i = 0; i < parseInt(stringLength); i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return result;
        case "custom":
          return customPattern.replace(/{index}/g, String(index));
        default:
          return crypto.randomUUID();
      }
    },
    [idType, sequentialStart, stringLength, customPattern]
  );

  const addIds = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter a JSON array");
      return;
    }

    try {
      const parsed = JSON.parse(input);

      if (!Array.isArray(parsed)) {
        setError("Input must be a JSON array");
        return;
      }

      const result = parsed.map((item, index) => {
        if (typeof item !== "object" || item === null) {
          return item;
        }
        return {
          [keyName]: generateId(index),
          ...item,
        };
      });

      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input, keyName, generateId]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json-with-ids.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
        { name: "Charlie", email: "charlie@example.com" },
      ],
      null,
      0
    );
    setInput(sample);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Add IDs to JSON Array
          </h1>
          <p className="text-muted-foreground">
            Automatically add unique identifiers to each object in a JSON array.
            Choose from UUID, sequential numbers, random strings, or custom
            patterns.
          </p>
        </div>

        {/* Configuration Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Key Name */}
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="keyName" className="text-sm font-medium mb-2 block">
                ID Key Name
              </Label>
              <Input
                id="keyName"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="id"
                className="h-10"
              />
            </div>

            {/* ID Type */}
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="idType" className="text-sm font-medium mb-2 block">
                ID Type
              </Label>
              <Select value={idType} onValueChange={(v) => setIdType(v as IdType)}>
                <SelectTrigger id="idType" className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uuid">UUID (v4)</SelectItem>
                  <SelectItem value="sequential">Sequential (1, 2, 3...)</SelectItem>
                  <SelectItem value="random-string">Random String</SelectItem>
                  <SelectItem value="custom">Custom Pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Options */}
            {idType === "random-string" && (
              <div className="flex-1 min-w-[150px]">
                <Label
                  htmlFor="stringLength"
                  className="text-sm font-medium mb-2 block"
                >
                  String Length
                </Label>
                <Input
                  id="stringLength"
                  type="number"
                  min="1"
                  max="64"
                  value={stringLength}
                  onChange={(e) => setStringLength(e.target.value)}
                  className="h-10"
                />
              </div>
            )}

            {idType === "sequential" && (
              <div className="flex-1 min-w-[150px]">
                <Label
                  htmlFor="sequentialStart"
                  className="text-sm font-medium mb-2 block"
                >
                  Start From
                </Label>
                <Input
                  id="sequentialStart"
                  type="number"
                  value={sequentialStart}
                  onChange={(e) => setSequentialStart(e.target.value)}
                  className="h-10"
                />
              </div>
            )}

            {idType === "custom" && (
              <div className="flex-[2] min-w-[250px]">
                <Label
                  htmlFor="customPattern"
                  className="text-sm font-medium mb-2 block"
                >
                  Custom Pattern
                </Label>
                <Input
                  id="customPattern"
                  value={customPattern}
                  onChange={(e) => setCustomPattern(e.target.value)}
                  placeholder="user_{index}, item_{index}"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use <code className="bg-muted px-1 rounded">{`{index}`}</code> as
                  placeholder for the index
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-6 pb-6 border-b">
          <Button onClick={addIds} className="h-10 px-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Add IDs
          </Button>
          <Button variant="outline" size="sm" onClick={loadSample}>
            Sample
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Main Content - Input/Output */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-2">
            <Label
              htmlFor="input"
              className="text-sm font-medium text-muted-foreground"
            >
              Input JSON Array
            </Label>
            <div className="relative">
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='[{"name": "Alice"}, {"name": "Bob"}]'
                className={cn(
                  "font-mono text-sm min-h-[400px] resize-y",
                  error && "border-destructive"
                )}
              />
              {error && (
                <div className="absolute bottom-3 left-3 right-3 bg-destructive/10 border border-destructive text-destructive px-3 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-muted-foreground">
                Output with IDs
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  disabled={!output}
                  aria-label="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={downloadJson}
                  disabled={!output}
                  aria-label="Download JSON"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="font-mono text-sm min-h-[400px] resize-y bg-muted"
            />
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 max-w-3xl border-t pt-12">
          <h2 className="text-2xl font-semibold mb-6">
            Add Unique IDs to JSON Arrays Instantly
          </h2>

          <div className="space-y-8 text-muted-foreground">
            <p className="text-base leading-relaxed">
              This tool adds unique identifiers to each object in a JSON array. Paste your data, pick an ID format (UUID, sequential numbers, random strings, or custom patterns), and get back valid JSON ready for databases, APIs, or testing. Everything runs in your browser—no data leaves your machine.
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                How the ID generation works
              </h2>
              <div className="space-y-4">
                <p>
                  The tool parses your input as a JSON array, then iterates through each object and prepends a new key-value pair containing the generated ID. The ID format depends on your selection:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>UUID (v4):</strong> Uses the browser's native{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      crypto.randomUUID()
                    </code>{" "}
                    API to generate RFC 4122 compliant identifiers like{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      550e8400-e29b-41d4-a716-446655440000
                    </code>
                  </li>
                  <li>
                    <strong>Sequential:</strong> Simple incrementing integers starting from your chosen number (1, 2, 3... or 100, 101, 102...)
                  </li>
                  <li>
                    <strong>Random string:</strong> Alphanumeric characters generated client-side using{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      Math.random()
                    </code>
                    , with configurable length from 1 to 64 characters
                  </li>
                  <li>
                    <strong>Custom pattern:</strong> Replace{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      {"{index}"}
                    </code>{" "}
                    with the array position—useful for generating IDs like{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      user_001
                    </code>{" "}
                    or{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      item-2024-1
                    </code>
                  </li>
                </ul>
                <p>
                  The output preserves your original object structure and adds the ID as the first property, maintaining insertion order in modern JavaScript engines.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                When you'd actually use this
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Importing CSV data into a database
                  </p>
                  <p>
                    You exported users from a legacy system as JSON, but there's no primary key. Add sequential IDs before running your INSERT statements into PostgreSQL or MySQL.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Creating mock API responses for frontend development
                  </p>
                  <p>
                    Your backend team hasn't built the endpoint yet. Generate realistic test data with proper UUIDs so your React components can handle real-world response structures.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Preparing data for Firebase or Firestore
                  </p>
                  <p>
                    NoSQL databases often need unique document IDs. Add UUIDs to your JSON array before bulk-importing into Firebase Console or using the Firebase CLI.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Testing React key prop behavior
                  </p>
                  <p>
                    You're debugging a list component and need stable, unique keys. Generate sequential or random IDs to test how your component handles re-renders and list updates.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Converting spreadsheet data for a headless CMS
                  </p>
                  <p>
                    Marketing gave you a Google Sheet of products. After converting to JSON, add custom pattern IDs like{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      prod-{"{index}"}
                    </code>{" "}
                    before importing into Sanity, Contentful, or Strapi.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Limitations and gotchas
              </h2>
              <div className="space-y-3">
                <p>
                  This tool only works with JSON <strong>arrays</strong>—objects with curly braces won't be processed. If your input is a single object or nested structure, wrap it in square brackets first.
                </p>
                <p>
                  Random strings use <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Math.random()</code>, which isn't cryptographically secure. For security-sensitive applications (like session tokens or API keys), use the UUID option instead, which leverages the browser's crypto API.
                </p>
                <p>
                  Very large arrays (thousands of objects) may cause brief browser lag since all processing happens client-side. For massive datasets, consider splitting into smaller chunks or using a Node.js script.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Can I add IDs to nested JSON objects?
                  </h3>
                  <p>
                    No—this tool only adds IDs to the top-level array items. If you need IDs on nested objects, you'd need to flatten your structure first or use a script with recursive traversal.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    What happens if my JSON has syntax errors?
                  </h3>
                  <p>
                    The tool will show an error message with details about what went wrong (missing comma, unmatched bracket, etc.). Fix the syntax issue before clicking "Add IDs".
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Are the UUIDs guaranteed to be unique?
                  </h3>
                  <p>
                    UUID v4 has 122 random bits, giving you about 5.3 × 10³⁶ possible combinations. The odds of collision are astronomically low—practically zero for any real-world use case.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Can I change the ID key name from "id" to something else?
                  </h3>
                  <p>
                    Yes. Use the "ID Key Name" field to specify any property name like{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      userId
                    </code>
                    ,{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      _id
                    </code>{" "}
                    (for MongoDB), or{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      productCode
                    </code>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Does this work with JSONL (JSON Lines) format?
                  </h3>
                  <p>
                    Not directly. JSONL has one JSON object per line without array brackets. You'd need to wrap the lines in square brackets and add commas between objects first.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Is my data sent to a server?
                  </h3>
                  <p>
                    No. All processing happens in your browser using client-side JavaScript. Your JSON never leaves your machine, making this safe for sensitive or proprietary data.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
