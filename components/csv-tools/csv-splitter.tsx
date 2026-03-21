"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Scissors, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

type SplitMode = "row-count" | "file-size" | "column-value";

interface SplitFile {
  name: string;
  content: string;
  rowCount: number;
}

export default function CsvSplitter() {
  const [inputText, setInputText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [splitMode, setSplitMode] = useState<SplitMode>("row-count");
  const [rowCount, setRowCount] = useState<number>(100);
  const [fileSize, setFileSize] = useState<number>(1);
  const [sizeUnit, setSizeUnit] = useState<"KB" | "MB">("KB");
  const [splitColumn, setSplitColumn] = useState<string>("");
  const [includeHeaders, setIncludeHeaders] = useState<boolean>(true);
  const [splitFiles, setSplitFiles] = useState<SplitFile[]>([]);
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
        if (parsedHeaders.length > 0 && !splitColumn) {
          setSplitColumn(parsedHeaders[0]);
        }
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    [splitColumn]
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        setInputText(text);
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        if (parsedHeaders.length > 0) {
          setSplitColumn(parsedHeaders[0]);
        }
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const splitCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);
      const files: SplitFile[] = [];

      if (splitMode === "row-count") {
        const totalFiles = Math.ceil(data.length / rowCount);
        
        for (let i = 0; i < totalFiles; i++) {
          const start = i * rowCount;
          const end = Math.min(start + rowCount, data.length);
          const chunk = data.slice(start, end);
          
          const content = includeHeaders
            ? [headers.join(","), ...chunk.map((row) => headers.map((h) => {
                const val = String(row[h] || "");
                if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                  return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              }).join(","))].join("\n")
            : chunk.map((row) => headers.map((h) => {
                const val = String(row[h] || "");
                if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                  return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              }).join(",")).join("\n");

          files.push({
            name: `part_${i + 1}.csv`,
            content,
            rowCount: chunk.length,
          });
        }
      } else if (splitMode === "file-size") {
        const maxSizeBytes = fileSize * (sizeUnit === "KB" ? 1024 : 1024 * 1024);
        let currentChunk: CSVRow[] = [];
        let currentSize = 0;
        let fileIndex = 1;

        const getRowSize = (row: CSVRow): number => {
          return headers.map((h) => String(row[h] || "")).join(",").length + 1;
        };

        data.forEach((row) => {
          const rowSize = getRowSize(row);
          
          if (currentSize + rowSize > maxSizeBytes && currentChunk.length > 0) {
            const content = includeHeaders
              ? [headers.join(","), ...currentChunk.map((r) => headers.map((h) => {
                  const val = String(r[h] || "");
                  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                    return `"${val.replace(/"/g, '""')}"`;
                  }
                  return val;
                }).join(","))].join("\n")
              : currentChunk.map((r) => headers.map((h) => {
                  const val = String(r[h] || "");
                  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                    return `"${val.replace(/"/g, '""')}"`;
                  }
                  return val;
                }).join(",")).join("\n");

            files.push({
              name: `part_${fileIndex}.csv`,
              content,
              rowCount: currentChunk.length,
            });
            
            currentChunk = [];
            currentSize = 0;
            fileIndex++;
          }
          
          currentChunk.push(row);
          currentSize += rowSize;
        });

        if (currentChunk.length > 0) {
          const content = includeHeaders
            ? [headers.join(","), ...currentChunk.map((row) => headers.map((h) => {
                const val = String(row[h] || "");
                if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                  return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              }).join(","))].join("\n")
            : currentChunk.map((row) => headers.map((h) => {
                const val = String(row[h] || "");
                if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                  return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              }).join(",")).join("\n");

          files.push({
            name: `part_${fileIndex}.csv`,
            content,
            rowCount: currentChunk.length,
          });
        }
      } else if (splitMode === "column-value") {
        if (!splitColumn) {
          toast.error("Please select a column to split by");
          setIsProcessing(false);
          return;
        }

        const groups: Map<string, CSVRow[]> = new Map();
        
        data.forEach((row) => {
          const key = String(row[splitColumn] || "empty");
          if (!groups.has(key)) {
            groups.set(key, []);
          }
          groups.get(key)!.push(row);
        });

        groups.forEach((rows, value) => {
          const safeValue = value.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 50);
          const content = includeHeaders
            ? [headers.join(","), ...rows.map((row) => headers.map((h) => {
                const val = String(row[h] || "");
                if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                  return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              }).join(","))].join("\n")
            : rows.map((row) => headers.map((h) => {
                const val = String(row[h] || "");
                if (val.includes(",") || val.includes('"') || val.includes("\n")) {
                  return `"${val.replace(/"/g, '""')}"`;
                }
                return val;
              }).join(",")).join("\n");

          files.push({
            name: `${safeValue || "empty"}.csv`,
            content,
            rowCount: rows.length,
          });
        });
      }

      setSplitFiles(files);
      toast.success(`Split into ${files.length} file(s)`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Split failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, splitMode, rowCount, fileSize, sizeUnit, splitColumn, includeHeaders, headers]);

  const copyToClipboardHandler = useCallback(async (content: string) => {
    try {
      await copyToClipboard(content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  }, []);

  const downloadFile = useCallback((file: SplitFile) => {
    try {
      const blob = new Blob([file.content], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Downloaded ${file.name}`);
    } catch (error) {
      toast.error("Failed to download");
    }
  }, []);

  const downloadAll = useCallback(() => {
    splitFiles.forEach((file, index) => {
      setTimeout(() => downloadFile(file), index * 100);
    });
    toast.success(`Downloading ${splitFiles.length} files...`);
  }, [splitFiles, downloadFile]);

  const clearAll = useCallback(() => {
    setInputText("");
    setSplitFiles([]);
    setHeaders([]);
  }, []);

  const getPreview = useCallback(() => {
    if (!inputText) return null;

    try {
      const { data } = parseCSVIntelligently(inputText);
      let estimatedFiles = 0;

      if (splitMode === "row-count") {
        estimatedFiles = Math.ceil(data.length / rowCount);
      } else if (splitMode === "file-size") {
        const totalSize = inputText.length;
        const maxSizeBytes = fileSize * (sizeUnit === "KB" ? 1024 : 1024 * 1024);
        estimatedFiles = Math.ceil(totalSize / maxSizeBytes);
      }

      return {
        totalRows: data.length,
        estimatedFiles,
      };
    } catch {
      return null;
    }
  }, [inputText, splitMode, rowCount, fileSize, sizeUnit]);

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
              if (parsedHeaders.length > 0 && !splitColumn) {
                setSplitColumn(parsedHeaders[0]);
              }
            }}
            placeholder="Paste CSV data here..."
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Split Configuration Section */}
            <section>
              <Label className="text-base mb-3 block">Split Configuration</Label>

              <div className="space-y-4">
                {/* Split Mode */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">Split Mode</Label>
                  <Select value={splitMode} onValueChange={(v) => setSplitMode(v as SplitMode)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row-count">By Row Count</SelectItem>
                      <SelectItem value="file-size">By File Size</SelectItem>
                      <SelectItem value="column-value">By Column Value Groups</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mode-specific options */}
                {splitMode === "row-count" && (
                  <div className="p-4 border rounded-md">
                    <Label htmlFor="row-count" className="text-sm mb-2 block">
                      Rows per File
                    </Label>
                    <Input
                      id="row-count"
                      type="number"
                      value={rowCount}
                      onChange={(e) => setRowCount(parseInt(e.target.value) || 100)}
                      min={1}
                      className="w-32"
                    />
                    {preview && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Will create approximately {preview.estimatedFiles} file(s)
                      </p>
                    )}
                  </div>
                )}

                {splitMode === "file-size" && (
                  <div className="p-4 border rounded-md">
                    <Label className="text-sm mb-2 block">Max File Size</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={fileSize}
                        onChange={(e) => setFileSize(parseFloat(e.target.value) || 1)}
                        min={0.1}
                        step={0.1}
                        className="w-32"
                      />
                      <Select value={sizeUnit} onValueChange={(v) => setSizeUnit(v as "KB" | "MB")}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="KB">KB</SelectItem>
                          <SelectItem value="MB">MB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {splitMode === "column-value" && (
                  <div className="p-4 border rounded-md">
                    <Label htmlFor="split-column" className="text-sm mb-2 block">
                      Group By Column
                    </Label>
                    <Select value={splitColumn} onValueChange={setSplitColumn}>
                      <SelectTrigger id="split-column">
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
                    <p className="text-xs text-muted-foreground mt-2">
                      Each unique value will create a separate file
                    </p>
                  </div>
                )}

                {/* Include Headers */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-headers"
                    checked={includeHeaders}
                    onCheckedChange={(checked) => setIncludeHeaders(checked as boolean)}
                  />
                  <Label htmlFor="include-headers" className="text-sm cursor-pointer">
                    Include headers in each split file
                  </Label>
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
                      <p className="text-muted-foreground">Estimated Files</p>
                      <p className="font-medium">{preview.estimatedFiles}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mode</p>
                      <p className="font-medium">
                        {splitMode === "row-count" && `${rowCount} rows/file`}
                        {splitMode === "file-size" && `${fileSize} ${sizeUnit}/file`}
                        {splitMode === "column-value" && `Group by "${splitColumn}"`}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <Separator />

            {/* Split Button */}
            <section>
              <Button
                onClick={splitCsv}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Splitting..."
                ) : (
                  <>
                    <Scissors className="w-4 h-4" />
                    Split CSV
                  </>
                )}
              </Button>
            </section>

            {/* Output Files Section */}
            {splitFiles.length > 0 && (
              <>
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base">Split Files ({splitFiles.length})</Label>
                    <Button variant="outline" size="sm" onClick={downloadAll}>
                      <Download className="w-4 h-4" />
                      Download All
                    </Button>
                  </div>

                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 font-medium">File Name</th>
                          <th className="text-center p-3 font-medium">Rows</th>
                          <th className="text-right p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {splitFiles.map((file, index) => (
                          <tr key={index} className="border-t hover:bg-muted/30">
                            <td className="p-3 font-mono">{file.name}</td>
                            <td className="p-3 text-center">{file.rowCount}</td>
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboardHandler(file.content)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadFile(file)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* First file preview */}
                {splitFiles[0] && (
                  <section>
                    <Label className="text-base mb-3 block">
                      Preview: {splitFiles[0].name}
                    </Label>
                    <Textarea
                      value={splitFiles[0].content}
                      readOnly
                      className="min-h-[150px] font-mono text-sm bg-muted/30"
                    />
                  </section>
                )}
              </>
            )}
          </>
        )}

        {/* Info Section */}
        {!headers.length && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Scissors className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How CSV Splitter Works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>By Row Count: Split into files with N rows each</li>
                  <li>By File Size: Split into files of maximum size</li>
                  <li>By Column Value: Group rows by unique column values</li>
                  <li>Headers can be included in each split file</li>
                  <li>Download individual files or all at once</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
