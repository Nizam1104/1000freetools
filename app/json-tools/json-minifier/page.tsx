"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Copy, Download, FileJson, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonMinifierPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minifyJson = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter JSON to minify");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
      
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      const reduction = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
      toast.success(`Minified! Size reduced by ${reduction}%`);
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`);
      setOutput("");
    }
  }, [input]);

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
    a.download = "minified.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as minified.json");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const loadSample = () => {
    const sample = JSON.stringify({ name: "Example", version: 1, features: ["fast", "simple", "reliable"], nested: { key: "value" } }, null, 2);
    setInput(sample);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Minifier – Compress JSON Online</h1>
          <p className="text-muted-foreground">
            Minify JSON by removing whitespace and line breaks to reduce file size. Free online JSON Minifier that preserves validity while optimizing your data for production.
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
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
                <Button onClick={minifyJson}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Minify
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
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste your JSON here, e.g., { "name": "test", "value": 123 }'
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Minified Output
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!output}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
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
                  placeholder="Minified JSON will appear here..."
                  className="min-h-[500px] font-mono text-sm resize-none bg-muted/50 break-all"
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
      </div>

      {/* SEO Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">About JSON Minifier</h2>
        <p className="text-muted-foreground mb-6">
          Every byte counts when transferring data over the network. This tool removes all unnecessary whitespace from JSON, reducing file size for faster API responses and smaller payloads without changing the data.
        </p>

        <h3 className="text-xl font-semibold mb-3">How it works</h3>
        <p className="text-muted-foreground mb-2">
          The minifier parses your JSON and rebuilds it without any whitespace except what's required inside strings. The result is valid JSON that's significantly smaller than the formatted version.
        </p>
        <p className="text-muted-foreground mb-8">
          Size reduction typically ranges from 30-50% depending on how much whitespace was in the original. The tool shows the exact percentage saved so you can see the impact.
        </p>

        <h3 className="text-xl font-semibold mb-3">When you'd use this</h3>
        <p className="text-muted-foreground mb-2">
          You're preparing JSON data for production where bandwidth matters. Minify configuration files, API responses, or embedded data to reduce load times and data transfer costs.
        </p>
        <p className="text-muted-foreground mb-8">
          Minified JSON is hard for humans to read. Keep your formatted version for development and only minify for production deployment or network transmission.
        </p>

        <h3 className="text-xl font-semibold mb-3">Questions</h3>
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-medium mb-1">Does minifying change the data?</p>
            <p className="text-muted-foreground">No, the data remains identical. Only whitespace is removed. Any valid JSON parser will read minified and formatted JSON the same way.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How much size reduction can I expect?</p>
            <p className="text-muted-foreground">Typically 30-50% depending on formatting. Heavily indented JSON with many line breaks sees the biggest reduction.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What if my JSON is invalid?</p>
            <p className="text-muted-foreground">The tool will show an error message. Fix the syntax errors first, then minify. Invalid JSON cannot be minified.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Can I download the minified JSON?</p>
            <p className="text-muted-foreground">Yes. Use Download to save as minified.json or Copy to paste directly into your code or configuration.</p>
          </div>
          <div>
            <p className="font-medium mb-1">Should I minify for development?</p>
            <p className="text-muted-foreground">Generally no. Keep JSON formatted during development for easier debugging. Minify only for production builds.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3">Related tools</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/json-tools/json-pretty-print" className="text-primary hover:underline">JSON Pretty Print</a> – Format minified JSON
          </li>
          <li>
            <a href="/json-tools/json-size-calculator" className="text-primary hover:underline">JSON Size Calculator</a> – Compare file sizes
          </li>
          <li>
            <a href="/json-tools/json-validator" className="text-primary hover:underline">JSON Validator</a> – Check JSON syntax
          </li>
        </ul>
      </div>
    </div>
  );
}
