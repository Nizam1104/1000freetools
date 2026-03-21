"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow } from "./csv-utils";

export default function CsvTranspose() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [includeHeaders, setIncludeHeaders] = useState<boolean>(true);
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

  const transposeCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      if (headers.length === 0) {
        toast.error("No data to transpose");
        setIsProcessing(false);
        return;
      }

      // Create transposed data
      const transposedRows: string[][] = [];

      if (includeHeaders) {
        // First row: Column names + Row numbers
        const firstRow = ["Column", ...headers.map((_, i) => `Row ${i + 1}`)];
        transposedRows.push(firstRow);

        // Each header becomes a row
        headers.forEach((header) => {
          const row = [header, ...data.map((d) => String(d[header] || ""))];
          transposedRows.push(row);
        });
      } else {
        // Just transpose the data without headers
        const maxCols = Math.max(headers.length, ...data.map((d) => Object.keys(d).length));
        
        // First row: Row numbers
        transposedRows.push(["", ...data.map((_, i) => `Row ${i + 1}`)]);
        
        // Each column becomes a row
        for (let colIndex = 0; colIndex < maxCols; colIndex++) {
          const headerName = headers[colIndex] || `Column ${colIndex + 1}`;
          const row = [
            headerName,
            ...data.map((d) => {
              const keys = Object.keys(d);
              return colIndex < keys.length ? String(d[keys[colIndex]] || "") : "";
            })
          ];
          transposedRows.push(row);
        }
      }

      // Convert to CSV string
      const csvOutput = transposedRows.map((row) => {
        return row.map((cell) => {
          if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        }).join(",");
      }).join("\n");

      setOutput(csvOutput);
      toast.success(`Transposed ${headers.length} columns x ${data.length} rows`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Transposition failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, includeHeaders]);

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
    a.download = "transposed.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
  }, []);

  const getPreview = useCallback(() => {
    if (!inputText) return null;
    
    try {
      const { data, headers } = parseCSVIntelligently(inputText);
      return {
        rows: data.length,
        columns: headers.length,
        transposedRows: includeHeaders ? headers.length + 1 : headers.length,
        transposedColumns: includeHeaders ? data.length + 1 : data.length,
      };
    } catch {
      return null;
    }
  }, [inputText, includeHeaders]);

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
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV data here...&#10;name,age,city&#10;John,30,New York&#10;Jane,25,Los Angeles"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Transpose Options</Label>
          <div className="flex items-start space-x-3 p-3 border rounded-md max-w-md">
            <Checkbox
              id="includeHeaders"
              checked={includeHeaders}
              onCheckedChange={(checked) => setIncludeHeaders(checked as boolean)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="includeHeaders" className="text-sm font-medium cursor-pointer">
                Include Headers as First Column
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Add original headers as the first column in transposed output
              </p>
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
                  <p className="text-muted-foreground">Original</p>
                  <p className="font-medium">{preview.rows} rows x {preview.columns} columns</p>
                </div>
                <Repeat className="w-5 h-5 text-muted-foreground self-center" />
                <div>
                  <p className="text-muted-foreground">Transposed</p>
                  <p className="font-medium">{preview.transposedRows} rows x {preview.transposedColumns} columns</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <Separator />

        {/* Transpose Button */}
        <section>
          <Button
            onClick={transposeCsv}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              "Transposing..."
            ) : (
              <>
                <Repeat className="w-4 h-4" />
                Transpose CSV
              </>
            )}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Transposed Output</Label>
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
        <section className="p-4 border rounded-md bg-muted/30">
          <div className="flex items-start gap-3">
            <Repeat className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">How Transpose Works:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Rows become columns and columns become rows</li>
                <li>Original headers become the first column (if enabled)</li>
                <li>Original row data becomes column data</li>
                <li>Useful for pivoting data or changing data orientation</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
