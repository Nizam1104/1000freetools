"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileText } from "lucide-react";
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

export default function TextToCsv() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [headers, setHeaders] = useState<string>("");
  const [parseMode, setParseMode] = useState<"lines" | "regex" | "fixed">("lines");
  const [regexPattern, setRegexPattern] = useState<string>("");
  const [fixedWidths, setFixedWidths] = useState<string>("");
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
    if (file) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a text file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const parseByLines = useCallback((text: string, headerList: string[]): CSVRow[] => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const data: CSVRow[] = [];

    lines.forEach((line) => {
      const values = line.split(/\s+/).map((v) => v.trim());
      const row: CSVRow = {};
      headerList.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      data.push(row);
    });

    return data;
  }, []);

  const parseByRegex = useCallback((text: string, headerList: string[], pattern: string): CSVRow[] => {
    const data: CSVRow[] = [];
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    try {
      const regex = new RegExp(pattern, "g");

      lines.forEach((line) => {
        const match = regex.exec(line);
        if (match) {
          const row: CSVRow = {};
          headerList.forEach((header, index) => {
            row[header] = match[index + 1] || "";
          });
          data.push(row);
        }
      });
    } catch (error) {
      throw new Error("Invalid regular expression");
    }

    return data;
  }, []);

  const parseByFixedWidth = useCallback((text: string, headerList: string[], widths: string): CSVRow[] => {
    const data: CSVRow[] = [];
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const widthArray = widths.split(",").map((w) => parseInt(w.trim(), 10));

    lines.forEach((line) => {
      const row: CSVRow = {};
      let position = 0;

      widthArray.forEach((width, index) => {
        const header = headerList[index] || `Column ${index + 1}`;
        row[header] = line.substring(position, position + width).trim();
        position += width;
      });

      data.push(row);
    });

    return data;
  }, []);

  const convertToCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload text data");
      return;
    }

    setIsProcessing(true);

    try {
      // Parse headers
      let headerList: string[];
      if (headers.trim()) {
        headerList = headers.split(",").map((h) => h.trim());
      } else {
        // Auto-generate headers based on first line
        const firstLine = inputText.split("\n")[0];
        if (parseMode === "lines") {
          const parts = firstLine.split(/\s+/).filter((p) => p.trim() !== "");
          headerList = parts.map((_, i) => `Column ${i + 1}`);
        } else if (parseMode === "regex" && regexPattern) {
          const match = new RegExp(regexPattern).exec(firstLine);
          if (match) {
            headerList = Array.from({ length: match.length - 1 }, (_, i) => `Column ${i + 1}`);
          } else {
            headerList = ["Column 1"];
          }
        } else if (parseMode === "fixed" && fixedWidths) {
          headerList = fixedWidths.split(",").map((_, i) => `Column ${i + 1}`);
        } else {
          headerList = ["Column 1"];
        }
      }

      let data: CSVRow[];

      switch (parseMode) {
        case "lines":
          data = parseByLines(inputText, headerList);
          break;
        case "regex":
          if (!regexPattern) {
            throw new Error("Please enter a regex pattern");
          }
          data = parseByRegex(inputText, headerList, regexPattern);
          break;
        case "fixed":
          if (!fixedWidths) {
            throw new Error("Please enter column widths");
          }
          data = parseByFixedWidth(inputText, headerList, fixedWidths);
          break;
        default:
          data = [];
      }

      if (data.length === 0) {
        throw new Error("No data could be parsed from the input");
      }

      // Generate CSV
      let csv = "";
      if (headerList.length > 0) {
        csv += headerList.map((h) => {
          if (h.includes(delimiter) || h.includes('"') || h.includes("\n")) {
            return `"${h.replace(/"/g, '""')}"`;
          }
          return h;
        }).join(delimiter) + "\n";
      }

      data.forEach((row) => {
        const values = headerList.map((header) => {
          const value = String(row[header] ?? "");
          if (value.includes(delimiter) || value.includes('"') || value.includes("\n")) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csv += values.join(delimiter) + "\n";
      });

      setOutput(csv.trim());
      toast.success("Successfully converted text to CSV");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, headers, delimiter, parseMode, regexPattern, fixedWidths, parseByLines, parseByRegex, parseByFixedWidth]);

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
    setHeaders("");
    setDelimiter(",");
    setParseMode("lines");
    setRegexPattern("");
    setFixedWidths("");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Text to CSV Converter</h1>
        <p className="text-muted-foreground">
          Parse unstructured text data and convert to CSV format
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">Text Input</Label>
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
              <FileText className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a text file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste text data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.log,.dat"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text data here...&#10;John 30 New York&#10;Jane 25 Los Angeles&#10;Bob 35 Chicago"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Parse Options</Label>
          <div className="space-y-4">
            {/* Parse Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setParseMode("lines")}
                className={`p-3 border rounded-md text-left transition-colors ${
                  parseMode === "lines" ? "border-primary bg-accent/50" : "hover:bg-accent/30"
                }`}
              >
                <Label className="text-sm font-medium cursor-pointer">By Lines</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Split by whitespace on each line
                </p>
              </button>

              <button
                onClick={() => setParseMode("regex")}
                className={`p-3 border rounded-md text-left transition-colors ${
                  parseMode === "regex" ? "border-primary bg-accent/50" : "hover:bg-accent/30"
                }`}
              >
                <Label className="text-sm font-medium cursor-pointer">By Regex</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Use capture groups to extract data
                </p>
              </button>

              <button
                onClick={() => setParseMode("fixed")}
                className={`p-3 border rounded-md text-left transition-colors ${
                  parseMode === "fixed" ? "border-primary bg-accent/50" : "hover:bg-accent/30"
                }`}
              >
                <Label className="text-sm font-medium cursor-pointer">Fixed Width</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Parse columns by character width
                </p>
              </button>
            </div>

            {/* Headers Input */}
            <div className="p-4 border rounded-md">
              <Label htmlFor="headers" className="text-sm font-medium">
                Column Headers (optional)
              </Label>
              <Input
                id="headers"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                className="mt-1"
                placeholder="name,age,city"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Comma-separated column names. Leave empty to auto-generate.
              </p>
            </div>

            {/* Mode-specific options */}
            {parseMode === "regex" && (
              <div className="p-4 border rounded-md">
                <Label htmlFor="regex" className="text-sm font-medium">
                  Regular Expression Pattern
                </Label>
                <Input
                  id="regex"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  className="mt-1 font-mono text-sm"
                  placeholder="(\w+)\s+(\d+)\s+(\w+)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use capture groups (parentheses) to extract columns
                </p>
              </div>
            )}

            {parseMode === "fixed" && (
              <div className="p-4 border rounded-md">
                <Label htmlFor="fixedWidths" className="text-sm font-medium">
                  Column Widths
                </Label>
                <Input
                  id="fixedWidths"
                  value={fixedWidths}
                  onChange={(e) => setFixedWidths(e.target.value)}
                  className="mt-1 font-mono text-sm"
                  placeholder="10,5,20"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Comma-separated character widths for each column
                </p>
              </div>
            )}

            {/* Delimiter */}
            <div className="p-4 border rounded-md max-w-md">
              <Label htmlFor="delimiter" className="text-sm font-medium">
                Output Delimiter
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
                Character used to separate columns in output
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
            {isProcessing ? "Converting..." : "Convert to CSV"}
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
