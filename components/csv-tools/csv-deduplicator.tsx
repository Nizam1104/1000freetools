"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Search, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }

  return dp[m][n];
}

function similarity(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  return 1 - distance / maxLen;
}

function rowSimilarity(row1: CSVRow, row2: CSVRow, headers: string[]): number {
  const similarities = headers.map((h) => similarity(String(row1[h] || ""), String(row2[h] || "")));
  return similarities.reduce((a, b) => a + b, 0) / similarities.length;
}

export default function CsvDeduplicator() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.85);
  const [keyColumns, setKeyColumns] = useState<string[]>([]);
  const [duplicateCount, setDuplicateCount] = useState<number>(0);
  const [fuzzyMatches, setFuzzyMatches] = useState<Array<{ row1: number; row2: number; similarity: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        setKeyColumns([...parsedHeaders]);
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        setInputText(text);
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        setKeyColumns([...parsedHeaders]);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleKeyColumnToggle = useCallback((column: string) => {
    setKeyColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((c) => c !== column);
      }
      return [...prev, column];
    });
  }, []);

  const findAndRemoveDuplicates = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (keyColumns.length === 0) {
      toast.error("Please select at least one column for comparison");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);
      const matches: Array<{ row1: number; row2: number; similarity: number }> = [];
      const toRemove = new Set<number>();

      // Find similar rows
      for (let i = 0; i < data.length; i++) {
        if (toRemove.has(i)) continue;

        for (let j = i + 1; j < data.length; j++) {
          if (toRemove.has(j)) continue;

          const row1Subset: CSVRow = {};
          const row2Subset: CSVRow = {};
          keyColumns.forEach((col) => {
            row1Subset[col] = data[i][col];
            row2Subset[col] = data[j][col];
          });

          const sim = rowSimilarity(row1Subset, row2Subset, keyColumns);

          if (sim >= similarityThreshold) {
            matches.push({ row1: i, row2: j, similarity: sim });
            toRemove.add(j); // Mark later row for removal
          }
        }
      }

      setFuzzyMatches(matches);
      setDuplicateCount(toRemove.size);

      // Filter out duplicates
      const dedupedData = data.filter((_, index) => !toRemove.has(index));

      const csvOutput = [headers.join(","), ...dedupedData.map((row) => headers.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Found ${matches.length} fuzzy match(es), removed ${toRemove.size} row(s)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Deduplication failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, keyColumns, similarityThreshold, headers]);

  const copyToClipboardHandler = useCallback(async () => {
    if (!output) return;
    try {
      await copyToClipboard(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [output]);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    try {
      const { data } = parseCSVIntelligently(output);
      exportCSVData(data, "fuzzy-deduplicated.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setKeyColumns([]);
    setDuplicateCount(0);
    setFuzzyMatches([]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Fuzzy Deduplicator</h1>
        <p className="text-muted-foreground">
          Advanced fuzzy matching for near-duplicate detection with similarity threshold
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">CSV Input</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear
            </Button>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-md p-6 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <FileSpreadsheet className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a CSV file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste CSV data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              const { headers: parsedHeaders } = parseCSVIntelligently(e.target.value);
              setHeaders(parsedHeaders);
              setKeyColumns([...parsedHeaders]);
            }}
            placeholder="Paste CSV data here...&#10;name,email,phone&#10;John Smith,john@example.com,555-1234&#10;Jon Smith,jon@example.com,555-1234&#10;Jane Doe,jane@example.com,555-5678"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Configuration Section */}
            <section>
              <Label className="text-base mb-3 block">Fuzzy Matching Configuration</Label>

              <div className="space-y-4">
                {/* Similarity Threshold */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">
                    Similarity Threshold: {(similarityThreshold * 100).toFixed(0)}%
                  </Label>
                  <Slider
                    value={[similarityThreshold]}
                    onValueChange={(value) => setSimilarityThreshold(value[0])}
                    min={0.5}
                    max={1}
                    step={0.01}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50% (loose)</span>
                    <span>75%</span>
                    <span>85% (recommended)</span>
                    <span>95%</span>
                    <span>100% (exact)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Higher threshold = more strict matching (fewer false positives)
                  </p>
                </div>

                {/* Column Selection */}
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm">Columns to Compare</Label>
                    <p className="text-xs text-muted-foreground">
                      {keyColumns.length} of {headers.length} selected
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {headers.map((column) => (
                      <div key={column} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`col-${column}`}
                          checked={keyColumns.includes(column)}
                          onChange={() => handleKeyColumnToggle(column)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`col-${column}`} className="text-sm cursor-pointer font-mono">
                          {column}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Find Duplicates Button */}
            <section>
              <Button
                onClick={findAndRemoveDuplicates}
                disabled={isProcessing || keyColumns.length === 0}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Finding Duplicates..."
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Find and Remove Fuzzy Duplicates
                  </>
                )}
              </Button>
            </section>

            {/* Fuzzy Matches Section */}
            {fuzzyMatches.length > 0 && (
              <section>
                <Label className="text-base mb-3 block">Detected Fuzzy Matches</Label>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Row 1</th>
                        <th className="text-left p-3 font-medium">Row 2</th>
                        <th className="text-center p-3 font-medium">Similarity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fuzzyMatches.slice(0, 20).map((match, index) => (
                        <tr key={index} className="border-t hover:bg-muted/30">
                          <td className="p-3 font-mono text-xs">Row {match.row1 + 1}</td>
                          <td className="p-3 font-mono text-xs">Row {match.row2 + 1}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    match.similarity >= 0.95 ? "bg-green-500" :
                                    match.similarity >= 0.85 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${match.similarity * 100}%` }}
                                />
                              </div>
                              <span className="text-xs">{(match.similarity * 100).toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {fuzzyMatches.length > 20 && (
                    <div className="p-3 text-center text-sm text-muted-foreground bg-muted/30">
                      ...and {fuzzyMatches.length - 20} more matches
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Output Section */}
            {output && (
              <>
                {/* Summary */}
                <section>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-2xl font-semibold">{fuzzyMatches.length}</p>
                      <p className="text-sm text-muted-foreground">Fuzzy Matches Found</p>
                    </div>
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-2xl font-semibold text-red-600">{duplicateCount}</p>
                      <p className="text-sm text-muted-foreground">Duplicates Removed</p>
                    </div>
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-2xl font-semibold text-green-600">
                        {Math.round((1 - duplicateCount / (duplicateCount + 1)) * 100)}%
                      </p>
                      <p className="text-sm text-muted-foreground">Data Retained</p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base">Deduplicated Output</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboardHandler}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadOutput}>
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-muted/30"
                  />
                </section>
              </>
            )}
          </>
        )}

        {/* Info Section */}
        {!headers.length && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How Fuzzy Deduplication Works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Uses Levenshtein distance algorithm for string similarity</li>
                  <li>Compares selected columns across all row pairs</li>
                  <li>Calculates average similarity score across columns</li>
                  <li>Rows exceeding threshold are marked as duplicates</li>
                  <li>Later occurrences are removed, keeping the first</li>
                  <li>Useful for catching typos and minor variations</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
