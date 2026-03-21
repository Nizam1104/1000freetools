"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { copyToClipboard } from "./csv-utils";

export default function CsvDelimiterConverter() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [fromDelimiter, setFromDelimiter] = useState<string>(",");
  const [toDelimiter, setToDelimiter] = useState<string>(";");
  const [customFromDelimiter, setCustomFromDelimiter] = useState<string>("");
  const [customToDelimiter, setCustomToDelimiter] = useState<string>("");
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

  const getEffectiveFromDelimiter = useCallback(() => {
    if (fromDelimiter === "custom") {
      return customFromDelimiter || ",";
    }
    if (fromDelimiter === "\\t") return "\t";
    return fromDelimiter;
  }, [fromDelimiter, customFromDelimiter]);

  const getEffectiveToDelimiter = useCallback(() => {
    if (toDelimiter === "custom") {
      return customToDelimiter || ",";
    }
    if (toDelimiter === "\\t") return "\t";
    return toDelimiter;
  }, [toDelimiter, customToDelimiter]);

  const convertDelimiter = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const fromDelim = getEffectiveFromDelimiter();
      const toDelim = getEffectiveToDelimiter();

      // Parse CSV with source delimiter
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
              current += char;
            }
          } else if (char === fromDelim && !inQuotes) {
            cells.push(current);
            current = "";
          } else {
            current += char;
          }
        }
        cells.push(current);
        rows.push(cells);
      }

      // Convert to new delimiter
      const convertedRows = rows.map((row) => {
        return row.map((cell) => {
          // Quote cells that contain the new delimiter, quotes, or newlines
          if (
            cell.includes(toDelim) ||
            cell.includes('"') ||
            cell.includes("\n") ||
            cell.includes("\r")
          ) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        }).join(toDelim);
      });

      const result = convertedRows.join("\n");
      setOutput(result);
      toast.success("Delimiter converted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, getEffectiveFromDelimiter, getEffectiveToDelimiter]);

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
  }, []);

  const getDelimiterLabel = (delim: string) => {
    switch (delim) {
      case ",": return "Comma (,)";
      case ";": return "Semicolon (;)";
      case "|": return "Pipe (|)";
      case "\\t": return "Tab";
      case "custom": return "Custom";
      default: return delim;
    }
  };

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
            placeholder="Paste CSV data here..."
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Delimiter Conversion</Label>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full space-y-2">
              <Label htmlFor="fromDelimiter" className="text-sm">From Delimiter</Label>
              <Select value={fromDelimiter} onValueChange={setFromDelimiter}>
                <SelectTrigger id="fromDelimiter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {fromDelimiter === "custom" && (
                <Input
                  value={customFromDelimiter}
                  onChange={(e) => setCustomFromDelimiter(e.target.value)}
                  placeholder="Enter custom delimiter"
                  className="max-w-xs"
                />
              )}
            </div>

            <ArrowRight className="w-6 h-6 text-muted-foreground shrink-0" />

            <div className="flex-1 w-full space-y-2">
              <Label htmlFor="toDelimiter" className="text-sm">To Delimiter</Label>
              <Select value={toDelimiter} onValueChange={setToDelimiter}>
                <SelectTrigger id="toDelimiter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {toDelimiter === "custom" && (
                <Input
                  value={customToDelimiter}
                  onChange={(e) => setCustomToDelimiter(e.target.value)}
                  placeholder="Enter custom delimiter"
                  className="max-w-xs"
                />
              )}
            </div>
          </div>

          <div className="mt-4 p-3 border rounded-md bg-muted/30">
            <p className="text-sm text-center">
              Converting from <span className="font-medium">{getDelimiterLabel(getEffectiveFromDelimiter())}</span> to{" "}
              <span className="font-medium">{getDelimiterLabel(getEffectiveToDelimiter())}</span>
            </p>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertDelimiter}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Convert Delimiter"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Converted Output</Label>
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
      </div>
    </div>
  );
}
