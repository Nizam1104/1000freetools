"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Minimize2, Zap } from "lucide-react";

export default function RealTimeMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<"javascript" | "css" | "html" | "json">("javascript");
  const [isMinifying, setIsMinifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const minify = useCallback((code: string) => {
    let result = code;

    // Remove comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, "");
    result = result.replace(/\/\/.*$/gm, "");
    result = result.replace(/<!--[\s\S]*?-->/g, "");

    // Remove extra whitespace
    result = result.replace(/\s+/g, " ");
    result = result.replace(/^\s+|\s+$/g, "");

    // Compact around operators and special chars
    result = result.replace(/\s*([{};:,=+\-*/<>!&|()[\]])\s*/g, "$1");

    // JSON specific
    if (language === "json") {
      try {
        result = JSON.stringify(JSON.parse(code));
      } catch {
        // Keep the basic minification if JSON is invalid
      }
    }

    return result;
  }, [language]);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setIsMinifying(true);
    const timer = setTimeout(() => {
      const minified = minify(input);
      setOutput(minified);
      setIsMinifying(false);
    }, 150);

    setDebounceTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [input, language, minify]);

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
    const ext = language === "javascript" ? "js" : language;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `minified.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, language]);

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
              <Zap className="w-5 h-5" />
              Real-Time Input
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
              <Label htmlFor="input">Paste Code (minifies as you type)</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start typing or paste your code..."
                className="mt-1 h-64 font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {input.length} characters
                  {isMinifying && <span className="ml-2 text-amber-600">⏳ Minifying...</span>}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Minimize2 className="w-5 h-5" />
              Minified Output
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Minified Code</Label>
              <Textarea
                value={output}
                readOnly
                className="mt-1 h-64 font-mono text-sm"
                placeholder="Minified output appears here..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  {output.length} characters
                  {stats.originalSize > 0 && (
                    <span className={`ml-2 ${stats.reduction > 0 ? "text-green-600" : ""}`}>
                      ({stats.reduction > 0 ? "-" : "+"}{Math.abs(stats.reduction).toFixed(1)}%)
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!output}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadOutput} disabled={!output}>
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {output && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Quick Stats</p>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <p className="text-muted-foreground">Original</p>
                    <p className="font-semibold">{stats.originalSize.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Minified</p>
                    <p className="font-semibold">{stats.minifiedSize.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Saved</p>
                    <p className={`font-semibold ${stats.reduction > 0 ? "text-green-600" : ""}`}>
                      {stats.reduction.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Real-Time Processing
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Code is automatically minified as you type with a 150ms debounce delay for smooth performance.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Minimize2 className="w-4 h-4" />
                Multiple Formats
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Support for JavaScript, CSS, HTML, and JSON with format-specific optimizations.
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Easy Export
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Copy to clipboard or download the minified file with a single click.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
