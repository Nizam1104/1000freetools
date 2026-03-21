"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, CopyCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData, removeDuplicates } from "./csv-utils";

export default function CsvDuplicateRemover() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dedupMode, setDedupMode] = useState<"full-row" | "key-column">("full-row");
  const [keyColumns, setKeyColumns] = useState<string[]>([]);
  const [keepFirst, setKeepFirst] = useState<boolean>(true);
  const [duplicateCount, setDuplicateCount] = useState<number>(0);
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
        setKeyColumns([]);
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
        setKeyColumns([]);
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

  const handleSelectAllKeyColumns = useCallback(() => {
    setKeyColumns([...headers]);
  }, [headers]);

  const handleDeselectAllKeyColumns = useCallback(() => {
    setKeyColumns([]);
  }, []);

  const removeDuplicatesHandler = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (dedupMode === "key-column" && keyColumns.length === 0) {
      toast.error("Please select at least one key column");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const { data: dedupedData, removedCount } = removeDuplicates(data, {
        columns: dedupMode === "key-column" ? keyColumns : undefined,
        keepFirst,
      });

      setDuplicateCount(removedCount);

      const csvOutput = [headers.join(","), ...dedupedData.map((row) => headers.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Removed ${removedCount} duplicate(s), ${dedupedData.length} row(s) remaining`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Deduplication failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, dedupMode, keyColumns, keepFirst, headers]);

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
      exportCSVData(data, "deduplicated.csv");
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
  }, []);

  const getPreview = useCallback(() => {
    if (!inputText) return null;

    try {
      const { data } = parseCSVIntelligently(inputText);
      return {
        totalRows: data.length,
      };
    } catch {
      return null;
    }
  }, [inputText]);

  const preview = getPreview();

  return (
    <div className="w-full max-w-5xl mx-auto">
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
              setKeyColumns([]);
            }}
            placeholder="Paste CSV data here...&#10;id,name,email&#10;1,John,john@example.com&#10;2,Jane,jane@example.com&#10;1,John,john@example.com"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Deduplication Options Section */}
            <section>
              <Label className="text-base mb-3 block">Deduplication Options</Label>

              <div className="space-y-4">
                {/* Mode Selection */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">Deduplication Mode</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="full-row"
                        checked={dedupMode === "full-row"}
                        onCheckedChange={() => setDedupMode("full-row")}
                      />
                      <Label htmlFor="full-row" className="text-sm cursor-pointer">
                        Full-row comparison
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="key-column"
                        checked={dedupMode === "key-column"}
                        onCheckedChange={() => setDedupMode("key-column")}
                      />
                      <Label htmlFor="key-column" className="text-sm cursor-pointer">
                        Key-column based
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Key Column Selection */}
                {dedupMode === "key-column" && (
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm">Select Key Columns</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleSelectAllKeyColumns}>
                          Select All
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDeselectAllKeyColumns}>
                          Deselect All
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {headers.map((column) => (
                        <div key={column} className="flex items-center space-x-2">
                          <Checkbox
                            id={`key-${column}`}
                            checked={keyColumns.includes(column)}
                            onCheckedChange={() => handleKeyColumnToggle(column)}
                          />
                          <Label htmlFor={`key-${column}`} className="text-sm cursor-pointer font-mono">
                            {column}
                          </Label>
                        </div>
                      ))}
                    </div>

                    {keyColumns.length > 0 && (
                      <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                        Key columns: <span className="font-medium">{keyColumns.join(", ")}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Keep First/Last */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">When duplicates are found:</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="keep-first"
                        checked={keepFirst}
                        onCheckedChange={(checked) => setKeepFirst(checked as boolean)}
                      />
                      <Label htmlFor="keep-first" className="text-sm cursor-pointer">
                        Keep first occurrence
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="keep-last"
                        checked={!keepFirst}
                        onCheckedChange={(checked) => setKeepFirst(!(checked as boolean))}
                      />
                      <Label htmlFor="keep-last" className="text-sm cursor-pointer">
                        Keep last occurrence
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Preview Section */}
            {preview && (
              <section>
                <Label className="text-base mb-3 block">Preview</Label>
                <div className="p-4 border rounded-md bg-muted/30">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Rows</p>
                      <p className="font-medium">{preview.totalRows}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mode</p>
                      <p className="font-medium">
                        {dedupMode === "full-row" ? "Full-row comparison" : `Key columns: ${keyColumns.join(", ")}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Keep</p>
                      <p className="font-medium">{keepFirst ? "First" : "Last"} occurrence</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <Separator />

            {/* Remove Duplicates Button */}
            <section>
              <Button
                onClick={removeDuplicatesHandler}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Removing Duplicates..."
                ) : (
                  <>
                    <CopyCheck className="w-4 h-4" />
                    Remove Duplicates
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <>
                {/* Summary */}
                <section>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-2xl font-semibold">{preview?.totalRows}</p>
                      <p className="text-sm text-muted-foreground">Original Rows</p>
                    </div>
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-2xl font-semibold text-red-600">{duplicateCount}</p>
                      <p className="text-sm text-muted-foreground">Duplicates Removed</p>
                    </div>
                    <div className="p-4 border rounded-md text-center">
                      <p className="text-2xl font-semibold text-green-600">{preview!.totalRows - duplicateCount}</p>
                      <p className="text-sm text-muted-foreground">Remaining Rows</p>
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
              <CopyCheck className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Duplicate Remover:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Choose full-row comparison or key-column based deduplication</li>
                  <li>For key-column mode, select which columns to use for comparison</li>
                  <li>Choose whether to keep the first or last occurrence</li>
                  <li>Click "Remove Duplicates" to generate output</li>
                  <li>View summary and download the cleaned data</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
