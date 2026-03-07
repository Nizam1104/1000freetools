"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cleanCsv, copyToClipboard } from "./csv-utils";

export default function CsvCleaner() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [changes, setChanges] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [trimWhitespace, setTrimWhitespace] = useState<boolean>(true);
  const [removeBlankRows, setRemoveBlankRows] = useState<boolean>(true);
  const [removeBom, setRemoveBom] = useState<boolean>(true);
  const [normalizeLineEndings, setNormalizeLineEndings] = useState<boolean>(true);
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

  const cleanCsvData = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const result = cleanCsv(inputText, {
        trimWhitespace,
        removeBlankRows,
        removeBom,
        normalizeLineEndings,
      });
      
      setOutput(result.cleaned);
      setChanges(result.changes);
      toast.success(`CSV cleaned! ${result.changes.length} change(s) made`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Cleaning failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, trimWhitespace, removeBlankRows, removeBom, normalizeLineEndings]);

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
    a.download = "cleaned.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setChanges([]);
  }, []);

  const calculateStats = useCallback(() => {
    if (!inputText || !output) return null;
    
    const originalSize = new Blob([inputText]).size;
    const cleanedSize = new Blob([output]).size;
    const originalLines = inputText.split(/\r?\n/).length;
    const cleanedLines = output.split(/\r?\n/).length;
    const sizeChange = ((cleanedSize - originalSize) / originalSize * 100).toFixed(1);
    
    return {
      originalSize,
      cleanedSize,
      sizeChange: parseFloat(sizeChange),
      originalLines,
      cleanedLines,
      linesRemoved: originalLines - cleanedLines,
    };
  }, [inputText, output]);

  const stats = calculateStats();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Cleaner</h1>
        <p className="text-muted-foreground">
          Automated CSV cleaning with whitespace trimming, blank row removal, encoding fixes, and change reporting
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
          <Label className="text-base mb-3 block">Cleaning Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 border rounded-md">
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
                  Remove leading/trailing whitespace from all cells
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="removeBlankRows"
                checked={removeBlankRows}
                onCheckedChange={(checked) => setRemoveBlankRows(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="removeBlankRows" className="text-sm font-medium cursor-pointer">
                  Remove Blank Rows
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Delete rows that contain only whitespace
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="removeBom"
                checked={removeBom}
                onCheckedChange={(checked) => setRemoveBom(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="removeBom" className="text-sm font-medium cursor-pointer">
                  Remove BOM
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Strip Byte Order Mark from file beginning
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="normalizeLineEndings"
                checked={normalizeLineEndings}
                onCheckedChange={(checked) => setNormalizeLineEndings(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="normalizeLineEndings" className="text-sm font-medium cursor-pointer">
                  Normalize Line Endings
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Convert all line endings to LF format
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Clean Button */}
        <section>
          <Button
            onClick={cleanCsvData}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              "Cleaning..."
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Clean CSV
              </>
            )}
          </Button>
        </section>

        {/* Stats Section */}
        {stats && (
          <section>
            <Label className="text-base mb-3 block">Cleaning Results</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.originalSize}</p>
                <p className="text-xs text-muted-foreground">Original Size (bytes)</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.cleanedSize}</p>
                <p className="text-xs text-muted-foreground">Cleaned Size (bytes)</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className={`text-2xl font-semibold ${stats.sizeChange < 0 ? 'text-green-600 dark:text-green-400' : stats.sizeChange > 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                  {stats.sizeChange > 0 ? '+' : ''}{stats.sizeChange}%
                </p>
                <p className="text-xs text-muted-foreground">Size Change</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.linesRemoved}</p>
                <p className="text-xs text-muted-foreground">Lines Removed</p>
              </div>
            </div>
          </section>
        )}

        {/* Changes Report */}
        {changes.length > 0 && (
          <section>
            <Label className="text-base mb-3 block">Changes Made</Label>
            <div className="p-4 border rounded-md bg-green-500/10">
              <ul className="space-y-2">
                {changes.map((change, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-200">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Cleaned Output</Label>
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
