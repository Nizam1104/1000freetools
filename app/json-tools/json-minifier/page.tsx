"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
    </div>
  );
}
