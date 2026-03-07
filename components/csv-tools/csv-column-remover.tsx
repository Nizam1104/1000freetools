"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData, removeColumns } from "./csv-utils";

export default function CsvColumnRemover() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnsToRemove, setColumnsToRemove] = useState<string[]>([]);
  const [useIndexMode, setUseIndexMode] = useState<boolean>(false);
  const [indexInput, setIndexInput] = useState<string>("");
  const [invertSelection, setInvertSelection] = useState<boolean>(false);
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
        setColumnsToRemove([]);
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
        setColumnsToRemove([]);
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
    setColumnsToRemove((prev) => {
      if (prev.includes(column)) {
        return prev.filter((c) => c !== column);
      }
      return [...prev, column];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setColumnsToRemove([...headers]);
  }, [headers]);

  const handleDeselectAll = useCallback(() => {
    setColumnsToRemove([]);
  }, []);

  const handleIndexSubmit = useCallback(() => {
    const indices = indexInput.split(",").map((i) => parseInt(i.trim(), 10)).filter((n) => !isNaN(n));
    const selected = indices.filter((i) => i >= 0 && i < headers.length).map((i) => headers[i]);
    setColumnsToRemove(selected);
    setIndexInput("");
    toast.success(`Selected ${selected.length} column(s) by index`);
  }, [indexInput, headers]);

  const removeSelectedColumns = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (columnsToRemove.length === 0) {
      toast.error("Please select columns to remove");
      return;
    }

    if (columnsToRemove.length >= headers.length) {
      toast.error("Cannot remove all columns");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const { data: newData, headers: newHeaders } = removeColumns(data, headers, columnsToRemove);

      const csvOutput = [newHeaders.join(","), ...newData.map((row) => newHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Removed ${columnsToRemove.length} column(s), ${newHeaders.length} remaining`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Column removal failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, columnsToRemove, headers]);

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
      exportCSVData(data, "columns-removed.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setColumnsToRemove([]);
  }, []);

  const remainingColumns = headers.filter((h) => !columnsToRemove.includes(h));

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Column Remover</h1>
        <p className="text-muted-foreground">
          Remove selected columns from CSV by name or index
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
              if (parsedHeaders.length > 0) {
                setHeaders(parsedHeaders);
                setColumnsToRemove([]);
              }
            }}
            placeholder="Paste CSV data here...&#10;name,age,email,city&#10;John,30,john@example.com,New York&#10;Jane,25,jane@example.com,Los Angeles"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Column Selection Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Select Columns to Remove</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                    Deselect All
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="indexMode"
                    checked={useIndexMode}
                    onCheckedChange={(checked) => setUseIndexMode(checked as boolean)}
                  />
                  <Label htmlFor="indexMode" className="text-sm cursor-pointer">
                    Use index-based selection
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="invertSelection"
                    checked={invertSelection}
                    onCheckedChange={(checked) => setInvertSelection(checked as boolean)}
                  />
                  <Label htmlFor="invertSelection" className="text-sm cursor-pointer">
                    Invert selection (select columns to keep)
                  </Label>
                </div>
              </div>

              {useIndexMode ? (
                <div className="flex items-center gap-2 p-3 border rounded-md">
                  <Input
                    value={indexInput}
                    onChange={(e) => setIndexInput(e.target.value)}
                    placeholder="Enter column indices to remove (e.g., 1,3)"
                    className="flex-1"
                  />
                  <Button onClick={handleIndexSubmit} size="sm">
                    Apply
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3 border rounded-md max-h-48 overflow-y-auto">
                  {headers.map((column) => {
                    const isChecked = invertSelection
                      ? !columnsToRemove.includes(column)
                      : columnsToRemove.includes(column);
                    return (
                      <div key={column} className="flex items-center space-x-2">
                        <Checkbox
                          id={`col-${column}`}
                          checked={isChecked}
                          onCheckedChange={() => {
                            if (invertSelection) {
                              // When inverted, checked means "keep", so uncheck = remove
                              if (isChecked) {
                                setColumnsToRemove((prev) => [...prev, column]);
                              } else {
                                setColumnsToRemove((prev) => prev.filter((c) => c !== column));
                              }
                            } else {
                              handleColumnToggle(column);
                            }
                          }}
                        />
                        <Label htmlFor={`col-${column}`} className="text-sm cursor-pointer font-mono">
                          {column}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}

              {columnsToRemove.length > 0 && (
                <div className="mt-3 p-3 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Columns to remove: <span className="font-medium">{columnsToRemove.length}</span> | 
                    Remaining: <span className="font-medium">{remainingColumns.length}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Removing: {columnsToRemove.join(", ")}
                  </p>
                </div>
              )}
            </section>

            <Separator />

            {/* Remove Button */}
            <section>
              <Button
                onClick={removeSelectedColumns}
                disabled={isProcessing || columnsToRemove.length === 0 || remainingColumns.length === 0}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Removing..."
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Remove Selected Columns
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Output (Columns Removed)</Label>
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
              <Trash2 className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Column Remover:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Select columns to remove by name or index</li>
                  <li>Use "Invert selection" to select columns to keep instead</li>
                  <li>Click "Remove Selected Columns" to generate output</li>
                  <li>Copy or download the modified CSV</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
