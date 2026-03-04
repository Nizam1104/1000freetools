"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Code2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonToPythonPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [variableName, setVariableName] = useState("data");

  const convertToPythonValue = (value: unknown, indent: number): string => {

    if (value === null) {
      return "None";
    }

    if (typeof value === "boolean") {
      return value ? "True" : "False";
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
        .replace(/\t/g, "\\t");
      return `"${escaped}"`;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return "[]";
      }
      const items = value.map(item => convertToPythonValue(item, indent));
      if (items.length <= 3 && items.every(item => !item.includes("\n"))) {
        return `[${items.join(", ")}]`;
      }
      return `[\n${items.map(item => "    ".repeat(indent + 1) + item).join(",\n")}\n${"    ".repeat(indent)}]`;
    }

    if (typeof value === "object") {
      const entries = Object.entries(value);

      if (entries.length === 0) {
        return "{}";
      }

      const items = entries.map(([key, val]) => {
        const pyKey = convertToPythonValue(key, 0);
        const pyVal = convertToPythonValue(val, indent + 1);
        return `${pyKey}: ${pyVal}`;
      });

      if (items.length <= 3 && items.every(item => !item.includes("\n"))) {
        return `{${items.join(", ")}}`;
      }
      return `{\n${items.map(item => "    ".repeat(indent + 1) + item).join(",\n")}\n${"    ".repeat(indent)}}`;
    }

    return String(value);
  };

  const convertJsonToPython = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const pythonDict = convertToPythonValue(parsed, 0);
      setOutput(`${variableName} = ${pythonDict}`);
      toast.success("Converted to Python dict successfully!");
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
        tags: ["json", "python", "converter"]
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

  const downloadPy = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/x-python;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.py";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Python file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Python Dictionary Converter</h1>
          <p className="text-muted-foreground">
            Convert JSON into Python dictionary syntax instantly. Our free JSON to Python Dict tool helps developers quickly translate JSON data into Python-ready code.
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
                  placeholder="data"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToPython}>
                  <Code2 className="h-4 w-4 mr-2" />
                  Convert to Python
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
                  Python Output
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
                    <Button variant="ghost" size="sm" onClick={downloadPy}>
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
                placeholder="Python dict will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
