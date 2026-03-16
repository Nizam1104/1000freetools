"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function TextCompareDiffChecker() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<{ added: string[]; removed: string[]; unchanged: string[] } | null>(null);
  const [viewMode, setViewMode] = useState<"side" | "inline">("side");

  const computeDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    
    const added: string[] = [];
    const removed: string[] = [];
    const unchanged: string[] = [];

    // Simple line-by-line diff
    const maxLen = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];
      
      if (line1 === undefined) {
        added.push(line2);
      } else if (line2 === undefined) {
        removed.push(line1);
      } else if (line1 === line2) {
        unchanged.push(line1);
      } else {
        removed.push(line1);
        added.push(line2);
      }
    }
    
    setDiff({ added, removed, unchanged });
  };

  const handleClear = () => {
    setText1("");
    setText2("");
    setDiff(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Text Compare & Diff Checker</h2>
        <p className="text-sm text-muted-foreground">
          Compare two text blocks and highlight additions, deletions, and modifications
        </p>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "side" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("side")}
            >
              Side by Side
            </Button>
            <Button
              variant={viewMode === "inline" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("inline")}
            >
              Inline Diff
            </Button>
          </div>

          {viewMode === "side" ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="text1">Original Text</Label>
                <textarea
                  id="text1"
                  value={text1}
                  onChange={(e) => setText1(e.target.value)}
                  placeholder="Paste original text here..."
                  className="w-full min-h-[300px] p-3 font-mono text-sm rounded-md border border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="text2">Modified Text</Label>
                <textarea
                  id="text2"
                  value={text2}
                  onChange={(e) => setText2(e.target.value)}
                  placeholder="Paste modified text here..."
                  className="w-full min-h-[300px] p-3 font-mono text-sm rounded-md border border-input"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Comparison Result</Label>
              <div className="min-h-[300px] p-3 font-mono text-sm rounded-md border bg-muted">
                {diff ? (
                  <div>
                    {diff.removed.map((line, i) => (
                      <div key={`r-${i}`} className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                        - {line}
                      </div>
                    ))}
                    {diff.unchanged.map((line, i) => (
                      <div key={`u-${i}`} className="py-0.5">{line}</div>
                    ))}
                    {diff.added.map((line, i) => (
                      <div key={`a-${i}`} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        + {line}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground">Enter text in both fields and click Compare</div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={computeDiff} disabled={!text1 || !text2} className="flex-1">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Compare Texts
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!text1 && !text2}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={computeDiff} disabled={!text1 || !text2} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Compare
        </Button>
        <Button variant="outline" onClick={handleClear} disabled={!text1 && !text2}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {diff && viewMode === "side" && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Diff Summary</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded">
              <div className="text-2xl font-bold text-red-600">{diff.removed.length}</div>
              <div className="text-sm text-muted-foreground">Lines Removed</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded">
              <div className="text-2xl font-bold text-green-600">{diff.added.length}</div>
              <div className="text-sm text-muted-foreground">Lines Added</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded">
              <div className="text-2xl font-bold text-blue-600">{diff.unchanged.length}</div>
              <div className="text-sm text-muted-foreground">Lines Unchanged</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
