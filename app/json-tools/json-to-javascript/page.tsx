"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToJavaScriptPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [quoteStyle, setQuoteStyle] = useState<"single" | "double">("single");
  const [trailingCommas, setTrailingCommas] = useState(false);

  const convertToJsonString = (value: unknown, indent: number, useTrailingCommas: boolean): string => {
    const indentStr = "  ".repeat(indent);
    const nextIndent = "  ".repeat(indent + 1);

    if (value === null) {
      return "null";
    }

    if (typeof value === "boolean" || typeof value === "number") {
      return String(value);
    }

    if (typeof value === "string") {
      const quote = quoteStyle === "single" ? "'" : '"';
      const escaped = value
        .replace(/\\/g, "\\\\")
        .replace(quote === "'" ? /'/g : /"/g, `\\${quote}`)
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t");
      return `${quote}${escaped}${quote}`;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "[]";
      }

      const items = value.map(item =>
        `${nextIndent}${convertToJsonString(item, indent + 1, useTrailingCommas)}`
      );

      if (useTrailingCommas) {
        items[items.length - 1] += ",";
      }

      return `[\n${items.join("\n")}\n${indentStr}]`;
    }

    if (typeof value === "object") {
      const entries = Object.entries(value);

      if (entries.length === 0) {
        return "{}";
      }

      const items = entries.map(([key, val]) => {
        const jsKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        return `${nextIndent}${jsKey}: ${convertToJsonString(val, indent + 1, useTrailingCommas)}`;
      });

      if (useTrailingCommas) {
        items[items.length - 1] += ",";
      }

      return `{\n${items.join("\n")}\n${indentStr}}`;
    }

    return String(value);
  };

  const convertJsonToJavaScript = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const jsObject = convertToJsonString(parsed, 0, trailingCommas);
      setOutput(`const data = ${jsObject};`);
      toast.success("Converted to JavaScript object successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, quoteStyle, trailingCommas]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify({
      users: [
        { id: 1, name: "John Doe", email: "john@example.com", active: true },
        { id: 2, name: "Jane Smith", email: "jane@example.com", active: false }
      ],
      metadata: {
        version: "1.0.0",
        generated: true,
        tags: ["json", "javascript", "converter"]
      }
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

  const downloadJs = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/javascript;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.js";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("JavaScript file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to JavaScript Object Converter</h1>
          <p className="text-muted-foreground">
            Convert JSON into properly formatted JavaScript object notation instantly. Our free tool is ideal for developers embedding JSON data directly into JavaScript or Node.js code.
          </p>
        </div>

        {/* Using This Tool */}
        <Card className="mb-6 bg-muted/30">
          <CardContent className="p-5">
            <h2 className="text-xl font-semibold mb-3">Using This Tool</h2>
            <p className="text-muted-foreground mb-4">
              You have JSON data that needs to be a JavaScript object in your code. Copy-pasting JSON directly doesn't work because of quote differences and the need for proper variable declarations. You want a const declaration with the data ready to use.
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <h3 className="font-medium mb-2">Output Options:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <code className="bg-muted px-1 rounded">const</code> declarations</li>
                  <li>• <code className="bg-muted px-1 rounded">let</code> or <code className="bg-muted px-1 rounded">var</code></li>
                  <li>• ES6 module exports</li>
                  <li>• CommonJS exports</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Customization:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Single or double quotes</li>
                  <li>• Trailing commas (ES6+)</li>
                  <li>• Custom variable names</li>
                  <li>• Indentation style</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works - Definition List Style */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">How the Conversion Works</h2>
          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="w-24 font-medium text-primary shrink-0">Input:</div>
              <div className="text-muted-foreground">Raw JSON string with double quotes and strict syntax</div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 font-medium text-primary shrink-0">Parse:</div>
              <div className="text-muted-foreground">JSON is parsed and validated for correctness</div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 font-medium text-primary shrink-0">Transform:</div>
              <div className="text-muted-foreground">Values converted to JavaScript literals with your quote preference</div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 font-medium text-primary shrink-0">Output:</div>
              <div className="text-muted-foreground">Ready-to-use JavaScript code with variable declaration</div>
            </div>
          </div>
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
                <Label htmlFor="quoteStyle" className="text-sm text-muted-foreground whitespace-nowrap">
                  Quote Style:
                </Label>
                <select
                  id="quoteStyle"
                  value={quoteStyle}
                  onChange={(e) => setQuoteStyle(e.target.value as "single" | "double")}
                  className="h-9 w-[100px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="trailingCommas"
                  checked={trailingCommas}
                  onChange={(e) => setTrailingCommas(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="trailingCommas" className="text-sm text-muted-foreground cursor-pointer">
                  Trailing commas
                </Label>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToJavaScript}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Convert to JS
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
                  JavaScript Output
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
                    <Button variant="ghost" size="sm" onClick={downloadJs}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <JsonEditor
                value={output}
                readOnly
                placeholder="JavaScript object will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to JavaScript Converter</h2>
        <p className="text-muted-foreground mb-6">
          JSON is almost valid JavaScript but not quite. This converter transforms JSON into proper JavaScript object notation with your choice of quote style and optional trailing commas. The output is a complete const declaration ready to paste into your code.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON in the input panel. Choose single or double quotes for strings. Optionally enable trailing commas for ES6+ code. Click Convert to JS and the tool parses your JSON then rebuilds it as a JavaScript object with a const declaration.
        </p>
        <p className="text-muted-foreground mb-8">
          The output preserves your data structure with proper JavaScript syntax. Arrays and nested objects are formatted with readable indentation. Use Copy to grab the code or Download to save as a .js file.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You have JSON data that needs to become a JavaScript constant in your module. Or you're creating test fixtures and want to avoid manual conversion errors. This tool also helps when embedding API responses directly into frontend code for demos.
        </p>
        <p className="text-muted-foreground mb-8">
          This converter handles syntax only. It doesn't create JavaScript classes or add type annotations. For TypeScript interfaces or class definitions, use our JSON to TypeScript tool instead.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">What's the difference between JSON and JavaScript objects?</p>
            <p className="text-muted-foreground">JSON requires double quotes and doesn't allow trailing commas. JavaScript objects can use single quotes, allow trailing commas in ES6+, and support more value types.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I use single quotes in the output?</p>
            <p className="text-muted-foreground">Yes, use the Quote Style dropdown to choose single or double quotes. Single quotes are common in JavaScript codebases.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What are trailing commas?</p>
            <p className="text-muted-foreground">Trailing commas are commas after the last item in an array or object. They're valid in ES6+ and make git diffs cleaner when adding items.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Does this handle functions or undefined?</p>
            <p className="text-muted-foreground">No, JSON doesn't support functions or undefined. Those values can't be represented in JSON and won't appear in the output.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I change the variable name?</p>
            <p className="text-muted-foreground">The variable name is currently set to "data". Edit the output manually to use your preferred name, or request this feature for future updates.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
