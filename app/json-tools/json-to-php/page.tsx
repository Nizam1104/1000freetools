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
      </div>
    </div>
  );
}
