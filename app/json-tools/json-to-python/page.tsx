"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
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
              <JsonEditor
                value={output}
                readOnly
                placeholder="Python dict will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON to Python Converter</h2>
        <p className="text-muted-foreground mb-6">
          Python and JSON look similar but have key differences in syntax. None vs null, True/False vs true/false, and quote handling can trip you up when converting. This tool transforms JSON into valid Python dictionary syntax that you can paste directly into your Python scripts.
        </p>

        <h3 className="text-xl font-semibold mb-3">How the conversion works</h3>
        <p className="text-muted-foreground mb-2">
          Paste your JSON in the left panel and set the variable name you want. Click Convert to Python and the tool parses the JSON, then rebuilds it using Python syntax. Null becomes None, booleans become True/False, and strings use proper escaping.
        </p>
        <p className="text-muted-foreground mb-8">
          The output includes your chosen variable name in a complete assignment statement. Nested objects and arrays are preserved with correct Python syntax. The result is ready to copy into your .py file or Jupyter notebook.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You have a JSON config file that needs to become a Python dict in your code. Or you're writing test data and want to avoid manual conversion errors. This tool also helps when translating API examples from documentation into Python code samples.
        </p>
        <p className="text-muted-foreground mb-8">
          This converter handles syntax translation only. It doesn't create Python classes or dataclasses from your JSON. For object-oriented structures, consider tools that generate Python data models instead.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does this handle nested JSON structures?</p>
            <p className="text-muted-foreground">Yes, nested objects and arrays are fully supported. The tool recursively converts all levels maintaining the original structure.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I change the variable name?</p>
            <p className="text-muted-foreground">Yes, use the Variable Name input to set your preferred name. The default is "data" but you can use any valid Python identifier.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What about special characters in strings?</p>
            <p className="text-muted-foreground">The converter properly escapes backslashes, quotes, newlines, and tabs so the output is valid Python string syntax.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Is the output formatted for readability?</p>
            <p className="text-muted-foreground">Yes, complex structures get multi-line formatting with proper indentation. Simple structures stay on one line for compactness.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I download the result as a .py file?</p>
            <p className="text-muted-foreground">Yes, click the Download button to save the output as data.py. You can rename it or import it directly into your Python project.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-to-javascript" className="text-primary hover:underline">JSON to JavaScript</a> – Convert JSON to JavaScript object notation
          </li>
          <li>
            <a href="/json-tools/json-to-java" className="text-primary hover:underline">JSON to Java</a> – Generate Java class definitions from JSON
          </li>
          <li>
            <a href="/json-tools/json-to-csv" className="text-primary hover:underline">JSON to CSV</a> – Convert JSON arrays to CSV format
          </li>
        </ul>
      </div>
    </div>
  );
}
