"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import {
  FileJson,
  RotateCcw,
  Trash2,
  Copy,
  Download,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { toast } from "sonner";

export default function JsonPlaygroundPage() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const processJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);

      let output: string;
      if (sortKeys) {
        const sorted = JSON.parse(
          JSON.stringify(parsed, Object.keys(parsed).sort(), indent),
        );
        output = JSON.stringify(
          parsed,
          (key, value) => {
            if (value && typeof value === "object" && !Array.isArray(value)) {
              return Object.keys(value)
                .sort()
                .reduce((sorted: any, k) => {
                  sorted[k] = value[k];
                  return sorted;
                }, {});
            }
            return value;
          },
          indent,
        );
      } else {
        output = JSON.stringify(parsed, null, indent);
      }

      setResult(output);
      setIsValid(true);
      toast.success("JSON formatted");
    } catch (e) {
      setResult((e as Error).message);
      setIsValid(false);
      toast.error("Invalid JSON");
    }
  }, [input, indent, sortKeys]);

  const minifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setResult(JSON.stringify(parsed));
      setIsValid(true);
      toast.success("JSON minified");
    } catch (e) {
      setResult((e as Error).message);
      setIsValid(false);
      toast.error("Invalid JSON");
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setResult(null);
    setIsValid(null);
  };

  const loadSample = () => {
    setInput(
      '{"name":"John","age":30,"city":"NYC","hobbies":["reading","coding"],"active":true}',
    );
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result && isValid) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formatted.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Result downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Playground – Live JSON Editor Online
          </h1>
          <p className="text-muted-foreground">
            Edit JSON in a live interactive playground and see formatted output
            instantly. Our free JSON Playground is the perfect environment for
            experimenting, learning, and testing JSON.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
                <div className="flex items-center gap-2">
                  <Label htmlFor="indent" className="text-sm whitespace-nowrap">
                    Indent:
                  </Label>
                  <select
                    id="indent"
                    value={indent}
                    onChange={(e) => setIndent(parseInt(e.target.value))}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    <option value={0}>Minified</option>
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sortKeys"
                    checked={sortKeys}
                    onChange={(e) => setSortKeys(e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="sortKeys" className="text-sm cursor-pointer">
                    Sort Keys
                  </Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={minifyJson}>
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && isValid && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadResult}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={processJson}>
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Format
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder='{"name": "John", "age": 30}'
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Output
              </Label>
              <div className="relative">
                <JsonEditor
                  value={result || ""}
                  readOnly
                  placeholder="Formatted output will appear here..."
                />
                {isValid !== null && (
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${isValid
                        ? "bg-green-500 text-white"
                        : "bg-destructive text-white"
                      }`}
                  >
                    {isValid ? "Valid JSON" : "Invalid JSON"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Playground</h2>
          <p className="text-muted-foreground mb-6">
            Working with JSON often means switching between editors, validators,
            and formatters. A single interactive space where you can paste,
            format, minify, and experiment with JSON makes development faster.
            This JSON Playground gives you a live editor with instant feedback
            on your JSON structure.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Type or paste JSON into the Input panel on the left. Choose your
            formatting preference from the Indent dropdown (2, 4, or 8 spaces)
            or check Sort Keys to alphabetize object properties. Click Format to
            see the formatted result in the Output panel.
          </p>
          <p className="text-muted-foreground mb-8">
            The Output panel shows a Valid or Invalid badge based on JSON
            syntax. Use the Minify button to compress JSON into a single line.
            The side-by-side view lets you compare input and output while you
            work.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers debugging API responses often receive minified JSON that
            is hard to read. Paste it here to instantly see a formatted version.
            Students learning JSON syntax can experiment and see validation
            feedback in real time.
          </p>
          <p className="text-muted-foreground mb-8">
            This is a client-side tool, so large files might slow down your
            browser. For JSON files over 10MB, consider using a dedicated
            desktop editor. The playground works best for typical API payloads
            and configuration files.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Does this validate JSON syntax?
              </p>
              <p className="text-muted-foreground">
                Yes. The Output panel displays Valid JSON or Invalid JSON based
                on whether your input parses correctly.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What does Sort Keys do?</p>
              <p className="text-muted-foreground">
                It alphabetizes all object keys at every nesting level. This
                helps compare JSON objects where key order differs.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I edit the formatted output?
              </p>
              <p className="text-muted-foreground">
                The Output panel is read-only. Edit the Input panel and click
                Format again to update the result.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my JSON stored anywhere?</p>
              <p className="text-muted-foreground">
                No. Everything runs in your browser. Nothing is sent to servers
                or stored after you close the page.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What indent options are available?
              </p>
              <p className="text-muted-foreground">
                Choose from Minified (no spaces), 2 spaces, 4 spaces, or 8
                spaces using the Indent dropdown.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-formatter"
                className="text-primary hover:underline"
              >
                JSON Formatter
              </a>{" "}
              – Format JSON with customizable indentation
            </li>
            <li>
              <a
                href="/json-tools/json-minifier"
                className="text-primary hover:underline"
              >
                JSON Minifier
              </a>{" "}
              – Compress JSON by removing whitespace
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Check JSON for syntax errors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
