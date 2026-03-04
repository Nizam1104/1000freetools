"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function JsonObfuscatorPage() {
  const [input, setInput] = useState("");
  const [obfuscateKeys, setObfuscateKeys] = useState(true);
  const [obfuscateValues, setObfuscateValues] = useState(true);
  const [minify, setMinify] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  const generateRandomKey = (length: number): string => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const obfuscateValue = (value: any): any => {
    if (typeof value === "string") {
      return "x".repeat(Math.min(value.length, 50));
    }
    if (typeof value === "number") {
      return Math.random() * 1000;
    }
    if (typeof value === "boolean") {
      return Math.random() > 0.5;
    }
    if (value === null) {
      return null;
    }
    if (Array.isArray(value)) {
      return value.map((item) => obfuscateValue(item));
    }
    if (typeof value === "object") {
      return obfuscateObject(value);
    }
    return value;
  };

  const obfuscateObject = (obj: any): any => {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = obfuscateKeys ? generateRandomKey(8) : key;
      result[newKey] = obfuscateValues ? obfuscateValue(value) : value;
    }
    return result;
  };

  const obfuscateJson = useCallback(() => {
    setResult(null);

    let obj: any;
    try {
      obj = JSON.parse(input);
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
      return;
    }

    const obfuscated = obfuscateObject(obj);
    const output = minify
      ? JSON.stringify(obfuscated)
      : JSON.stringify(obfuscated, null, 2);

    setResult(output);
    toast.success("JSON obfuscated successfully");
  }, [input, obfuscateKeys, obfuscateValues, minify]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          user: {
            id: 12345,
            name: "John Doe",
            email: "john@example.com",
            active: true,
          },
          data: [1, 2, 3, 4, 5],
        },
        null,
        2,
      ),
    );
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Obfuscated JSON copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "obfuscated.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Obfuscated JSON downloaded");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Obfuscator – Obfuscate JSON Online
          </h1>
          <p className="text-muted-foreground">
            Minify and obfuscate JSON keys and values for safer sharing and
            publishing. Our free JSON Obfuscator helps protect data structure
            and logic from casual inspection.
          </p>
        </div>

        {/* Options */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Load Sample
                </Button>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="obfuscateKeys"
                    checked={obfuscateKeys}
                    onCheckedChange={(checked) =>
                      setObfuscateKeys(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="obfuscateKeys"
                    className="text-sm cursor-pointer"
                  >
                    Obfuscate Keys
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="obfuscateValues"
                    checked={obfuscateValues}
                    onCheckedChange={(checked) =>
                      setObfuscateValues(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="obfuscateValues"
                    className="text-sm cursor-pointer"
                  >
                    Obfuscate Values
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="minify"
                    checked={minify}
                    onCheckedChange={(checked) => setMinify(checked as boolean)}
                  />
                  <Label htmlFor="minify" className="text-sm cursor-pointer">
                    Minify Output
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
                <Button onClick={obfuscateJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Obfuscate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input and Result */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Input */}
          <Card>
            <CardContent className="p-4">
              <Label
                htmlFor="input"
                className="text-sm font-medium text-muted-foreground mb-2 block"
              >
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"user": {"name": "John", "email": "john@example.com"}}'
                className="min-h-[500px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto"
              />
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <Card>
              <CardContent className="p-4">
                <Label className="text-sm font-medium text-muted-foreground mb-4 block">
                  Obfuscated Result
                </Label>
                <Textarea
                  value={result}
                  readOnly
                  className="min-h-[500px] font-mono text-sm resize-none bg-muted/50 max-h-[500px] overflow-y-auto"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Original size: {new Blob([input]).size} bytes | Obfuscated
                  size: {new Blob([result]).size} bytes
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About JSON Obfuscator</h2>
          <p className="text-muted-foreground mb-6">
            Sharing JSON data containing sensitive information can be risky.
            Whether you need to share logs with a colleague or publish sample
            data publicly, exposed emails, IDs, and private values create
            security concerns. This JSON Obfuscator replaces real values with
            safe placeholders while keeping the structure intact for debugging
            or demonstration purposes.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your JSON into the input area and choose your obfuscation
            settings. Check "Obfuscate Keys" to replace key names with random
            8-character strings, or "Obfuscate Values" to mask string values
            with X characters and randomize numbers and booleans.
          </p>
          <p className="text-muted-foreground mb-8">
            The "Minify Output" option removes whitespace for compact results.
            Click the Obfuscate button and get your sanitized JSON instantly.
            Use the Copy or Download buttons to save your obfuscated output.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            Developers often need to share API responses or configuration files
            for troubleshooting without exposing customer data, API keys, or
            internal identifiers. This tool helps create safe examples for
            documentation, Stack Overflow questions, or team communication.
          </p>
          <p className="text-muted-foreground mb-8">
            Note that obfuscation is not encryption. The structure remains
            visible, and determined attackers could potentially reverse
            patterns. For true security, use proper encryption methods. This
            tool is best for casual data protection and privacy.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                Does obfuscation preserve data types?
              </p>
              <p className="text-muted-foreground">
                Yes. Strings become X characters, numbers become random numbers,
                and booleans stay boolean. The JSON structure and types remain
                valid.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I obfuscate only keys or only values?
              </p>
              <p className="text-muted-foreground">
                Absolutely. Use the checkboxes to select Obfuscate Keys only,
                Obfuscate Values only, or both options together.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Is my data sent to a server?</p>
              <p className="text-muted-foreground">
                No. All obfuscation happens in your browser. Your JSON never
                leaves your device.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                What happens to nested objects?
              </p>
              <p className="text-muted-foreground">
                The obfuscator recursively processes all nested objects and
                arrays, applying your selected options at every level.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I get consistent obfuscated output?
              </p>
              <p className="text-muted-foreground">
                No. Random values are generated each time. For reproducible
                results, you would need a seeded random generator.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Related tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a
                href="/json-tools/json-minifier"
                className="text-primary hover:underline"
              >
                JSON Minifier
              </a>{" "}
              – Remove whitespace and comments from JSON
            </li>
            <li>
              <a
                href="/json-tools/json-formatter"
                className="text-primary hover:underline"
              >
                JSON Formatter
              </a>{" "}
              – Beautify and format JSON with proper indentation
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Validate JSON syntax and structure
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
