"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, BarChart3, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, calculateColumnStats } from "./csv-utils";

interface ColumnStats {
  column: string;
  count: number;
  nullCount: number;
  nullRate: number;
  uniqueCount: number;
  min?: string;
  max?: string;
  mean?: number;
  median?: number;
  mode?: string;
  isNumeric: boolean;
}

export default function CsvRowCounter() {
  const [inputText, setInputText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [columnStats, setColumnStats] = useState<ColumnStats[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [nonEmptyRows, setNonEmptyRows] = useState<number>(0);
  const [blankRows, setBlankRows] = useState<number>(0);
  const [overallFillRate, setOverallFillRate] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
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
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const analyzeData = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const result = parseCSVIntelligently(inputText);
      const { data: rowData, headers: parsedHeaders } = result;

      setData(rowData);
      setHeaders(parsedHeaders);
      setTotalRows(rowData.length);

      // Count blank and non-empty rows
      let blankCount = 0;
      let nonEmptyCount = 0;

      rowData.forEach((row) => {
        const isEmpty = Object.values(row).every((v) => String(v || "").trim() === "");
        if (isEmpty) {
          blankCount++;
        } else {
          nonEmptyCount++;
        }
      });

      setBlankRows(blankCount);
      setNonEmptyRows(nonEmptyCount);

      // Calculate overall fill rate
      const totalCells = rowData.length * parsedHeaders.length;
      let filledCells = 0;

      rowData.forEach((row) => {
        parsedHeaders.forEach((header) => {
          if (String(row[header] || "").trim() !== "") {
            filledCells++;
          }
        });
      });

      setOverallFillRate(totalCells > 0 ? Math.round((filledCells / totalCells) * 100) : 0);

      // Calculate column statistics
      const stats = calculateColumnStats(rowData, parsedHeaders);
      setColumnStats(stats);

      toast.success(`Analyzed ${rowData.length} rows, ${parsedHeaders.length} columns`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText]);

  const copyStatsToClipboard = useCallback(async () => {
    if (columnStats.length === 0) return;

    try {
      let text = "CSV Row Statistics\n\n";
      text += `Total Rows: ${totalRows}\n`;
      text += `Non-Empty Rows: ${nonEmptyRows}\n`;
      text += `Blank Rows: ${blankRows}\n`;
      text += `Overall Fill Rate: ${overallFillRate}%\n\n`;
      text += "Column Statistics:\n";
      text += "Column,Count,Null Count,Null Rate,Unique Count,Fill Rate\n";

      columnStats.forEach((stat) => {
        text += `${stat.column},${stat.count},${stat.nullCount},${(stat.nullRate * 100).toFixed(1)}%,${stat.uniqueCount},${((1 - stat.nullRate) * 100).toFixed(1)}%\n`;
      });

      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Statistics copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [columnStats, totalRows, nonEmptyRows, blankRows, overallFillRate]);

  const downloadStats = useCallback(() => {
    if (columnStats.length === 0) return;

    let csv = "Column,Count,Null Count,Null Rate,Unique Count,Fill Rate,Is Numeric\n";

    columnStats.forEach((stat) => {
      csv += `${stat.column},${stat.count},${stat.nullCount},${(stat.nullRate * 100).toFixed(2)}%,${stat.uniqueCount},${((1 - stat.nullRate) * 100).toFixed(2)}%,${stat.isNumeric}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "column-statistics.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded statistics CSV");
  }, [columnStats]);

  const clearAll = useCallback(() => {
    setInputText("");
    setData([]);
    setHeaders([]);
    setColumnStats([]);
    setTotalRows(0);
    setNonEmptyRows(0);
    setBlankRows(0);
    setOverallFillRate(0);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Row Counter</h1>
        <p className="text-muted-foreground">
          Count total rows, non-empty rows, blank rows, per-column fill rate, null value statistics
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
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV data here...&#10;name,age,email,city&#10;John,30,john@example.com,New York&#10;Jane,25,,Los Angeles&#10;,,,"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Analyze Button */}
        <section>
          <Button
            onClick={analyzeData}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Analyzing..." : "Analyze CSV"}
          </Button>
        </section>

        {/* Results Section */}
        {headers.length > 0 && (
          <>
            {/* Summary Statistics */}
            <section>
              <Label className="text-base mb-3 block">Summary Statistics</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <p className="text-sm text-muted-foreground">Total Rows</p>
                  </div>
                  <p className="text-3xl font-semibold">{totalRows}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-muted-foreground">Non-Empty Rows</p>
                  </div>
                  <p className="text-3xl font-semibold text-green-600">{nonEmptyRows}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-muted-foreground">Blank Rows</p>
                  </div>
                  <p className="text-3xl font-semibold text-red-600">{blankRows}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-muted-foreground">Overall Fill Rate</p>
                  </div>
                  <p className="text-3xl font-semibold text-blue-600">{overallFillRate}%</p>
                </div>
              </div>
            </section>

            {/* Column Statistics Table */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Per-Column Statistics</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={copyStatsToClipboard}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy Stats"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadStats}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-medium">Column</th>
                      <th className="text-center p-3 font-medium">Total</th>
                      <th className="text-center p-3 font-medium">Null/Empty</th>
                      <th className="text-center p-3 font-medium">Null Rate</th>
                      <th className="text-center p-3 font-medium">Fill Rate</th>
                      <th className="text-center p-3 font-medium">Unique</th>
                      <th className="text-center p-3 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {columnStats.map((stat, index) => (
                      <tr key={stat.column} className="border-t hover:bg-muted/30">
                        <td className="p-3 font-mono">{stat.column}</td>
                        <td className="p-3 text-center">{stat.count}</td>
                        <td className="p-3 text-center text-red-600">{stat.nullCount}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-500 rounded-full"
                                style={{ width: `${stat.nullRate * 100}%` }}
                              />
                            </div>
                            <span className="text-xs">{(stat.nullRate * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${(1 - stat.nullRate) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs">{((1 - stat.nullRate) * 100).toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">{stat.uniqueCount}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${
                            stat.isNumeric ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}>
                            {stat.isNumeric ? "Numeric" : "Text"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Detailed Statistics */}
            <section>
              <Label className="text-base mb-3 block">Detailed Column Info</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {columnStats.map((stat) => (
                  <div key={stat.column} className="p-4 border rounded-md">
                    <p className="font-medium font-mono mb-3">{stat.column}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Min:</span>
                        <span className="font-mono">{stat.min ?? "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max:</span>
                        <span className="font-mono">{stat.max ?? "N/A"}</span>
                      </div>
                      {stat.isNumeric && stat.mean !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mean:</span>
                          <span className="font-mono">{stat.mean.toFixed(2)}</span>
                        </div>
                      )}
                      {stat.isNumeric && stat.median !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Median:</span>
                          <span className="font-mono">{stat.median.toFixed(2)}</span>
                        </div>
                      )}
                      {stat.mode && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mode:</span>
                          <span className="font-mono">{stat.mode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Info Section */}
        {!headers.length && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">What this counter provides:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Total row count and blank row detection</li>
                  <li>Non-empty row count (rows with at least one value)</li>
                  <li>Per-column fill rate and null value statistics</li>
                  <li>Unique value count per column</li>
                  <li>Data type detection (numeric vs text)</li>
                  <li>Min, max, mean, median, and mode for numeric columns</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
