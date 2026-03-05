"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonEditor } from "@/components/utils/json-editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function JsonStringifyParsePage() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [result, setResult] = useState<string | null>(null);

  const processJson = useCallback(() => {
    setResult(null);

    if (!input.trim()) {
      toast.error("Please enter JSON to process");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const stringified = JSON.stringify(parsed, null, indent);
      setResult(stringified);
      toast.success("JSON processed successfully");
    } catch (e) {
      toast.error(`Error: ${(e as Error).message}`);
    }
  }, [input, indent]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    setInput('{"name":"John","age":30,"city":"NYC","nested":{"a":1,"b":2}}');
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
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
            JSON Stringify & Parse Playground Online
          </h1>
          <p className="text-muted-foreground">
            Experiment with JSON.stringify and JSON.parse options interactively
            in your browser. Our free playground is perfect for learning JSON
            serialization and testing edge cases in JavaScript.
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
                  <Input
                    id="indent"
                    type="number"
                    value={indent}
                    onChange={(e) => setIndent(parseInt(e.target.value) || 0)}
                    min={0}
                    max={10}
                    className="w-20 h-9"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="noIndent"
                    checked={indent === 0}
                    onCheckedChange={(checked) => setIndent(checked ? 0 : 2)}
                  />
                  <Label htmlFor="noIndent" className="text-sm">
                    Minified
                  </Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && (
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
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Process
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input/Output */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input (JSON.parse)
              </Label>
              <JsonEditor
                value={input}
                onChange={setInput}
                placeholder='{"name":"John","age":30}'
              />
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Output (JSON.stringify)
                </Label>
                <JsonEditor
                  value={result}
                  readOnly
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-2">
              About JSON.stringify options
            </h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <code className="bg-muted px-2 py-0.5 rounded">
                  JSON.stringify(value, replacer, space)
                </code>
              </p>
              <p>
                <strong>replacer:</strong> Function or array to filter/transform
                values
              </p>
              <p>
                <strong>space:</strong> Number of spaces (or string) for
                indentation
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Stringify and Parse Playground
          </h2>
          <p className="text-muted-foreground mb-6">
            JavaScript developers work with JSON.stringify and JSON.parse daily,
            but understanding how serialization options affect output takes
            experimentation. This playground lets you test different indent
            settings and see the results instantly without writing code or
            opening a console.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste JSON into the Input section labeled JSON.parse. Set your
            desired indent level using the number input, or check Minified for
            compact output with no whitespace. Click Process to see the
            JSON.stringify result below.
          </p>
          <p className="text-muted-foreground mb-8">
            The tool parses your input and re-serializes it with your chosen
            formatting. Use Load Sample to see a nested example, and use Copy or
            Download to save your formatted output for use in projects.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers preparing JSON for configuration files often need
            specific indentation to match project style guides. This tool
            quickly reformats JSON without requiring a code editor or
            command-line tools.
          </p>
          <p className="text-muted-foreground mb-8">
            This playground handles basic stringify options like indentation. It
            does not implement custom replacer functions or handle special
            JavaScript types like Date or undefined that behave differently in
            actual code.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What does the indent option do?
              </p>
              <p className="text-muted-foreground">
                It controls how many spaces are used for each indentation level
                in the formatted output.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What is minified output?</p>
              <p className="text-muted-foreground">
                Minified JSON has no whitespace or newlines, making it compact
                for transmission but harder for humans to read.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does this handle JSON.parse errors?
              </p>
              <p className="text-muted-foreground">
                Yes. Invalid JSON shows an error message explaining the parsing
                problem.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I use custom replacer functions?
              </p>
              <p className="text-muted-foreground">
                Not in this tool. The playground focuses on the space parameter
                for formatting purposes only.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my data sent anywhere?</p>
              <p className="text-muted-foreground">
                No. All processing happens locally in your browser with no
                network requests.
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
              – Beautify JSON with proper indentation
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
                href="/json-tools/json-playground"
                className="text-primary hover:underline"
              >
                JSON Playground
              </a>{" "}
              – Interactive JSON editor and validator
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
