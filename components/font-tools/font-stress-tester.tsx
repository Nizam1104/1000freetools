"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Zap, AlertTriangle } from "lucide-react";

const testStrings = [
  "The quick brown fox jumps over the lazy dog.",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "!@#$%^&*()_+-=[]{}|;':\",./<>?",
  "ÁÉÍÓÚÑÜáéíóúñü",
  "中文 日本語 한국어",
  "🎉🚀💻🔥✨",
  "MMMMMMMMMM",
  "iiiiiiiiii",
  "Illil1lL",
  "O0oQ",
  "S5s",
  "B8",
];

export default function FontStressTester() {
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [customText, setCustomText] = useState("");
  const [testResults, setTestResults] = useState<Array<{ test: string; text: string; issues: string[] }>>([]);
  const [copied, setCopied] = useState(false);

  const runStressTests = useCallback(() => {
    const results: Array<{ test: string; text: string; issues: string[] }> = [];

    testStrings.forEach((text) => {
      const issues: string[] = [];
      
      // Check for potential rendering issues
      if (/[^\x00-\x7F]/.test(text)) {
        issues.push("Contains non-ASCII characters");
      }
      if (/[\u{1F300}-\u{1F9FF}]/u.test(text)) {
        issues.push("Contains emojis");
      }
      if (/[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/.test(text)) {
        issues.push("Contains CJK characters");
      }
      if (/^M+$/i.test(text)) {
        issues.push("Wide characters - check spacing");
      }
      if (/^i+$/i.test(text)) {
        issues.push("Narrow characters - check kerning");
      }
      if (/^[Ilil1lL]+$/.test(text)) {
        issues.push("Similar characters - check distinguishability");
      }

      results.push({
        test: text.length > 30 ? text.substring(0, 30) + "..." : text,
        text,
        issues,
      });
    });

    setTestResults(results);
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (testResults.length === 0) return;
    try {
      const text = testResults.map((r) => 
        `${r.test}\nIssues: ${r.issues.length > 0 ? r.issues.join(", ") : "None"}\n`
      ).join("\n");
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [testResults]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Font Stress Test Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="font">Font Family</Label>
              <select
                id="font"
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Courier New">Courier New</option>
                <option value="Impact">Impact</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Garamond">Garamond</option>
              </select>
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size (px)</Label>
              <Input
                id="fontSize"
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={runStressTests} className="w-full">
                Run Stress Tests
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="customText">Custom Test Text</Label>
            <Textarea
              id="customText"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter custom text to test..."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Test Results</h2>
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              Copy Results
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testResults.map((result, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      Test {index + 1}
                    </span>
                    {result.issues.length > 0 && (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <p
                    style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
                    className="font-medium break-all"
                  >
                    {result.text}
                  </p>
                  {result.issues.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {result.issues.map((issue, i) => (
                        <p key={i} className="text-xs text-amber-600">
                          ⚠ {issue}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {customText && (
            <Card>
              <CardHeader>
                <CardTitle>Custom Text Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  style={{ fontFamily: selectedFont, fontSize: `${fontSize}px` }}
                  className="text-lg"
                >
                  {customText}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {testResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <p>Click "Run Stress Tests" to test font rendering</p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Stress Test Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Basic Latin</h4>
              <p className="text-sm text-muted-foreground">A-Z, a-z, 0-9</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Special Characters</h4>
              <p className="text-sm text-muted-foreground">Symbols and punctuation</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Accented Characters</h4>
              <p className="text-sm text-muted-foreground">European languages</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">CJK Characters</h4>
              <p className="text-sm text-muted-foreground">Chinese, Japanese, Korean</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Emojis</h4>
              <p className="text-sm text-muted-foreground">Unicode emoji characters</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-semibold">Problematic Pairs</h4>
              <p className="text-sm text-muted-foreground">Similar-looking characters</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
