"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, Code, GitCompare } from "lucide-react";

const HtmlDiffCheckerComparator: React.FC = () => {
  const [html1, setHtml1] = useState("");
  const [html2, setHtml2] = useState("");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [ignoreComments, setIgnoreComments] = useState(false);
  const [diffResult, setDiffResult] = useState("");
  const [compared, setCompared] = useState(false);
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 });

  const sampleHtml1 = `<div class="container">
  <h1>Welcome</h1>
  <p>This is a paragraph.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>`;

  const sampleHtml2 = `<div class="container">
  <h1>Welcome Back</h1>
  <p>This is updated content.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <footer>Copyright 2024</footer>
</div>`;

  const compareHtml = useCallback(() => {
    let text1 = html1;
    let text2 = html2;

    if (ignoreWhitespace) {
      text1 = text1.replace(/\s+/g, " ");
      text2 = text2.replace(/\s+/g, " ");
    }

    if (ignoreCase) {
      text1 = text1.toLowerCase();
      text2 = text2.toLowerCase();
    }

    if (ignoreComments) {
      text1 = text1.replace(/<!--[\s\S]*?-->/g, "");
      text2 = text2.replace(/<!--[\s\S]*?-->/g, "");
    }

    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    
    const diff = computeDiff(lines1, lines2);
    
    let output = "";
    let added = 0, removed = 0, unchanged = 0;
    
    diff.forEach(line => {
      if (line.startsWith("+")) {
        output += `<span class="diff-added">${escapeHtml(line)}</span>\n`;
        added++;
      } else if (line.startsWith("-")) {
        output += `<span class="diff-removed">${escapeHtml(line)}</span>\n`;
        removed++;
      } else {
        output += `<span class="diff-unchanged">${escapeHtml(line)}</span>\n`;
        unchanged++;
      }
    });
    
    setDiffResult(output);
    setCompared(true);
    setStats({ added, removed, unchanged });
  }, [html1, html2, ignoreWhitespace, ignoreCase, ignoreComments]);

  const computeDiff = (lines1: string[], lines2: string[]): string[] => {
    const result: string[] = [];
    const maxLen = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];
      
      if (line1 === undefined) {
        result.push(`+ ${line2}`);
      } else if (line2 === undefined) {
        result.push(`- ${line1}`);
      } else if (line1 !== line2) {
        result.push(`- ${line1}`);
        result.push(`+ ${line2}`);
      } else {
        result.push(`  ${line1}`);
      }
    }
    
    return result;
  };

  const escapeHtml = (text: string): string => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  const handleClear = useCallback(() => {
    setHtml1("");
    setHtml2("");
    setDiffResult("");
    setCompared(false);
    setStats({ added: 0, removed: 0, unchanged: 0 });
  }, []);

  const handleCopy = useCallback(() => {
    if (diffResult) {
      const plainText = diffResult.replace(/<[^>]*>/g, "");
      navigator.clipboard.writeText(plainText);
    }
  }, [diffResult]);

  const handleDownload = useCallback(() => {
    if (!diffResult) return;
    
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>HTML Diff Report</title>
  <style>
    .diff-added { background-color: #d4edda; color: #155724; }
    .diff-removed { background-color: #f8d7da; color: #721c24; text-decoration: line-through; }
    .diff-unchanged { color: #666; }
    pre { font-family: monospace; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>HTML Diff Report</h1>
  <pre>${diffResult}</pre>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.download = "html-diff-report.html";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [diffResult]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            HTML Diff Checker & Comparator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="html1">Original HTML</Label>
              <Textarea
                id="html1"
                value={html1}
                onChange={(e) => setHtml1(e.target.value)}
                placeholder="Paste original HTML here..."
                rows={12}
                className="font-mono text-sm"
              />
              <Button 
                onClick={() => setHtml1(sampleHtml1)} 
                variant="outline" 
                size="sm"
              >
                Load Sample 1
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="html2">Modified HTML</Label>
              <Textarea
                id="html2"
                value={html2}
                onChange={(e) => setHtml2(e.target.value)}
                placeholder="Paste modified HTML here..."
                rows={12}
                className="font-mono text-sm"
              />
              <Button 
                onClick={() => setHtml2(sampleHtml2)} 
                variant="outline" 
                size="sm"
              >
                Load Sample 2
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Comparison Options</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ignoreWhitespace"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="ignoreWhitespace" className="font-normal text-sm">
                  Ignore whitespace
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ignoreCase"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="ignoreCase" className="font-normal text-sm">
                  Ignore case
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ignoreComments"
                  checked={ignoreComments}
                  onChange={(e) => setIgnoreComments(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="ignoreComments" className="font-normal text-sm">
                  Ignore comments
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={compareHtml} disabled={!html1.trim() || !html2.trim()}>
              <GitCompare className="w-4 h-4 mr-2" />
              Compare HTML
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!compared}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Diff
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!compared}>
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {compared && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-500">Added Lines</p>
                    <p className="text-2xl font-bold text-green-600">{stats.added}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-500">Removed Lines</p>
                    <p className="text-2xl font-bold text-red-600">{stats.removed}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-500">Unchanged Lines</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.unchanged}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Diff Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <style>{`
                    .diff-added { background-color: #d4edda; padding: 2px 4px; }
                    .diff-removed { background-color: #f8d7da; padding: 2px 4px; text-decoration: line-through; }
                    .diff-unchanged { color: #666; }
                  `}</style>
                  <pre 
                    className="bg-gray-100 p-4 rounded overflow-auto text-sm font-mono max-h-96"
                    dangerouslySetInnerHTML={{ __html: diffResult }}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HtmlDiffCheckerComparator;
