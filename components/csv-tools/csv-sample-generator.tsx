"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Shuffle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  parseCSVIntelligently,
  copyToClipboard,
  sampleCsvRows,
  seededRandom,
  CSVRow,
} from "./csv-utils";

export default function CsvSampleGenerator() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Sampling options
  const [sampleType, setSampleType] = useState<"count" | "percentage">("count");
  const [sampleCount, setSampleCount] = useState<number>(100);
  const [samplePercentage, setSamplePercentage] = useState<number>(10);
  const [useSeed, setUseSeed] = useState<boolean>(false);
  const [seed, setSeed] = useState<string>("");
  const [stratifyColumn, setStratifyColumn] = useState<string>("");
  const [useStratification, setUseStratification] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        const { headers } = parseCSVIntelligently(text);
        setHeaders(headers);
        if (headers.length > 0 && !stratifyColumn) {
          setStratifyColumn(headers[0]);
        }
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    [stratifyColumn]
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        setInputText(text);
        const { headers } = parseCSVIntelligently(text);
        setHeaders(headers);
        if (headers.length > 0 && !stratifyColumn) {
          setStratifyColumn(headers[0]);
        }
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, [stratifyColumn]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const generateSample = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers: csvHeaders } = parseCSVIntelligently(inputText);

      if (data.length === 0) {
        toast.error("No data found in CSV");
        setIsProcessing(false);
        return;
      }

      let sampledData: CSVRow[];

      if (useStratification && stratifyColumn && csvHeaders.includes(stratifyColumn)) {
        // Stratified sampling
        const strata = new Map<string, CSVRow[]>();
        
        data.forEach((row) => {
          const stratumKey = String(row[stratifyColumn] || "unknown");
          if (!strata.has(stratumKey)) {
            strata.set(stratumKey, []);
          }
          strata.get(stratumKey)!.push(row);
        });

        sampledData = [];
        const targetSize = sampleType === "count" 
          ? sampleCount 
          : Math.floor((samplePercentage / 100) * data.length);

        // Calculate proportional sample size for each stratum
        const stratumSizes = Array.from(strata.entries()).map(([key, rows]) => ({
          key,
          size: rows.length,
          proportion: rows.length / data.length,
          rows,
        }));

        // Sample proportionally from each stratum
        let remaining = targetSize;
        stratumSizes.forEach((stratum, index) => {
          const isLast = index === stratumSizes.length - 1;
          const stratumSampleSize = isLast 
            ? remaining 
            : Math.round(stratum.proportion * targetSize);
          
          const actualSize = Math.min(stratumSampleSize, stratum.size);
          remaining -= actualSize;

          const stratumSeed = useSeed && seed ? (parseInt(seed) || 0) + stratum.key.length : undefined;
          const sampled = sampleCsvRows(stratum.rows, {
            type: "count",
            count: actualSize,
            seed: stratumSeed,
          });
          
          sampledData.push(...sampled);
        });
      } else {
        // Simple random sampling
        if (useSeed && seed) {
          const sampleSeed = parseInt(seed) || 0;
          if (sampleType === "count") {
            sampledData = sampleCsvRows(data, { type: "count", count: sampleCount || 100, seed: sampleSeed });
          } else {
            sampledData = sampleCsvRows(data, { type: "percentage", percentage: samplePercentage || 10, seed: sampleSeed });
          }
        } else {
          if (sampleType === "count") {
            sampledData = sampleCsvRows(data, { type: "count", count: sampleCount || 100 });
          } else {
            sampledData = sampleCsvRows(data, { type: "percentage", percentage: samplePercentage || 10 });
          }
        }
      }

      // Generate CSV output
      const csvContent = [
        csvHeaders.join(","),
        ...sampledData.map((row) =>
          csvHeaders.map((h) => {
            const value = String(row[h] || "");
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(",")
        ),
      ].join("\n");

      setOutput(csvContent);
      setPreviewData(sampledData.slice(0, 10));
      
      const sampleSize = sampledData.length;
      const percentage = ((sampleSize / data.length) * 100).toFixed(1);
      toast.success(`Sampled ${sampleSize} rows (${percentage}% of original ${data.length} rows)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sampling failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, sampleType, sampleCount, samplePercentage, useSeed, seed, useStratification, stratifyColumn]);

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
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sampled-data.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setPreviewData([]);
    setHeaders([]);
  }, []);

  const getInputStats = () => {
    if (!inputText) return null;
    try {
      const { data, headers: csvHeaders } = parseCSVIntelligently(inputText);
      return {
        rows: data.length,
        columns: csvHeaders.length,
      };
    } catch {
      return null;
    }
  };

  const stats = getInputStats();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">CSV Sample Generator</h2>
        <p className="text-muted-foreground">
          Extract random or stratified samples from CSV data with percentage-based or fixed-count sampling, with seed support for reproducibility
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
            placeholder="Paste CSV data here...&#10;name,age,city&#10;John,30,New York&#10;Jane,25,Los Angeles&#10;Bob,35,Chicago"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />

          {stats && (
            <div className="flex gap-4 mt-3">
              <div className="px-3 py-1.5 bg-muted rounded-md text-sm">
                <span className="font-semibold">{stats.rows}</span> rows
              </div>
              <div className="px-3 py-1.5 bg-muted rounded-md text-sm">
                <span className="font-semibold">{stats.columns}</span> columns
              </div>
            </div>
          )}
        </section>

        <Separator />

        {/* Sampling Options */}
        <section>
          <Label className="text-base mb-3 block">Sampling Options</Label>
          <div className="space-y-4">
            {/* Sample Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Sample Type</Label>
                <Select value={sampleType} onValueChange={(v: any) => setSampleType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="count">Fixed Count</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                {sampleType === "count" ? (
                  <>
                    <Label htmlFor="sampleCount" className="text-sm">
                      Number of Rows: {sampleCount}
                    </Label>
                    <Slider
                      id="sampleCount"
                      value={[sampleCount]}
                      onValueChange={(v) => setSampleCount(v[0])}
                      min={1}
                      max={stats?.rows || 1000}
                      step={1}
                    />
                  </>
                ) : (
                  <>
                    <Label htmlFor="samplePercentage" className="text-sm">
                      Percentage: {samplePercentage}%
                    </Label>
                    <Slider
                      id="samplePercentage"
                      value={[samplePercentage]}
                      onValueChange={(v) => setSamplePercentage(v[0])}
                      min={1}
                      max={100}
                      step={1}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Seed Option */}
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="useSeed"
                checked={useSeed}
                onCheckedChange={(checked) => setUseSeed(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="useSeed" className="text-sm font-medium cursor-pointer">
                  Use Seed for Reproducibility
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Same seed will produce the same sample every time
                </p>
                {useSeed && (
                  <Input
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    placeholder="Enter seed value (e.g., 42)"
                    className="mt-2 h-9 w-48"
                  />
                )}
              </div>
            </div>

            {/* Stratification Option */}
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="useStratification"
                checked={useStratification}
                onCheckedChange={(checked) => setUseStratification(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="useStratification" className="text-sm font-medium cursor-pointer">
                  Stratified Sampling
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Maintain proportional representation across groups
                </p>
                {useStratification && headers.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <Label htmlFor="stratifyColumn" className="text-xs">Stratify by Column</Label>
                    <Select value={stratifyColumn} onValueChange={setStratifyColumn}>
                      <SelectTrigger id="stratifyColumn" className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {headers.map((header) => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Generate Button */}
        <section>
          <Button
            onClick={generateSample}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Sampling..." : "Generate Sample"}
          </Button>
        </section>

        {/* Preview Section */}
        {previewData.length > 0 && headers.length > 0 && (
          <section>
            <Label className="text-base mb-3 block">Preview (first 10 rows)</Label>
            <div className="border rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className="text-left p-3 font-medium whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-muted/30">
                      {headers.map((header) => (
                        <td key={header} className="p-3 font-mono text-xs whitespace-nowrap">
                          {String(row[header])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Sampled CSV Output</Label>
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
        )}

        {/* Info Section */}
        {!output && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Sampling methods:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Fixed Count:</strong> Extract exactly N rows from the dataset</li>
                  <li><strong>Percentage:</strong> Extract a percentage of total rows</li>
                  <li><strong>Seed:</strong> Use a seed value for reproducible random sampling</li>
                  <li><strong>Stratified:</strong> Maintain proportional representation across groups in a column (useful for balanced class distribution)</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
