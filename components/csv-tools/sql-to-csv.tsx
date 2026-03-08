"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { copyToClipboard } from "./csv-utils";

interface CSVRow {
  [key: string]: string | number;
}

export default function SqlToCsv() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [delimiter, setDelimiter] = useState<string>(",");
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
    if (file && (file.name.toLowerCase().endsWith(".sql") || file.name.toLowerCase().endsWith(".txt"))) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a SQL file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const extractSqlValueGroups = useCallback((valuesStr: string): string[][] => {
    const groups: string[][] = [];
    let currentGroup: string[] = [];
    let current = "";
    let inQuotes = false;
    let parenDepth = 0;

    for (let i = 0; i < valuesStr.length; i++) {
      const char = valuesStr[i];

      if (char === "'" && valuesStr[i - 1] !== "\\") {
        inQuotes = !inQuotes;
        current += char;
      } else if (char === "(" && !inQuotes) {
        parenDepth++;
        if (parenDepth === 1) {
          currentGroup = [];
          current = "";
        } else {
          current += char;
        }
      } else if (char === ")" && !inQuotes) {
        parenDepth--;
        if (parenDepth === 0) {
          if (current.trim()) {
            currentGroup.push(current.trim());
          }
          groups.push([...currentGroup]);
          current = "";
        } else {
          current += char;
        }
      } else if (char === "," && !inQuotes && parenDepth === 1) {
        currentGroup.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    return groups;
  }, []);

  const unescapeSqlValue = useCallback((value: string): string => {
    if (value === "NULL") return "";
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.slice(1, -1).replace(/''/g, "'");
    }
    return value;
  }, []);

  const convertToCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload SQL data");
      return;
    }

    setIsProcessing(true);

    try {
      const insertRegex = /INSERT INTO\s+\w+\s*\(([^)]+)\)\s*VALUES\s*([\s\S]+?);/gi;
      const headers: string[] = [];
      const data: CSVRow[] = [];

      let match;
      while ((match = insertRegex.exec(inputText)) !== null) {
        const headerStr = match[1];
        const valuesStr = match[2];

        const currentHeaders = headerStr.split(",").map((h) => h.trim().replace(/`/g, ""));

        if (headers.length === 0) {
          headers.push(...currentHeaders);
        }

        const valueGroups = extractSqlValueGroups(valuesStr);

        valueGroups.forEach((values: string[]) => {
          const row: CSVRow = {};
          currentHeaders.forEach((header, index) => {
            row[header] = values[index] !== undefined ? unescapeSqlValue(values[index]) : "";
          });
          data.push(row);
        });
      }

      if (data.length === 0) {
        throw new Error("No INSERT statements found in SQL");
      }

      // Generate CSV
      let csv = "";
      if (headers.length > 0) {
        csv += headers.map((h) => {
          if (h.includes(delimiter) || h.includes('"') || h.includes("\n")) {
            return `"${h.replace(/"/g, '""')}"`;
          }
          return h;
        }).join(delimiter) + "\n";
      }

      data.forEach((row) => {
        const values = headers.map((header) => {
          const value = String(row[header] ?? "");
          if (value.includes(delimiter) || value.includes('"') || value.includes("\n")) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csv += values.join(delimiter) + "\n";
      });

      setOutput(csv.trim());
      toast.success("Successfully extracted CSV from SQL");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, delimiter, extractSqlValueGroups, unescapeSqlValue]);

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
    a.download = "converted.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setDelimiter(",");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">SQL to CSV Converter</h1>
        <p className="text-muted-foreground">
          Extract CSV data from SQL INSERT statements
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">SQL Input</Label>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear
              </Button>
            </div>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-md p-6 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <Database className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a SQL file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste SQL INSERT statements below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".sql,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste SQL INSERT statements here...&#10;INSERT INTO users (name, age, city)&#10;VALUES&#10;('John', 30, 'New York'),&#10;('Jane', 25, 'Los Angeles');"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">CSV Options</Label>
          <div className="max-w-xs">
            <div className="p-3 border rounded-md">
              <Label htmlFor="delimiter" className="text-sm font-medium">
                Delimiter
              </Label>
              <select
                id="delimiter"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-sm"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="|">Pipe (|)</option>
                <option value="\t">Tab</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Character used to separate columns
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToCsv}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Extract CSV"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">CSV Output</Label>
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

            <div className="border rounded-md bg-muted/30 p-4 overflow-auto max-h-[500px]">
              <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                {output}
              </pre>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
