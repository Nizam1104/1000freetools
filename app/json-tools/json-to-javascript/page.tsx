"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[500px] font-mono text-sm resize-none"
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
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder="JavaScript object will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
