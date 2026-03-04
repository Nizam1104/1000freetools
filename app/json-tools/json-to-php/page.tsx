"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToPhpPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [variableName, setVariableName] = useState("$data");

  const convertToPhpValue = (value: unknown, indent: number): string => {
    const indentStr = "    ".repeat(indent);
    
    if (value === null) {
      return "null";
    }
    
    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }
    
    if (typeof value === "number") {
      return String(value);
    }
    
    if (typeof value === "string") {
      const escaped = value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\$/g, "\\$");
      return `"${escaped}"`;
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "[]";
      }
      const items = value.map((item, index) => {
        const itemValue = convertToPhpValue(item, indent + 1);
        return `${indentStr}    ${index} => ${itemValue}`;
      });
      return `[\n${items.join(",\n")}\n${indentStr}]`;
    }
    
    if (typeof value === "object") {
      const entries = Object.entries(value);
      
      if (entries.length === 0) {
        return "[]";
      }
      
      const items = entries.map(([key, val]) => {
        const phpKey = convertToPhpValue(key, 0);
        const phpVal = convertToPhpValue(val, indent + 1);
        return `${indentStr}    ${phpKey} => ${phpVal}`;
      });
      return `[\n${items.join(",\n")}\n${indentStr}]`;
    }
    
    return String(value);
  };

  const convertJsonToPhp = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const phpArray = convertToPhpValue(parsed, 0);
      setOutput(`<?php\n\n${variableName} = ${phpArray};`);
      toast.success("Converted to PHP array successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, variableName]);

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
        tags: ["json", "php", "converter"]
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

  const downloadPhp = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-php;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.php";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("PHP file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to PHP Array Converter – Free Online</h1>
          <p className="text-muted-foreground">
            Convert JSON into PHP associative array syntax instantly. Our free JSON to PHP Array tool makes it easy to use JSON data directly in your PHP scripts and applications.
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
                <Label htmlFor="variableName" className="text-sm text-muted-foreground whitespace-nowrap">
                  Variable Name:
                </Label>
                <input
                  id="variableName"
                  type="text"
                  value={variableName}
                  onChange={(e) => setVariableName(e.target.value)}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="$data"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToPhp}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Convert to PHP
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
                  PHP Output
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
                    <Button variant="ghost" size="sm" onClick={downloadPhp}>
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
                placeholder="PHP array will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON to PHP Array Converter</h2>
          <p className="text-muted-foreground mb-6">
            PHP developers often need to embed configuration data or translate API responses into native PHP arrays. Manually converting JSON syntax to PHP array syntax is error-prone with quotes, commas, and nested structures. This JSON to PHP converter handles the translation automatically.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the Input area. Set the Variable Name for the resulting PHP variable. Click Convert to PHP and the tool generates properly formatted PHP array syntax with correct quoting and nesting.
          </p>
          <p className="text-muted-foreground mb-8">
            Strings are escaped for PHP compatibility. Booleans convert to true and false. Null becomes PHP null. Nested objects and arrays use PHP array syntax with proper indentation. Download saves the result as a .php file.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Laravel developers creating configuration files from JSON settings benefit from quick conversion. WordPress developers importing REST API data into PHP arrays save time using this automated translator.
          </p>
          <p className="text-muted-foreground mb-8">
            The converter handles standard JSON types. PHP-specific features like constants or class instances are not supported. For very large JSON structures, consider breaking into multiple PHP files for maintainability.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div><p className="font-medium mb-1">How are strings escaped?</p><p className="text-muted-foreground">Backslashes, quotes, newlines, and special characters are properly escaped for PHP string literals.</p></div>
            <div><p className="font-medium mb-1">Does it handle nested arrays?</p><p className="text-muted-foreground">Yes. Nested JSON objects and arrays become nested PHP arrays with proper bracket syntax.</p></div>
            <div><p className="font-medium mb-1">What about numeric keys?</p><p className="text-muted-foreground">Object keys are preserved as string keys. PHP arrays use explicit key assignment for clarity.</p></div>
            <div><p className="font-medium mb-1">Can I change the variable name?</p><p className="text-muted-foreground">Yes. Enter any valid PHP variable name in the Variable Name field before conversion.</p></div>
            <div><p className="font-medium mb-1">Is the output valid PHP?</p><p className="text-muted-foreground">Yes. The output is a complete PHP assignment statement ready to include in your scripts.</p></div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/json-tools/json-to-typescript" className="text-primary hover:underline">JSON to TypeScript</a> – Generate TypeScript interfaces from JSON</li>
            <li><a href="/json-tools/php-to-json" className="text-primary hover:underline">PHP to JSON</a> – Convert PHP arrays back to JSON</li>
            <li><a href="/json-tools/json-formatter" className="text-primary hover:underline">JSON Formatter</a> – Beautify JSON before conversion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
