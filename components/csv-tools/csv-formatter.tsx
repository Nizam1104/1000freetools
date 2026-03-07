"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { formatCsv, copyToClipboard } from "./csv-utils";

export default function CsvFormatter() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [lineEnding, setLineEnding] = useState<"CRLF" | "LF">("LF");
  const [trimWhitespace, setTrimWhitespace] = useState<boolean>(true);
  const [encoding, setEncoding] = useState<"UTF-8" | "UTF-8-BOM">("UTF-8");
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

  const formatCsvData = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const formatted = formatCsv(inputText, {
        delimiter,
        lineEnding,
        trimWhitespace,
        encoding,
      });
      setOutput(formatted);
      toast.success("CSV formatted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Formatting failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, delimiter, lineEnding, trimWhitespace, encoding]);

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
    a.download = "formatted.csv";
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
        <h1 className="text-3xl font-semibold mb-2">CSV Formatter</h1>
        <p className="text-muted-foreground">
          Standardize CSV formatting with normalized quoting, delimiters, whitespace, and line endings
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
          <Label className="text-base mb-3 block">Formatting Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delimiter" className="text-sm">Delimiter</Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger id="delimiter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lineEnding" className="text-sm">Line Endings</Label>
              <Select value={lineEnding} onValueChange={(v) => setLineEnding(v as "CRLF" | "LF")}>
                <SelectTrigger id="lineEnding">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LF">LF (Unix/Linux/macOS)</SelectItem>
                  <SelectItem value="CRLF">CRLF (Windows)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encoding" className="text-sm">Encoding</Label>
              <Select value={encoding} onValueChange={(v) => setEncoding(v as "UTF-8" | "UTF-8-BOM")}>
                <SelectTrigger id="encoding">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTF-8">UTF-8</SelectItem>
                  <SelectItem value="UTF-8-BOM">UTF-8 with BOM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-3 p-3 border rounded-md">
              <Checkbox
                id="trimWhitespace"
                checked={trimWhitespace}
                onCheckedChange={(checked) => setTrimWhitespace(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="trimWhitespace" className="text-sm font-medium cursor-pointer">
                  Trim Whitespace
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Remove leading/trailing whitespace from cells
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Format Button */}
        <section>
          <Button
            onClick={formatCsvData}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Formatting..." : "Format CSV"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Formatted Output</Label>
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
