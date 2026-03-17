"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Minimize2, BarChart3 } from "lucide-react";

export default function CodeMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"javascript" | "css" | "html" | "json">("javascript");
  const [options, setOptions] = useState({
    removeComments: true,
    removeWhitespace: true,
    compactOperators: true,
  });
  const [copied, setCopied] = useState(false);

  const minify = useCallback(() => {
    let result = input;

    if (options.removeComments) {
      if (language === "javascript" || language === "css") {
        result = result.replace(/\/\*[\s\S]*?\*\//g, "");
        result = result.replace(/\/\/.*$/gm, "");
      }
      if (language === "html") {
        result = result.replace(/<!--[\s\S]*?-->/g, "");
      }
    }

    if (options.removeWhitespace) {
      result = result.replace(/\s+/g, " ");
      result = result.replace(/^\s+|\s+$/g, "");
    }

    if (options.compactOperators) {
      if (language === "javascript" || language === "css") {
        result = result.replace(/\s*([{};:,=+\-*/<>!&|])\s*/g, "$1");
      }
    }

    if (language === "json") {
      try {
        result = JSON.stringify(JSON.parse(input));
      } catch {
        result = "Error: Invalid JSON";
      }
    }

    setOutput(result);
  }, [input, language, options]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const getStats = useCallback(() => {
    const originalSize = input.length;
    const minifiedSize = output.length;
    const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
    const linesOriginal = input.split("\n").length;
    const linesMinified = output.split("\n").length;
    return { originalSize, minifiedSize, reduction, linesOriginal, linesMinified };
  }, [input, output]);

  const stats = getStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Minimize2 className="w-5 h-5" />
              Input Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Language</Label>
              <div className="flex gap-2 mt-2">
                {["javascript", "css", "html", "json"].map((lang) => (
                  <Button
                    key={lang}
                    size="sm"
                    variant={language === lang ? "default" : "outline"}
                    onClick={() => setLanguage(lang as typeof language)}
                  >
                    {lang.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Options</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.removeComments}
                    onChange={(e) => setOptions({ ...options, removeComments: e.target.checked })}
                  />
                  Remove Comments
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.removeWhitespace}
                    onChange={(e) => setOptions({ ...options, removeWhitespace: e.target.checked })}
                  />
                  Remove Extra Whitespace
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.compactOperators}
                    onChange={(e) => setOptions({ ...options, compactOperators: e.target.checked })}
                  />
                  Compact Operators
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="input">Paste Code</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your code here..."
                className="mt-1 h-48 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {input.length} characters, {input.split("\n").length} lines
              </p>
            </div>

            <Button onClick={minify} className="w-full">
              <Minimize2 className="w-4 h-4 mr-2" />
              Minify Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Minified Output & Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Minified Code</Label>
              <Textarea
                value={output}
                readOnly
                className="mt-1 h-32 font-mono text-sm"
                placeholder="Minified output will appear here..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {output.length} characters
                </p>
                <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {output && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Original Size</p>
                  <p className="text-xl font-bold">{stats.originalSize.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">chars / {stats.linesOriginal} lines</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Minified Size</p>
                  <p className="text-xl font-bold">{stats.minifiedSize.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">chars / {stats.linesMinified} lines</p>
                </div>
                <div className={`p-3 rounded-lg col-span-2 text-center ${
                  stats.reduction > 0 ? "bg-green-50 dark:bg-green-950" : "bg-muted"
                }`}>
                  <p className="text-xs text-muted-foreground">Size Reduction</p>
                  <p className={`text-3xl font-bold ${stats.reduction > 0 ? "text-green-600" : ""}`}>
                    {stats.reduction > 0 ? "-" : "+"}{Math.abs(stats.reduction).toFixed(1)}%
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
