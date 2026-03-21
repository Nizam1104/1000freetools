"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { minifyCsv, copyToClipboard } from "./csv-utils";

export default function CsvMinifier() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [removeBom, setRemoveBom] = useState<boolean>(true);
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

  const minifyCsvData = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const minified = minifyCsv(inputText, { removeBom });
      setOutput(minified);
      
      const originalSize = new Blob([inputText]).size;
      const minifiedSize = new Blob([minified]).size;
      const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      
      toast.success(`CSV minified! Size reduced by ${reduction}%`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Minification failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, removeBom]);

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
    a.download = "minified.csv";
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
    
    const originalSize = new Blob([inputText]).size;
    const minifiedSize = new Blob([output]).size;
    const originalLines = inputText.split("\n").length;
    const minifiedLines = output.split("\n").length;
    
    return {
      originalSize,
      minifiedSize,
      reduction: ((originalSize - minifiedSize) / originalSize * 100).toFixed(1),
      originalLines,
      minifiedLines,
      removedLines: originalLines - minifiedLines,
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
            placeholder="Paste CSV data here..."
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Minification Options</Label>
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
                Strip Byte Order Mark from the beginning of the file
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Minify Button */}
        <section>
          <Button
            onClick={minifyCsvData}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Minifying..." : "Minify CSV"}
          </Button>
        </section>

        {/* Stats Section */}
        {stats && (
          <section>
            <Label className="text-base mb-3 block">Minification Results</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.originalSize}</p>
                <p className="text-xs text-muted-foreground">Original Size (bytes)</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.minifiedSize}</p>
                <p className="text-xs text-muted-foreground">Minified Size (bytes)</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.reduction}%</p>
                <p className="text-xs text-muted-foreground">Size Reduction</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-2xl font-semibold">{stats.removedLines}</p>
                <p className="text-xs text-muted-foreground">Blank Lines Removed</p>
              </div>
            </div>
          </section>
        )}

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Minified Output</Label>
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
