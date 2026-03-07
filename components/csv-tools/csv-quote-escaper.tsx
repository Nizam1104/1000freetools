"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { copyToClipboard } from "./csv-utils";

export default function CsvQuoteEscaper() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [quoteAll, setQuoteAll] = useState<boolean>(false);
  const [quoteNumeric, setQuoteNumeric] = useState<boolean>(false);
  const [escapeMode, setEscapeMode] = useState<"rfc4180" | "all">("rfc4180");
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

  const needsQuoting = useCallback((value: string): boolean => {
    if (quoteAll) return true;
    if (quoteNumeric && !isNaN(Number(value)) && value.trim() !== "") return true;
    
    // RFC 4180: quote if contains comma, double quote, or newline
    return value.includes(",") || value.includes('"') || value.includes("\n") || value.includes("\r");
  }, [quoteAll, quoteNumeric]);

  const escapeQuotes = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const rows: string[][] = [];
      const lines = inputText.split(/\r?\n/);

      for (const line of lines) {
        if (line.trim() === "") {
          rows.push([]);
          continue;
        }

        const cells: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === "," && !inQuotes) {
            cells.push(current);
            current = "";
          } else {
            current += char;
          }
        }
        cells.push(current);
        rows.push(cells);
      }

      // Apply quoting rules
      const escapedRows = rows.map((row) => {
        return row.map((cell) => {
          const trimmedCell = cell.trim();
          
          if (needsQuoting(trimmedCell) || escapeMode === "all") {
            // Escape internal quotes by doubling them
            const escaped = trimmedCell.replace(/"/g, '""');
            return `"${escaped}"`;
          }
          
          return trimmedCell;
        }).join(",");
      });

      const result = escapedRows.join("\n");
      setOutput(result);
      toast.success("Quotes applied successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Processing failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, needsQuoting, escapeMode]);

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
    a.download = "quoted.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Quote Escaper</h1>
        <p className="text-muted-foreground">
          Apply and normalize quoting to CSV fields according to RFC 4180 standard
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
            placeholder="Paste CSV data here..."
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Quoting Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="quoteAll"
                checked={quoteAll}
                onCheckedChange={(checked) => setQuoteAll(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="quoteAll" className="text-sm font-medium cursor-pointer">
                  Quote All Fields
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Wrap every field in double quotes
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="quoteNumeric"
                checked={quoteNumeric}
                onCheckedChange={(checked) => setQuoteNumeric(checked as boolean)}
                disabled={quoteAll}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="quoteNumeric" className="text-sm font-medium cursor-pointer">
                  Quote Numeric Fields
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Also quote fields containing only numbers
                </p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm">Quoting Mode</Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="escapeMode"
                    value="rfc4180"
                    checked={escapeMode === "rfc4180"}
                    onChange={() => setEscapeMode("rfc4180")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">RFC 4180 (quote only when necessary)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="escapeMode"
                    value="all"
                    checked={escapeMode === "all"}
                    onChange={() => setEscapeMode("all")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Quote All (force quoting)</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Process Button */}
        <section>
          <Button
            onClick={escapeQuotes}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Processing..." : "Apply Quoting"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Quoted Output</Label>
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
            <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">RFC 4180 Quoting Rules:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Fields containing commas must be quoted</li>
                <li>Fields containing double quotes must be quoted</li>
                <li>Fields containing line breaks must be quoted</li>
                <li>Double quotes within a field are escaped by doubling them</li>
                <li>Example: <code className="bg-muted px-1 rounded">He said "Hello"</code> becomes <code className="bg-muted px-1 rounded">"He said ""Hello"""</code></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
