"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, BarChart3, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  parseCSVIntelligently,
  copyToClipboard,
  calculateColumnStats,
  valueFrequencyDistribution,
  CSVRow,
} from "./csv-utils";

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

interface FrequencyItem {
  value: string;
  count: number;
  percentage: number;
}

export default function CsvColumnStatistics() {
  const [inputText, setInputText] = useState<string>("");
  const [stats, setStats] = useState<ColumnStats[] | null>(null);
  const [frequencies, setFrequencies] = useState<Record<string, FrequencyItem[]>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [topN, setTopN] = useState<number>(10);
  const [showFrequency, setShowFrequency] = useState<boolean>(true);
  const [minFrequency, setMinFrequency] = useState<number>(1);
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

  const calculateStats = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      if (data.length === 0) {
        toast.error("No data found in CSV");
        setIsProcessing(false);
        return;
      }

      const columnStats = calculateColumnStats(data, headers);

      setStats(columnStats);

      // Calculate frequency distributions
      if (showFrequency) {
        const freqData: Record<string, FrequencyItem[]> = {};
        headers.forEach((header) => {
          freqData[header] = valueFrequencyDistribution(data, header, {
            topN,
            minCount: minFrequency,
          });
        });
        setFrequencies(freqData);
      }

      if (headers.length > 0) {
        setSelectedColumn(headers[0]);
      }

      toast.success(`Calculated statistics for ${headers.length} columns`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Statistics calculation failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, showFrequency, topN, minFrequency]);

  const copyToClipboardHandler = useCallback(async () => {
    if (!stats) return;
    try {
      let text = "Column,Count,Null Rate,Unique,Min,Max,Mean,Median,Mode\n";
      stats.forEach((stat) => {
        text += `${stat.column},${stat.count},${(stat.nullRate * 100).toFixed(1)}%,${stat.uniqueCount},${stat.min ?? ""},${stat.max ?? ""},${stat.mean?.toFixed(2) ?? ""},${stat.median?.toFixed(2) ?? ""},${stat.mode ?? ""}\n`;
      });
      await copyToClipboard(text);
      setCopied(true);
      toast.success("Copied statistics to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, [stats]);

  const downloadOutput = useCallback(() => {
    if (!stats) return;
    let text = "Column,Count,Null Rate,Unique,Min,Max,Mean,Median,Mode\n";
    stats.forEach((stat) => {
      text += `${stat.column},${stat.count},${(stat.nullRate * 100).toFixed(1)}%,${stat.uniqueCount},${stat.min ?? ""},${stat.max ?? ""},${stat.mean?.toFixed(2) ?? ""},${stat.median?.toFixed(2) ?? ""},${stat.mode ?? ""}\n`;
    });
    const blob = new Blob([text], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "column-statistics.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded statistics CSV");
  }, [stats]);

  const clearAll = useCallback(() => {
    setInputText("");
    setStats(null);
    setFrequencies({});
    setSelectedColumn("");
  }, []);

  const getNumericColumns = () => {
    if (!stats) return [];
    return stats.filter((s) => s.isNumeric).map((s) => s.column);
  };

  const getCategoricalColumns = () => {
    if (!stats) return [];
    return stats.filter((s) => !s.isNumeric).map((s) => s.column);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">CSV Column Statistics</h2>
        <p className="text-muted-foreground">
          Compute per-column statistics including count, null rate, unique values, min/max, mean/median/mode, and value frequency distribution
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
            placeholder="Paste CSV data here...&#10;name,age,email,score&#10;John,30,john@example.com,85&#10;Jane,25,jane@example.com,92"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Frequency Distribution Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-end space-x-3 p-3 border rounded-md">
              <Checkbox
                id="showFrequency"
                checked={showFrequency}
                onCheckedChange={(checked) => setShowFrequency(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="showFrequency" className="text-sm font-medium cursor-pointer">
                  Show Frequency Distribution
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Display value frequency for each column
                </p>
              </div>
            </div>

            <div className="space-y-2 p-3 border rounded-md">
              <Label htmlFor="topN" className="text-sm">Top N Values</Label>
              <div className="flex items-center gap-3">
                <Slider
                  id="topN"
                  value={[topN]}
                  onValueChange={(v) => setTopN(v[0])}
                  min={5}
                  max={50}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-8">{topN}</span>
              </div>
            </div>

            <div className="space-y-2 p-3 border rounded-md">
              <Label htmlFor="minFrequency" className="text-sm">Min Frequency</Label>
              <div className="flex items-center gap-3">
                <Slider
                  id="minFrequency"
                  value={[minFrequency]}
                  onValueChange={(v) => setMinFrequency(v[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-8">{minFrequency}</span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Calculate Button */}
        <section>
          <Button
            onClick={calculateStats}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Calculating..." : "Calculate Statistics"}
          </Button>
        </section>

        {/* Results Section */}
        {stats && (
          <>
            {/* Summary Stats */}
            <section>
              <Label className="text-base mb-3 block">Column Overview</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{stats.length}</p>
                  <p className="text-xs text-muted-foreground">Total Columns</p>
                </div>
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{getNumericColumns().length}</p>
                  <p className="text-xs text-muted-foreground">Numeric Columns</p>
                </div>
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{getCategoricalColumns().length}</p>
                  <p className="text-xs text-muted-foreground">Categorical Columns</p>
                </div>
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{stats[0]?.count ?? 0}</p>
                  <p className="text-xs text-muted-foreground">Total Rows</p>
                </div>
              </div>
            </section>

            {/* Column Selection */}
            {showFrequency && stats.length > 0 && (
              <section>
                <Label className="text-base mb-3 block">Select Column for Frequency View</Label>
                <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stats.map((stat) => (
                      <SelectItem key={stat.column} value={stat.column}>
                        {stat.column} ({stat.isNumeric ? "Numeric" : "Categorical"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>
            )}

            {/* All Column Statistics Table */}
            <section>
              <Label className="text-base mb-3 block">All Column Statistics</Label>
              <div className="border rounded-md overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 font-medium">Column</th>
                      <th className="text-left p-3 font-medium">Count</th>
                      <th className="text-left p-3 font-medium">Null Rate</th>
                      <th className="text-left p-3 font-medium">Unique</th>
                      <th className="text-left p-3 font-medium">Min</th>
                      <th className="text-left p-3 font-medium">Max</th>
                      <th className="text-left p-3 font-medium">Mean</th>
                      <th className="text-left p-3 font-medium">Median</th>
                      <th className="text-left p-3 font-medium">Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((stat, index) => (
                      <tr key={index} className="border-t hover:bg-muted/30">
                        <td className="p-3 font-mono">{stat.column}</td>
                        <td className="p-3">{stat.count}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            stat.nullRate === 0 ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                            stat.nullRate < 0.1 ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
                            'bg-red-500/10 text-red-700 dark:text-red-400'
                          }`}>
                            {(stat.nullRate * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-3">{stat.uniqueCount}</td>
                        <td className="p-3 font-mono text-xs">{stat.min ?? "-"}</td>
                        <td className="p-3 font-mono text-xs">{stat.max ?? "-"}</td>
                        <td className="p-3 font-mono text-xs">{stat.mean?.toFixed(2) ?? "-"}</td>
                        <td className="p-3 font-mono text-xs">{stat.median?.toFixed(2) ?? "-"}</td>
                        <td className="p-3 font-mono text-xs truncate max-w-[100px]">{stat.mode ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Selected Column Frequency Distribution */}
            {showFrequency && selectedColumn && frequencies[selectedColumn] && (
              <section>
                <Label className="text-base mb-3 block">
                  Value Frequency: {selectedColumn}
                </Label>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Value</th>
                        <th className="text-left p-3 font-medium">Count</th>
                        <th className="text-left p-3 font-medium">Percentage</th>
                        <th className="text-left p-3 font-medium">Distribution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frequencies[selectedColumn].map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-mono truncate max-w-[200px]">{item.value}</td>
                          <td className="p-3">{item.count}</td>
                          <td className="p-3">{item.percentage.toFixed(1)}%</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${Math.min(item.percentage * 2, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {item.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Action Buttons */}
            <section>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboardHandler}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy Stats"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadOutput}>
                  <Download className="w-4 h-4" />
                  Download CSV
                </Button>
              </div>
            </section>
          </>
        )}

        {/* Info Section */}
        {!stats && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Statistics computed:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Count:</strong> Total number of values in column</li>
                  <li><strong>Null Rate:</strong> Percentage of empty/null values</li>
                  <li><strong>Unique:</strong> Number of distinct values</li>
                  <li><strong>Min/Max:</strong> Minimum and maximum values</li>
                  <li><strong>Mean:</strong> Average value (numeric columns only)</li>
                  <li><strong>Median:</strong> Middle value when sorted</li>
                  <li><strong>Mode:</strong> Most frequently occurring value</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
