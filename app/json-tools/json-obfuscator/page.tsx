"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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
      return value.map(item => obfuscateValue(item));
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
    const output = minify ? JSON.stringify(obfuscated) : JSON.stringify(obfuscated, null, 2);

    setResult(output);
    toast.success("JSON obfuscated successfully");
  }, [input, obfuscateKeys, obfuscateValues, minify]);

  const clearAll = () => {
    setInput("");
    setResult(null);
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      user: {
        id: 12345,
        name: "John Doe",
        email: "john@example.com",
        active: true
      },
      data: [1, 2, 3, 4, 5]
    }, null, 2));
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
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON Obfuscator – Obfuscate JSON Online</h1>
          <p className="text-muted-foreground">
            Minify and obfuscate JSON keys and values for safer sharing and publishing. Our free JSON Obfuscator helps protect data structure and logic from casual inspection.
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
                    onCheckedChange={(checked) => setObfuscateKeys(checked as boolean)}
                  />
                  <Label htmlFor="obfuscateKeys" className="text-sm cursor-pointer">Obfuscate Keys</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="obfuscateValues"
                    checked={obfuscateValues}
                    onCheckedChange={(checked) => setObfuscateValues(checked as boolean)}
                  />
                  <Label htmlFor="obfuscateValues" className="text-sm cursor-pointer">Obfuscate Values</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="minify"
                    checked={minify}
                    onCheckedChange={(checked) => setMinify(checked as boolean)}
                  />
                  <Label htmlFor="minify" className="text-sm cursor-pointer">Minify Output</Label>
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
                    <Button variant="outline" size="sm" onClick={downloadResult}>
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

        {/* Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
              Input JSON
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"user": {"name": "John", "email": "john@example.com"}}'
              className="min-h-[200px] font-mono text-sm resize-none"
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
                className="min-h-[200px] font-mono text-sm resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Original size: {new Blob([input]).size} bytes |
                Obfuscated size: {new Blob([result]).size} bytes
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
