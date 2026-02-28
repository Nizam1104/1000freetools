"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, Copy, Download, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

export default function JsonPlaygroundPage() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const processJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      
      let output: string;
      if (sortKeys) {
        const sorted = JSON.parse(JSON.stringify(parsed, Object.keys(parsed).sort(), indent));
        output = JSON.stringify(parsed, (key, value) => {
          if (value && typeof value === "object" && !Array.isArray(value)) {
            return Object.keys(value).sort().reduce((sorted: any, k) => {
              sorted[k] = value[k];
              return sorted;
            }, {});
          }
          return value;
        }, indent);
      } else {
        output = JSON.stringify(parsed, null, indent);
      }
      
      setResult(output);
      setIsValid(true);
      toast.success("JSON formatted");
    } catch (e) {
      setResult((e as Error).message);
      setIsValid(false);
      toast.error("Invalid JSON");
    }
  }, [input, indent, sortKeys]);

  const minifyJson = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setResult(JSON.stringify(parsed));
      setIsValid(true);
      toast.success("JSON minified");
    } catch (e) {
      setResult((e as Error).message);
      setIsValid(false);
      toast.error("Invalid JSON");
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setResult(null);
    setIsValid(null);
  };

  const loadSample = () => {
    setInput('{"name":"John","age":30,"city":"NYC","hobbies":["reading","coding"],"active":true}');
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Result copied to clipboard");
    }
  };

  const downloadResult = () => {
    if (result && isValid) {
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Playground – Live JSON Editor Online</h1>
          <p className="text-muted-foreground">
            Edit JSON in a live interactive playground and see formatted output instantly. Our free JSON Playground is the perfect environment for experimenting, learning, and testing JSON.
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
                  <Label htmlFor="indent" className="text-sm whitespace-nowrap">Indent:</Label>
                  <select
                    id="indent"
                    value={indent}
                    onChange={(e) => setIndent(parseInt(e.target.value))}
                    className="h-9 px-3 text-sm border rounded-md bg-background"
                  >
                    <option value={0}>Minified</option>
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={8}>8 spaces</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sortKeys"
                    checked={sortKeys}
                    onChange={(e) => setSortKeys(e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="sortKeys" className="text-sm cursor-pointer">Sort Keys</Label>
                </div>
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={minifyJson}>
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {result && isValid && (
                  <>
                    <Button variant="outline" size="sm" onClick={copyResult}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
                <Button onClick={processJson}>
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Format
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Output
              </Label>
              <div className="relative">
                <Textarea
                  value={result || ""}
                  readOnly
                  placeholder="Formatted output will appear here..."
                  className={`min-h-[500px] font-mono text-sm resize-none ${
                    isValid === false ? "border-destructive" : ""
                  }`}
                />
                {isValid !== null && (
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                    isValid ? "bg-green-500 text-white" : "bg-destructive text-white"
                  }`}>
                    {isValid ? "Valid JSON" : "Invalid JSON"}
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
