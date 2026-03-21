"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, ArrowUpDown, Plus, X, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData, sortCsvRows } from "./csv-utils";

interface SortConfig {
  id: string;
  column: string;
  direction: "asc" | "desc";
  type: "text" | "number" | "date";
}

export default function CsvRowSorter() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        setSortConfigs([]);
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
        setSortConfigs([]);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const addSortLevel = useCallback(() => {
    if (headers.length === 0) return;
    setSortConfigs((prev) => [
      ...prev,
      { id: generateId(), column: headers[0], direction: "asc", type: "text" },
    ]);
  }, [headers]);

  const removeSortLevel = useCallback((id: string) => {
    setSortConfigs((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateSortConfig = useCallback((id: string, field: keyof SortConfig, value: string) => {
    setSortConfigs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }, []);

  const toggleDirection = useCallback((id: string) => {
    setSortConfigs((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, direction: c.direction === "asc" ? "desc" : "asc" } : c
      )
    );
  }, []);

  const moveSortLevel = useCallback((index: number, direction: "up" | "down") => {
    setSortConfigs((prev) => {
      const updated = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updated.length) return prev;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }, []);

  const sortRows = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (sortConfigs.length === 0) {
      toast.error("Please add at least one sort level");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const sortedData = sortCsvRows(
        data,
        sortConfigs.map((c) => ({
          column: c.column,
          direction: c.direction,
          type: c.type,
        }))
      );

      const csvOutput = [headers.join(","), ...sortedData.map((row) => headers.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Sorted ${data.length} rows by ${sortConfigs.length} column(s)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sorting failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, sortConfigs, headers]);

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
      exportCSVData(data, "sorted.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setSortConfigs([]);
  }, []);

  const getPreview = useCallback(() => {
    if (!inputText || sortConfigs.length === 0) return null;

    try {
      const { data } = parseCSVIntelligently(inputText);
      return {
        totalRows: data.length,
        sortLevels: sortConfigs.length,
      };
    } catch {
      return null;
    }
  }, [inputText, sortConfigs]);

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
              setSortConfigs([]);
            }}
            placeholder="Paste CSV data here...&#10;name,age,hire_date,salary&#10;John,30,2020-01-15,50000&#10;Jane,25,2019-06-20,60000"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Sort Configuration Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Sort Configuration</Label>
                <Button variant="outline" size="sm" onClick={addSortLevel}>
                  <Plus className="w-4 h-4" />
                  Add Sort Level
                </Button>
              </div>

              {sortConfigs.length > 0 ? (
                <div className="space-y-2">
                  {sortConfigs.map((config, index) => (
                    <div key={config.id} className="flex items-center gap-2 p-3 border rounded-md">
                      {/* Priority indicator */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveSortLevel(index, "up")}
                          disabled={index === 0}
                          className="h-6 w-6"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <span className="text-xs text-muted-foreground text-center w-6">
                          {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveSortLevel(index, "down")}
                          disabled={index === sortConfigs.length - 1}
                          className="h-6 w-6"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Column selection */}
                      <Select
                        value={config.column}
                        onValueChange={(value) => updateSortConfig(config.id, "column", value)}
                      >
                        <SelectTrigger className="w-40">
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

                      {/* Sort type */}
                      <Select
                        value={config.type}
                        onValueChange={(value) => updateSortConfig(config.id, "type", value)}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Direction toggle */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleDirection(config.id)}
                        className="w-24"
                      >
                        {config.direction === "asc" ? (
                          <>
                            <ArrowUp className="w-4 h-4" />
                            Asc
                          </>
                        ) : (
                          <>
                            <ArrowDown className="w-4 h-4" />
                            Desc
                          </>
                        )}
                      </Button>

                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSortLevel(config.id)}
                        className="ml-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border rounded-md text-center text-muted-foreground">
                  Click "Add Sort Level" to configure sorting
                </div>
              )}

              {sortConfigs.length > 0 && (
                <div className="mt-3 p-3 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    Sort by:{" "}
                    {sortConfigs.map((c, i) => (
                      <span key={c.id}>
                        <span className="font-medium">{c.column}</span>
                        <span className="text-xs"> ({c.direction})</span>
                        {i < sortConfigs.length - 1 && ", then "}
                      </span>
                    ))}
                  </p>
                </div>
              )}
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
                      <p className="text-muted-foreground">Sort Levels</p>
                      <p className="font-medium">{preview.sortLevels}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <Separator />

            {/* Sort Button */}
            <section>
              <Button
                onClick={sortRows}
                disabled={isProcessing || sortConfigs.length === 0}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Sorting..."
                ) : (
                  <>
                    <ArrowUpDown className="w-4 h-4" />
                    Sort Rows
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Sorted Output</Label>
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
              <ArrowUpDown className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Row Sorter:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Add sort levels for primary, secondary, etc. sorting</li>
                  <li>Choose sort type: Text (alphabetical), Number, or Date</li>
                  <li>Toggle between ascending and descending order</li>
                  <li>Reorder sort levels using arrow buttons</li>
                  <li>Click "Sort Rows" to generate output</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
