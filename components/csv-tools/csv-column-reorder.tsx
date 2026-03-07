"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, GripVertical, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

interface ColumnOrder {
  name: string;
  originalIndex: number;
}

export default function CsvColumnReorder() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<ColumnOrder[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [useIndexInput, setUseIndexInput] = useState<boolean>(false);
  const [indexOrderInput, setIndexOrderInput] = useState<string>("");
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
        setColumnOrder(parsedHeaders.map((name, index) => ({ name, originalIndex: index })));
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
        setColumnOrder(parsedHeaders.map((name, index) => ({ name, originalIndex: index })));
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOverItem = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setColumnOrder((prev) => {
      const updated = [...prev];
      const draggedItem = updated[draggedIndex];
      updated.splice(draggedIndex, 1);
      updated.splice(index, 0, draggedItem);
      return updated;
    });
    setDraggedIndex(index);
  }, [draggedIndex]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const moveColumn = useCallback((index: number, direction: "up" | "down") => {
    setColumnOrder((prev) => {
      const updated = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= updated.length) return prev;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }, []);

  const handleIndexOrderSubmit = useCallback(() => {
    const indices = indexOrderInput.split(",").map((i) => parseInt(i.trim(), 10)).filter((n) => !isNaN(n));
    const validIndices = indices.filter((i) => i >= 0 && i < headers.length);
    
    if (validIndices.length !== headers.length) {
      toast.error(`Please enter all ${headers.length} column indices (0 to ${headers.length - 1})`);
      return;
    }

    const newOrder = validIndices.map((i) => ({ name: headers[i], originalIndex: i }));
    setColumnOrder(newOrder);
    setIndexOrderInput("");
    setUseIndexInput(false);
    toast.success("Column order updated");
  }, [indexOrderInput, headers]);

  const resetToOriginalOrder = useCallback(() => {
    setColumnOrder(headers.map((name, index) => ({ name, originalIndex: index })));
    toast.success("Reset to original order");
  }, [headers]);

  const reorderColumns = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (columnOrder.length === 0) {
      toast.error("No columns to reorder");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const newHeaders = columnOrder.map((col) => col.name);
      const reorderedData: CSVRow[] = data.map((row) => {
        const newRow: CSVRow = {};
        columnOrder.forEach((col) => {
          newRow[col.name] = row[col.name] || "";
        });
        return newRow;
      });

      const csvOutput = [newHeaders.join(","), ...reorderedData.map((row) => newHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Reordered ${columnOrder.length} columns`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reordering failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, columnOrder]);

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
      exportCSVData(data, "reordered.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setColumnOrder([]);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Column Reorder</h1>
        <p className="text-muted-foreground">
          Drag-and-drop interface to reorder CSV columns, or use manual index input
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
                setColumnOrder(parsedHeaders.map((name, index) => ({ name, originalIndex: index })));
              }
            }}
            placeholder="Paste CSV data here...&#10;name,age,email,city&#10;John,30,john@example.com,New York&#10;Jane,25,jane@example.com,Los Angeles"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Column Reorder Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Reorder Columns</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={resetToOriginalOrder}>
                    Reset Order
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Button
                  variant={useIndexInput ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseIndexInput(!useIndexInput)}
                >
                  {useIndexInput ? "Hide Index Input" : "Use Index Input"}
                </Button>
              </div>

              {useIndexInput ? (
                <div className="p-3 border rounded-md space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Enter column indices in desired order (e.g., "2,0,3,1" to reorder columns)
                  </p>
                  <div className="flex items-center gap-2">
                    <Input
                      value={indexOrderInput}
                      onChange={(e) => setIndexOrderInput(e.target.value)}
                      placeholder={`Enter ${headers.length} indices (0-${headers.length - 1})`}
                      className="flex-1"
                    />
                    <Button onClick={handleIndexOrderSubmit} size="sm">
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Current order: {headers.map((h, i) => `${i}:${h}`).join(", ")}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {columnOrder.map((col, index) => (
                    <div
                      key={col.name}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOverItem(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-2 p-3 border rounded-md cursor-grab active:cursor-grabbing transition-colors ${
                        draggedIndex === index ? "bg-muted border-primary" : "bg-background hover:bg-muted/50"
                      }`}
                    >
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                      <span className="font-mono flex-1">{col.name}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveColumn(index, "up")}
                          disabled={index === 0}
                          className="h-8 w-8"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => moveColumn(index, "down")}
                          disabled={index === columnOrder.length - 1}
                          className="h-8 w-8"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground">
                  New column order: <span className="font-medium">{columnOrder.map((c) => c.name).join(" > ")}</span>
                </p>
              </div>
            </section>

            <Separator />

            {/* Reorder Button */}
            <section>
              <Button
                onClick={reorderColumns}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Reordering..." : "Reorder Columns"}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Reordered Output</Label>
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
                <p className="font-medium mb-1">How to use CSV Column Reorder:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Drag and drop columns to reorder them</li>
                  <li>Use arrow buttons for precise reordering</li>
                  <li>Or use index input for manual ordering</li>
                  <li>Click "Reorder Columns" to generate output</li>
                  <li>Copy or download the reordered CSV</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
