"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

interface ColumnMapping {
  original: string;
  newName: string;
  order: number;
}

export default function CsvColumnExtractor() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [useIndexMode, setUseIndexMode] = useState<boolean>(false);
  const [indexInput, setIndexInput] = useState<string>("");
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
        setColumnMappings([]);
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
        setColumnMappings([]);
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

  const handleAddMapping = useCallback(() => {
    const newMappings = selectedColumns.map((col, index) => ({
      original: col,
      newName: col,
      order: index,
    }));
    setColumnMappings(newMappings);
  }, [selectedColumns]);

  const handleMappingChange = useCallback((index: number, field: "original" | "newName", value: string) => {
    setColumnMappings((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleReorderMapping = useCallback((index: number, direction: "up" | "down") => {
    setColumnMappings((prev) => {
      const updated = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updated.length) return prev;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated.map((m, i) => ({ ...m, order: i }));
    });
  }, []);

  const handleRemoveMapping = useCallback((index: number) => {
    setColumnMappings((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleIndexSubmit = useCallback(() => {
    const indices = indexInput.split(",").map((i) => parseInt(i.trim(), 10)).filter((n) => !isNaN(n));
    const selected = indices.filter((i) => i >= 0 && i < headers.length).map((i) => headers[i]);
    setSelectedColumns(selected);
    setIndexInput("");
    toast.success(`Selected ${selected.length} column(s) by index`);
  }, [indexInput, headers]);

  const extractColumns = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (columnMappings.length === 0) {
      toast.error("Please select and configure columns to extract");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const newHeaders = columnMappings.map((m) => m.newName);
      const extractedData: CSVRow[] = data.map((row) => {
        const newRow: CSVRow = {};
        columnMappings.forEach((mapping) => {
          newRow[mapping.newName] = row[mapping.original] || "";
        });
        return newRow;
      });

      const csvOutput = [newHeaders.join(","), ...extractedData.map((row) => newHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Extracted ${columnMappings.length} column(s) from ${data.length} row(s)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Extraction failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, columnMappings]);

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
      exportCSVData(data, "extracted.csv");
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
    setColumnMappings([]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Column Extractor</h1>
        <p className="text-muted-foreground">
          Extract specific columns from CSV by name or index, supports reordering and renaming
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
                setSelectedColumns([]);
                setColumnMappings([]);
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
                <Label className="text-base">Select Columns to Extract</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                    Deselect All
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  id="indexMode"
                  checked={useIndexMode}
                  onCheckedChange={(checked) => setUseIndexMode(checked as boolean)}
                />
                <Label htmlFor="indexMode" className="text-sm cursor-pointer">
                  Use index-based selection
                </Label>
              </div>

              {useIndexMode ? (
                <div className="flex items-center gap-2 p-3 border rounded-md">
                  <Input
                    value={indexInput}
                    onChange={(e) => setIndexInput(e.target.value)}
                    placeholder="Enter column indices (e.g., 0,2,4)"
                    className="flex-1"
                  />
                  <Button onClick={handleIndexSubmit} size="sm">
                    Apply
                  </Button>
                </div>
              ) : (
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
              )}

              {selectedColumns.length > 0 && (
                <div className="mt-3 p-3 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium">{selectedColumns.length}</span> column(s)
                  </p>
                </div>
              )}
            </section>

            {/* Column Mapping Section */}
            {selectedColumns.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Configure Column Order and Names</Label>
                  <Button variant="outline" size="sm" onClick={handleAddMapping}>
                    <Plus className="w-4 h-4" />
                    Add to Mapping
                  </Button>
                </div>

                {columnMappings.length > 0 ? (
                  <div className="space-y-2">
                    {columnMappings.map((mapping, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-md">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReorderMapping(index, "up")}
                            disabled={index === 0}
                            className="h-6 w-6"
                          >
                            <ChevronRight className="w-4 h-4 rotate-[-90deg]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReorderMapping(index, "down")}
                            disabled={index === columnMappings.length - 1}
                            className="h-6 w-6"
                          >
                            <ChevronRight className="w-4 h-4 rotate-90" />
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                        <Select
                          value={mapping.original}
                          onValueChange={(value) => handleMappingChange(index, "original", value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedColumns.map((col) => (
                              <SelectItem key={col} value={col}>
                                {col}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        <Input
                          value={mapping.newName}
                          onChange={(e) => handleMappingChange(index, "newName", e.target.value)}
                          placeholder="New name"
                          className="w-40"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMapping(index)}
                          className="ml-auto"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border rounded-md text-center text-muted-foreground">
                    Click "Add to Mapping" to configure column order and names
                  </div>
                )}
              </section>
            )}

            <Separator />

            {/* Extract Button */}
            <section>
              <Button
                onClick={extractColumns}
                disabled={isProcessing || columnMappings.length === 0}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Extracting..." : "Extract Columns"}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Extracted Output</Label>
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
              <FileSpreadsheet className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Column Extractor:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Select columns to extract by name or index</li>
                  <li>Configure column order by dragging or using arrow buttons</li>
                  <li>Rename columns by editing the "New name" field</li>
                  <li>Click "Extract Columns" to generate output</li>
                  <li>Copy or download the extracted data</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
