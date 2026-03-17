"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, BarChart3, Minimize2 } from "lucide-react";

export default function MinificationAnalyzer() {
  const [original, setOriginal] = useState("");
  const [minified, setMinified] = useState("");
  const [analysis, setAnalysis] = useState<{
    originalSize: number;
    minifiedSize: number;
    reduction: number;
    compressionRatio: number;
    charsRemoved: number;
    whitespaceRemoved: number;
    commentsRemoved: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const analyze = useCallback(() => {
    const originalSize = original.length;
    const minifiedSize = minified.length;
    const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
    const compressionRatio = minifiedSize > 0 ? originalSize / minifiedSize : 0;
    const charsRemoved = originalSize - minifiedSize;

    // Estimate whitespace and comments removed
    const originalWhitespace = (original.match(/\s+/g) || []).join("").length;
    const minifiedWhitespace = (minified.match(/\s+/g) || []).join("").length;
    const whitespaceRemoved = originalWhitespace - minifiedWhitespace;

    const originalComments = (original.match(/\/\*[\s\S]*?\*\//g) || []).join("").length +
                            (original.match(/\/\/.*$/gm) || []).join("").length +
                            (original.match(/<!--[\s\S]*?-->/g) || []).join("").length;
    const commentsRemoved = originalComments;

    setAnalysis({
      originalSize,
      minifiedSize,
      reduction,
      compressionRatio,
      charsRemoved,
      whitespaceRemoved,
      commentsRemoved,
    });
  }, [original, minified]);

  const autoMinify = useCallback(() => {
    const minified = original
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{};:,=+\-*/<>!&|])\s*/g, "$1")
      .trim();
    setMinified(minified);
  }, [original]);

  const copyToClipboard = useCallback(async () => {
    if (!analysis) return;
    try {
      const text = `Minification Analysis:
Original: ${analysis.originalSize} chars
Minified: ${analysis.minifiedSize} chars
Reduction: ${analysis.reduction.toFixed(2)}%
Compression Ratio: ${analysis.compressionRatio.toFixed(2)}:1
Characters Removed: ${analysis.charsRemoved}
Whitespace Removed: ~${analysis.whitespaceRemoved}
Comments Removed: ~${analysis.commentsRemoved}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [analysis]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Original Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original code..."
              className="h-48 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {original.length} characters, {original.split("\n").length} lines
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minified Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={minified}
              onChange={(e) => setMinified(e.target.value)}
              placeholder="Paste minified code or use auto-minify..."
              className="h-48 font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={autoMinify} variant="outline" className="flex-1">
                <Minimize2 className="w-4 h-4 mr-2" />
                Auto-Minify
              </Button>
              <Button onClick={analyze} className="flex-1">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {minified.length} characters, {minified.split("\n").length} lines
            </p>
          </CardContent>
        </Card>
      </div>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Original Size</p>
                <p className="text-2xl font-bold">{analysis.originalSize.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">characters</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Minified Size</p>
                <p className="text-2xl font-bold">{analysis.minifiedSize.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">characters</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${
                analysis.reduction > 0 ? "bg-green-50 dark:bg-green-950" : "bg-muted"
              }`}>
                <p className="text-sm text-muted-foreground">Size Reduction</p>
                <p className={`text-2xl font-bold ${analysis.reduction > 0 ? "text-green-600" : ""}`}>
                  {analysis.reduction > 0 ? "-" : "+"}{Math.abs(analysis.reduction).toFixed(2)}%
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Compression Ratio</p>
                <p className="text-2xl font-bold">{analysis.compressionRatio.toFixed(2)}:1</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Characters Removed</p>
                <p className="text-xl font-semibold">{analysis.charsRemoved.toLocaleString()}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Whitespace Removed</p>
                <p className="text-xl font-semibold">~{analysis.whitespaceRemoved.toLocaleString()}</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-sm text-muted-foreground">Comments Removed</p>
                <p className="text-xl font-semibold">~{analysis.commentsRemoved.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-semibold mb-2">Size Comparison</p>
              <div className="flex h-8 rounded overflow-hidden">
                <div
                  className="bg-primary transition-all"
                  style={{ width: `${(analysis.originalSize / (analysis.originalSize + analysis.minifiedSize)) * 100}%` }}
                />
                <div
                  className="bg-green-500 transition-all"
                  style={{ width: `${(analysis.minifiedSize / (analysis.originalSize + analysis.minifiedSize)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-primary rounded" />
                  Original ({analysis.originalSize} chars)
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  Minified ({analysis.minifiedSize} chars)
                </span>
              </div>
            </div>

            <Button variant="outline" onClick={copyToClipboard} className="w-full">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Copy Analysis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
