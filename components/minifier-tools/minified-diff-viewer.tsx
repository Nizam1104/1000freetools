"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, GitCompare } from "lucide-react";

export default function MinifiedDiffViewer() {
  const [original, setOriginal] = useState("");
  const [minified, setMinified] = useState("");
  const [viewMode, setViewMode] = useState<"side" | "inline" | "stats">("side");
  const [copied, setCopied] = useState(false);

  const generateDiff = useCallback(() => {
    const originalLines = original.split("\n");
    const minifiedLines = minified.split("\n");
    
    const diff: Array<{ type: "original" | "minified" | "same"; content: string }> = [];
    
    const maxLength = Math.max(originalLines.length, minifiedLines.length);
    
    for (let i = 0; i < maxLength; i++) {
      const origLine = originalLines[i] || "";
      const minLine = minifiedLines[i] || "";
      
      if (origLine !== minLine) {
        if (origLine) diff.push({ type: "original", content: origLine });
        if (minLine) diff.push({ type: "minified", content: minLine });
      } else if (origLine) {
        diff.push({ type: "same", content: origLine });
      }
    }
    
    return diff;
  }, [original, minified]);

  const getStats = useCallback(() => {
    const originalSize = original.length;
    const minifiedSize = minified.length;
    const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
    const originalLines = original.split("\n").length;
    const minifiedLines = minified.split("\n").length;
    
    // Count removed elements
    const whitespaceRemoved = (original.match(/\s+/g) || []).length - (minified.match(/\s+/g) || []).length;
    const commentsRemoved = (original.match(/\/\*[\s\S]*?\*\//g) || []).length +
                           (original.match(/\/\/.*$/gm) || []).length;
    
    return {
      originalSize,
      minifiedSize,
      reduction,
      originalLines,
      minifiedLines,
      whitespaceRemoved,
      commentsRemoved,
    };
  }, [original, minified]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(minified);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [minified]);

  const diff = generateDiff();
  const stats = getStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Original Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original code..."
              className="h-48 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {original.length} chars, {original.split("\n").length} lines
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minified Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={minified}
              onChange={(e) => setMinified(e.target.value)}
              placeholder="Paste minified code..."
              className="h-48 font-mono text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                {minified.length} chars, {minified.split("\n").length} lines
              </p>
              <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!minified}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="w-5 h-5" />
              Diff Viewer
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === "side" ? "default" : "outline"}
                onClick={() => setViewMode("side")}
              >
                Side by Side
              </Button>
              <Button
                size="sm"
                variant={viewMode === "inline" ? "default" : "outline"}
                onClick={() => setViewMode("inline")}
              >
                Inline
              </Button>
              <Button
                size="sm"
                variant={viewMode === "stats" ? "default" : "outline"}
                onClick={() => setViewMode("stats")}
              >
                Statistics
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "side" && (
            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-red-100 dark:bg-red-900 p-2 font-semibold">Original</div>
                <div className="p-2 h-64 overflow-auto">
                  {original.split("\n").map((line, i) => (
                    <div key={i} className="hover:bg-muted/50">
                      <span className="text-muted-foreground w-8 inline-block">{i + 1}</span>
                      {line || " "}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-green-100 dark:bg-green-900 p-2 font-semibold">Minified</div>
                <div className="p-2 h-64 overflow-auto">
                  {minified.split("\n").map((line, i) => (
                    <div key={i} className="hover:bg-muted/50">
                      <span className="text-muted-foreground w-8 inline-block">{i + 1}</span>
                      {line || " "}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewMode === "inline" && (
            <div className="border rounded-lg overflow-hidden font-mono text-xs">
              <div className="p-2 h-96 overflow-auto">
                {diff.map((item, i) => (
                  <div
                    key={i}
                    className={`px-2 ${
                      item.type === "original" ? "bg-red-100 dark:bg-red-900" :
                      item.type === "minified" ? "bg-green-100 dark:bg-green-900" : ""
                    }`}
                  >
                    <span className="text-muted-foreground w-8 inline-block">
                      {item.type === "original" ? "-" : item.type === "minified" ? "+" : " "}
                    </span>
                    {item.content || " "}
                  </div>
                ))}
              </div>
              <div className="p-2 bg-muted text-xs">
                <span className="inline-block w-3 h-3 bg-red-200 mr-2" /> Removed
                <span className="inline-block w-3 h-3 bg-green-200 ml-4 mr-2" /> Added
              </div>
            </div>
          )}

          {viewMode === "stats" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Original</p>
                  <p className="text-2xl font-bold">{stats.originalSize.toLocaleString()}</p>
                  <p className="text-xs">{stats.originalLines} lines</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Minified</p>
                  <p className="text-2xl font-bold">{stats.minifiedSize.toLocaleString()}</p>
                  <p className="text-xs">{stats.minifiedLines} lines</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Reduction</p>
                  <p className="text-2xl font-bold text-green-600">{stats.reduction.toFixed(1)}%</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Ratio</p>
                  <p className="text-2xl font-bold">{(stats.originalSize / stats.minifiedSize || 0).toFixed(2)}:1</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Whitespace Removed</p>
                  <p className="text-xl font-semibold">~{stats.whitespaceRemoved}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Comments Removed</p>
                  <p className="text-xl font-semibold">~{stats.commentsRemoved}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
