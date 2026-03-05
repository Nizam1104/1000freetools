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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Check,
  Copy,
  Download,
  FileJson,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function JsonPrettyPrintPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [useTabs, setUseTabs] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortObjectKeys = (obj: any): any => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sortObjectKeys);

    const sorted: any = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = sortObjectKeys(obj[key]);
      });
    return sorted;
  };

  const prettyPrint = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON to pretty print");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const dataToPrint = sortKeys ? sortObjectKeys(parsed) : parsed;
      const indent = useTabs ? "\t" : " ".repeat(parseInt(indentSize));
      const formatted = JSON.stringify(dataToPrint, null, indent);
      setOutput(formatted);
      setError(null);
      toast.success("JSON pretty printed successfully!");
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input, indentSize, useTabs, sortKeys]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pretty-printed.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as pretty-printed.json");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      {
        name: "Example",
        version: 1,
        features: ["fast", "simple", "reliable"],
        config: { debug: true, maxItems: 100 },
      },
      null,
      0,
    );
    setInput(sample);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            JSON Pretty Print – Readable JSON Formatter
          </h1>
          <p className="text-muted-foreground">
            Pretty print JSON with customizable indentation for maximum
            readability. Convert compact, hard-to-read JSON into clean,
            human-friendly formatted output instantly.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="indent"
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    Indent:
                  </Label>
                  <Select
                    value={indentSize}
                    onValueChange={setIndentSize}
                    disabled={useTabs}
                  >
                    <SelectTrigger id="indent" className="w-24 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 spaces</SelectItem>
                      <SelectItem value="4">4 spaces</SelectItem>
                      <SelectItem value="8">8 spaces</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="useTabs"
                    checked={useTabs}
                    onCheckedChange={(checked) =>
                      setUseTabs(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="useTabs"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Use tabs
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sortKeys"
                    checked={sortKeys}
                    onCheckedChange={(checked) =>
                      setSortKeys(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="sortKeys"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Sort keys
                  </Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={prettyPrint}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Pretty Print
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
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
                placeholder='Paste compact JSON here, e.g., {"name":"test","value":123}'
                className="min-h-[500px] font-mono text-sm resize-none max-h-[500px] overflow-y-auto max-h-[500px]"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Pretty Printed Output
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!output}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadJson}
                    disabled={!output}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Pretty printed JSON will appear here..."
                  className="min-h-[500px] font-mono text-sm resize-none bg-muted/50 max-h-[500px] overflow-y-auto max-h-[500px]"
                />
                {error && (
                  <div className="absolute bottom-4 left-4 right-4 bg-destructive text-destructive-foreground px-4 py-3 rounded-md text-sm">
                    {error}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            About JSON Pretty Print
          </h2>
          <p className="text-muted-foreground mb-6">
            Minified JSON is great for transmission but terrible for reading.
            This tool transforms compact, single-line JSON into a clean,
            indented format that's easy to scan and debug. Perfect for reviewing
            API responses or configuration files.
          </p>

          <h3 className="text-xl font-semibold mb-3">How it works</h3>
          <p className="text-muted-foreground mb-2">
            Paste your compact JSON and the tool parses it, then rebuilds it
            with proper indentation and line breaks. You control the indent size
            with options for 2, 4, or 8 spaces, or use tabs if preferred.
          </p>
          <p className="text-muted-foreground mb-8">
            Enable the Sort Keys option to alphabetically order all object
            properties. This helps when comparing two JSON files or when you
            need consistent key ordering for documentation.
          </p>

          <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
          <p className="text-muted-foreground mb-2">
            You received a minified JSON response from an API and need to
            understand its structure. Instead of manually adding line breaks,
            paste it here and instantly get a readable version.
          </p>
          <p className="text-muted-foreground mb-8">
            Keep in mind that pretty-printed JSON is larger in file size. Use
            the formatted version for development and debugging, but consider
            minifying again for production data transfer.
          </p>

          <h3 className="text-xl font-semibold mb-3">Questions</h3>
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-medium mb-1">
                What indent size should I choose?
              </p>
              <p className="text-muted-foreground">
                Two spaces is the most common convention in JavaScript and web
                development. Four spaces works well for printed documentation.
                Choose what matches your project's style guide.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Does sorting keys change the data?
              </p>
              <p className="text-muted-foreground">
                No, the data remains identical. Only the order of keys within
                objects changes. Note that JSON object key order is technically
                not guaranteed, though most parsers preserve it.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can this handle large JSON files?
              </p>
              <p className="text-muted-foreground">
                Yes, but very large files may take a moment to process. For
                files over 10MB, consider using a desktop tool or command-line
                utility for better performance.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">What if my JSON is invalid?</p>
              <p className="text-muted-foreground">
                The tool will show an error message explaining the issue. Check
                for missing commas, unmatched brackets, or unquoted strings and
                try again.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">
                Can I download the formatted JSON?
              </p>
              <p className="text-muted-foreground">
                Yes. Click the Download button to save the pretty-printed JSON
                as a file, or use Copy to paste it directly into your editor.
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
              – Compress JSON by removing whitespace
            </li>
            <li>
              <a
                href="/json-tools/json-validator"
                className="text-primary hover:underline"
              >
                JSON Validator
              </a>{" "}
              – Check JSON syntax and find errors
            </li>
            <li>
              <a
                href="/json-tools/json-formatter-beautifier"
                className="text-primary hover:underline"
              >
                JSON Formatter Beautifier
              </a>{" "}
              – Format and beautify JSON
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
