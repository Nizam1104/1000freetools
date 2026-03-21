"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { copyToClipboard } from "./csv-utils";

export default function CsvUnquote() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
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

  const unquoteCsv = useCallback(() => {
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
              // Escaped quote - add single quote
              current += '"';
              i++;
            } else {
              // Toggle quote state, don't add quote to output
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

      // Rebuild CSV without unnecessary quotes
      const unquotedRows = rows.map((row) => {
        return row.map((cell) => {
          const trimmed = cell.trim();
          
          // Only quote if absolutely necessary (contains comma, quote, or newline)
          if (
            trimmed.includes(",") ||
            trimmed.includes('"') ||
            trimmed.includes("\n") ||
            trimmed.includes("\r")
          ) {
            const escaped = trimmed.replace(/"/g, '""');
            return `"${escaped}"`;
          }
          
          return trimmed;
        }).join(",");
      });

      const result = unquotedRows.join("\n");
      setOutput(result);
      toast.success("Quotes removed successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Processing failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText]);

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
    a.download = "unquoted.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
  }, []);

  const calculateStats = useCallback(() => {
    if (!inputText || !output) return null;
    
    const originalQuotes = (inputText.match(/"/g) || []).length;
    const outputQuotes = (output.match(/"/g) || []).length;
    const removedQuotes = originalQuotes - outputQuotes;
    
    return {
      originalQuotes,
      outputQuotes,
      removedQuotes,
    };
  }, [inputText, output]);

  const stats = calculateStats();

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
            placeholder="Paste CSV data here...&#10;&quot;John Doe&quot;,30,&quot;New York&quot;&#10;&quot;Jane Smith&quot;,25,&quot;Los Angeles&quot;"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Process Button */}
        <section>
          <Button
            onClick={unquoteCsv}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Processing..." : "Remove Unnecessary Quotes"}
          </Button>
        </section>

        {/* Stats Section */}
        {stats && (
          <section>
            <Label className="text-base mb-3 block">Quote Statistics</Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.originalQuotes}</p>
                <p className="text-xs text-muted-foreground">Original Quotes</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.outputQuotes}</p>
                <p className="text-xs text-muted-foreground">Remaining Quotes</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.removedQuotes}</p>
                <p className="text-xs text-muted-foreground">Quotes Removed</p>
              </div>
            </div>
          </section>
        )}

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Unquoted Output</Label>
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
            <FileSpreadsheet className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">What this tool does:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Removes quotes from fields that don&apos;t need them</li>
                <li>Preserves quotes around fields containing special characters (commas, quotes, newlines)</li>
                <li>Unescapes doubled quotes (&quot;&quot;) to single quotes</li>
                <li>Maintains RFC 4180 compliance for fields that require quoting</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
