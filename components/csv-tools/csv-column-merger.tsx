"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Combine, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

export default function CsvColumnMerger() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [newColumnName, setNewColumnName] = useState<string>("merged_column");
  const [separator, setSeparator] = useState<string>(" ");
  const [removeOriginals, setRemoveOriginals] = useState<boolean>(true);
  const [customSeparator, setCustomSeparator] = useState<boolean>(false);
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
        setSelectedColumns([]);
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
        setSelectedColumns([]);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    setSelectedColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((c) => c !== column);
      }
      return [...prev, column];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedColumns([...headers]);
  }, [headers]);

  const handleDeselectAll = useCallback(() => {
    setSelectedColumns([]);
  }, []);

  const mergeColumns = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (selectedColumns.length < 2) {
      toast.error("Please select at least 2 columns to merge");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      // Build new headers
      const newHeaders = removeOriginals
        ? headers.filter((h) => !selectedColumns.includes(h))
        : [...headers];

      if (!newHeaders.includes(newColumnName)) {
        newHeaders.push(newColumnName);
      }

      // Build new data
      const newData: CSVRow[] = data.map((row) => {
        const newRow: CSVRow = {};

        if (removeOriginals) {
          headers.forEach((header) => {
            if (!selectedColumns.includes(header)) {
              newRow[header] = row[header] || "";
            }
          });
        } else {
          Object.assign(newRow, row);
        }

        // Merge selected columns
        const mergedValue = selectedColumns
          .map((col) => String(row[col] || ""))
          .join(separator);

        newRow[newColumnName] = mergedValue;

        return newRow;
      });

      const csvOutput = [newHeaders.join(","), ...newData.map((row) => newHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Merged ${selectedColumns.length} columns into "${newColumnName}"`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Column merge failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, selectedColumns, newColumnName, separator, removeOriginals, headers]);

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
      exportCSVData(data, "merged-columns.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setSelectedColumns([]);
  }, []);

  const getPreview = useCallback(() => {
    if (!inputText || selectedColumns.length < 2) return null;

    try {
      const { data } = parseCSVIntelligently(inputText);
      if (data.length === 0) return null;

      const sampleRow = data[0];
      const previewValue = selectedColumns
        .map((col) => String(sampleRow[col] || ""))
        .join(separator);

      return {
        rowCount: data.length,
        previewValue,
        columns: selectedColumns,
      };
    } catch {
      return null;
    }
  }, [inputText, selectedColumns, separator]);

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
              setSelectedColumns([]);
            }}
            placeholder="Paste CSV data here...&#10;first_name,last_name,email&#10;John,Doe,john@example.com&#10;Jane,Smith,jane@example.com"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Column Selection Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Select Columns to Merge</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                    Deselect All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3 border rounded-md max-h-48 overflow-y-auto">
                {headers.map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox
                      id={`col-${column}`}
                      checked={selectedColumns.includes(column)}
                      onCheckedChange={() => handleColumnToggle(column)}
                    />
                    <Label htmlFor={`col-${column}`} className="text-sm cursor-pointer font-mono">
                      {column}
                    </Label>
                  </div>
                ))}
              </div>

              {selectedColumns.length > 0 && (
                <div className="mt-3 p-3 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium">{selectedColumns.length}</span> column(s)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedColumns.join(" + ")}
                  </p>
                </div>
              )}
            </section>

            {/* Merge Configuration Section */}
            <section>
              <Label className="text-base mb-3 block">Merge Configuration</Label>

              <div className="space-y-4">
                {/* New column name */}
                <div>
                  <Label htmlFor="new-column-name" className="text-sm mb-2 block">
                    New Column Name
                  </Label>
                  <Input
                    id="new-column-name"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter name for merged column"
                  />
                </div>

                {/* Separator selection */}
                <div>
                  <Label className="text-sm mb-2 block">Separator</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Button
                      variant={!customSeparator ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setCustomSeparator(false); setSeparator(" "); }}
                    >
                      Space
                    </Button>
                    <Button
                      variant={!customSeparator && separator === "," ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setCustomSeparator(false); setSeparator(","); }}
                    >
                      Comma
                    </Button>
                    <Button
                      variant={!customSeparator && separator === "-" ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setCustomSeparator(false); setSeparator("-"); }}
                    >
                      Hyphen
                    </Button>
                    <Button
                      variant={!customSeparator && separator === "_" ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setCustomSeparator(false); setSeparator("_"); }}
                    >
                      Underscore
                    </Button>
                    <Button
                      variant={!customSeparator && separator === " | " ? "default" : "outline"}
                      size="sm"
                      onClick={() => { setCustomSeparator(false); setSeparator(" | "); }}
                    >
                      Pipe
                    </Button>
                    <Button
                      variant={customSeparator ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCustomSeparator(true)}
                    >
                      Custom
                    </Button>
                  </div>
                  {customSeparator && (
                    <Input
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value)}
                      placeholder="Enter custom separator"
                      className="max-w-xs"
                    />
                  )}
                </div>

                {/* Remove originals */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remove-originals"
                    checked={removeOriginals}
                    onCheckedChange={(checked) => setRemoveOriginals(checked as boolean)}
                  />
                  <Label htmlFor="remove-originals" className="text-sm cursor-pointer">
                    Remove original columns after merging
                  </Label>
                </div>
              </div>
            </section>

            {/* Preview Section */}
            {preview && (
              <section>
                <Label className="text-base mb-3 block">Preview</Label>
                <div className="p-4 border rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">
                    Merging {preview.columns.length} columns with "{separator}" separator:
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {preview.columns.map((col, index) => (
                      <React.Fragment key={col}>
                        <span className="px-2 py-1 bg-muted rounded text-sm font-mono">{col}</span>
                        {index < preview.columns.length - 1 && (
                          <span className="text-muted-foreground">+</span>
                        )}
                      </React.Fragment>
                    ))}
                    <span className="text-muted-foreground">=</span>
                    <span className="px-2 py-1 bg-primary/10 rounded text-sm font-mono">
                      {newColumnName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Sample result:</p>
                  <p className="font-mono text-sm bg-muted p-2 rounded">{preview.previewValue}</p>
                </div>
              </section>
            )}

            <Separator />

            {/* Merge Button */}
            <section>
              <Button
                onClick={mergeColumns}
                disabled={isProcessing || selectedColumns.length < 2}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Merging..."
                ) : (
                  <>
                    <Combine className="w-4 h-4" />
                    Merge Columns
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Merged Output</Label>
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
          </>
        )}

        {/* Info Section */}
        {!headers.length && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Combine className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Column Merger:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Select 2 or more columns to merge</li>
                  <li>Specify a name for the new merged column</li>
                  <li>Choose a separator (space, comma, custom, etc.)</li>
                  <li>Optionally remove original columns</li>
                  <li>Click "Merge Columns" to generate output</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
