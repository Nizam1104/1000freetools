"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Download, Minimize2 } from "lucide-react";

export default function Base64Minifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        // Minify by removing whitespace and line breaks before encoding
        const minified = input.replace(/\s+/g, "");
        setOutput(btoa(minified));
      } else {
        // Decode and minify
        const decoded = atob(input);
        const minified = decoded.replace(/\s+/g, "");
        setOutput(minified);
      }
    } catch (err) {
      setOutput("Error: Invalid input");
    }
  }, [input, mode]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const downloadOutput = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "encode" ? "base64-minified.txt" : "decoded-minified.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [output, mode]);

  const getStats = useCallback(() => {
    const originalSize = input.length;
    const minifiedSize = output.length;
    const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
    return { originalSize, minifiedSize, reduction };
  }, [input, output]);

  const stats = getStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Minimize2 className="w-5 h-5" />
              Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Mode</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={mode === "encode"}
                    onChange={() => setMode("encode")}
                  />
                  Encode to Base64
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={mode === "decode"}
                    onChange={() => setMode("decode")}
                  />
                  Decode from Base64
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="input">{mode === "encode" ? "Text to Encode" : "Base64 to Decode"}</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "encode" ? "Enter text to encode and minify..." : "Enter Base64 string..."}
                className="mt-1 h-64 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Input size: {input.length} characters
              </p>
            </div>

            <Button onClick={process} className="w-full">
              {mode === "encode" ? "Encode & Minify" : "Decode & Minify"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Minified Output</Label>
              <Textarea
                value={output}
                readOnly
                className="mt-1 h-64 font-mono text-sm"
                placeholder="Output will appear here..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Output size: {output.length} characters
                  {stats.originalSize > 0 && (
                    <span className={stats.reduction > 0 ? "text-green-600" : "text-red-600"}>
                      {" "}({stats.reduction > 0 ? "-" : "+"}{Math.abs(stats.reduction).toFixed(1)}%)
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadOutput} disabled={!output}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
