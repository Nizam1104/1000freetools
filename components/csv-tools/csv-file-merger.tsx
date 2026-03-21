"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Combine, Plus, X, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

interface CsvFile {
  id: string;
  name: string;
  content: string;
  headers: string[];
  data: CSVRow[];
}

type AlignmentStrategy = "union" | "intersection" | "first";

export default function CsvFileMerger() {
  const [files, setFiles] = useState<CsvFile[]>([]);
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [alignmentStrategy, setAlignmentStrategy] = useState<AlignmentStrategy>("union");
  const [includeSourceColumn, setIncludeSourceColumn] = useState<boolean>(false);
  const [sourceColumnName, setSourceColumnName] = useState<string>("source_file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList || fileList.length === 0) return;

      const newFiles: CsvFile[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (!file.name.toLowerCase().endsWith(".csv")) {
          toast.error(`Skipping ${file.name}: Not a CSV file`);
          continue;
        }

        try {
          const text = await file.text();
          const { headers, data } = parseCSVIntelligently(text);
          newFiles.push({
            id: generateId(),
            name: file.name,
            content: text,
            headers,
            data,
          });
        } catch (error) {
          toast.error(`Failed to read ${file.name}`);
        }
      }

      if (newFiles.length > 0) {
        setFiles((prev) => [...prev, ...newFiles]);
        toast.success(`Added ${newFiles.length} file(s)`);
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    
    const csvFiles = droppedFiles.filter((f) => f.name.toLowerCase().endsWith(".csv"));
    
    if (csvFiles.length === 0) {
      toast.error("Please drop CSV files");
      return;
    }

    const newFiles: CsvFile[] = [];

    csvFiles.forEach(async (file) => {
      try {
        const text = await file.text();
        const { headers, data } = parseCSVIntelligently(text);
        newFiles.push({
          id: generateId(),
          name: file.name,
          content: text,
          headers,
          data,
        });

        if (newFiles.length === csvFiles.length) {
          setFiles((prev) => [...prev, ...newFiles]);
          toast.success(`Added ${newFiles.length} file(s)`);
        }
      } catch {
        toast.error(`Failed to read ${file.name}`);
      }
    });
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const addTextFile = useCallback(() => {
    const name = `pasted_${files.length + 1}.csv`;
    setFiles((prev) => [
      ...prev,
      {
        id: generateId(),
        name,
        content: "",
        headers: [],
        data: [],
      },
    ]);
  }, [files.length]);

  const updateFileContent = useCallback((id: string, content: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const { headers, data } = parseCSVIntelligently(content);
        return { ...f, content, headers, data };
      })
    );
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success("File removed");
  }, []);

  const moveFile = useCallback((index: number, direction: "up" | "down") => {
    setFiles((prev) => {
      const updated = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updated.length) return prev;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }, []);

  const mergeFiles = useCallback(() => {
    if (files.length === 0) {
      toast.error("Please add at least one CSV file");
      return;
    }

    const validFiles = files.filter((f) => f.headers.length > 0 && f.data.length > 0);
    if (validFiles.length === 0) {
      toast.error("No valid CSV data found in added files");
      return;
    }

    setIsProcessing(true);

    try {
      let mergedHeaders: string[];

      // Determine headers based on alignment strategy
      if (alignmentStrategy === "union") {
        const allHeaders = new Set<string>();
        validFiles.forEach((f) => f.headers.forEach((h) => allHeaders.add(h)));
        mergedHeaders = Array.from(allHeaders);
      } else if (alignmentStrategy === "intersection") {
        const commonHeaders = new Set(validFiles[0].headers);
        validFiles.slice(1).forEach((f) => {
          f.headers.forEach((h) => {
            if (!commonHeaders.has(h)) {
              commonHeaders.delete(h);
            }
          });
        });
        mergedHeaders = Array.from(commonHeaders);
      } else {
        // First file headers
        mergedHeaders = [...validFiles[0].headers];
      }

      // Merge data
      const mergedData: CSVRow[] = [];

      validFiles.forEach((file) => {
        file.data.forEach((row) => {
          const newRow: CSVRow = {};

          mergedHeaders.forEach((header) => {
            if (file.headers.includes(header)) {
              newRow[header] = row[header] || "";
            } else {
              newRow[header] = ""; // Fill missing columns with empty string
            }
          });

          if (includeSourceColumn) {
            newRow[sourceColumnName] = file.name;
          }

          mergedData.push(newRow);
        });
      });

      const csvOutput = [mergedHeaders.join(","), ...mergedData.map((row) => mergedHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Merged ${validFiles.length} files with ${mergedData.length} total rows`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Merge failed");
    } finally {
      setIsProcessing(false);
    }
  }, [files, alignmentStrategy, includeSourceColumn, sourceColumnName]);

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
      exportCSVData(data, "merged.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setFiles([]);
    setOutput("");
  }, []);

  const getAllHeaders = () => {
    const allHeaders = new Set<string>();
    files.forEach((f) => f.headers.forEach((h) => allHeaders.add(h)));
    return Array.from(allHeaders);
  };

  const allHeaders = getAllHeaders();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="space-y-6">
        {/* File Upload Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">Add CSV Files</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
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
                Drag and drop CSV files here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">Supports multiple file selection</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={addTextFile}>
              <Plus className="w-4 h-4" />
              Add Text Input
            </Button>
          </div>
        </section>

        {/* Files List Section */}
        {files.length > 0 && (
          <section>
            <Label className="text-base mb-3 block">
              Files to Merge ({files.length})
            </Label>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={file.id} className="p-4 border rounded-md">
                  <div className="flex items-start gap-3">
                    {/* Move buttons */}
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveFile(index, "up")}
                        disabled={index === 0}
                        className="h-6 w-6"
                      >
                        <ArrowDown className="w-4 h-4 rotate-180" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveFile(index, "down")}
                        disabled={index === files.length - 1}
                        className="h-6 w-6"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                          <span className="font-medium truncate">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.id)}
                          className="h-8 w-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {file.headers.length > 0 ? (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {file.data.length} rows x {file.headers.length} columns
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {file.headers.slice(0, 5).map((header) => (
                              <span
                                key={header}
                                className="px-2 py-0.5 bg-muted rounded text-xs font-mono"
                              >
                                {header}
                              </span>
                            ))}
                            {file.headers.length > 5 && (
                              <span className="text-xs text-muted-foreground">
                                +{file.headers.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Textarea
                          value={file.content}
                          onChange={(e) => updateFileContent(file.id, e.target.value)}
                          placeholder="Paste CSV data here..."
                          className="min-h-[100px] font-mono text-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {files.length > 0 && (
          <>
            <Separator />

            {/* Merge Configuration Section */}
            <section>
              <Label className="text-base mb-3 block">Merge Configuration</Label>

              <div className="space-y-4">
                {/* Alignment Strategy */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">Column Alignment Strategy</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button
                      variant={alignmentStrategy === "union" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAlignmentStrategy("union")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">Union (All Columns)</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Keep all columns from all files
                      </span>
                    </Button>
                    <Button
                      variant={alignmentStrategy === "intersection" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAlignmentStrategy("intersection")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">Intersection</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Only common columns
                      </span>
                    </Button>
                    <Button
                      variant={alignmentStrategy === "first" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAlignmentStrategy("first")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">First File</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Use first file's columns
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Source Column */}
                <div className="p-4 border rounded-md">
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="source-column"
                      checked={includeSourceColumn}
                      onCheckedChange={(checked) => setIncludeSourceColumn(checked as boolean)}
                    />
                    <Label htmlFor="source-column" className="text-sm cursor-pointer">
                      Add source file column
                    </Label>
                  </div>
                  {includeSourceColumn && (
                    <div className="flex items-center gap-2">
                      <Label htmlFor="source-name" className="text-xs">
                        Column name:
                      </Label>
                      <Input
                        id="source-name"
                        value={sourceColumnName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSourceColumnName(e.target.value)}
                        className="w-40 h-8"
                      />
                    </div>
                  )}
                </div>

                {/* Column Preview */}
                {allHeaders.length > 0 && alignmentStrategy === "union" && (
                  <div className="p-4 border rounded-md">
                    <Label className="text-sm mb-2 block">
                      Result will contain {allHeaders.length} columns:
                    </Label>
                    <div className="flex flex-wrap gap-1">
                      {allHeaders.map((header) => (
                        <span
                          key={header}
                          className="px-2 py-1 bg-muted rounded text-xs font-mono"
                        >
                          {header}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <Separator />

            {/* Merge Button */}
            <section>
              <Button
                onClick={mergeFiles}
                disabled={isProcessing || files.length < 1}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Merging..."
                ) : (
                  <>
                    <Combine className="w-4 h-4" />
                    Merge {files.length} File(s)
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
        {files.length === 0 && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Combine className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How CSV File Merger Works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Add multiple CSV files by drag-drop or file selection</li>
                  <li>Files are stacked vertically (rows appended)</li>
                  <li>Union strategy: keeps all columns, fills missing with empty</li>
                  <li>Intersection strategy: only keeps columns present in all files</li>
                  <li>First File strategy: uses only the first file's column structure</li>
                  <li>Optional source column tracks which file each row came from</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
