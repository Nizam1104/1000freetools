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
import Papa from "papaparse";

export default function TsvToCsv() {
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
    if (file && (file.name.toLowerCase().endsWith(".tsv") || file.name.toLowerCase().endsWith(".txt"))) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a TSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const convertToCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload TSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const result = Papa.parse(inputText, { delimiter: "\t" });
      const rows = result.data as string[][];

      const csv = rows
        .map((row) =>
          row
            .map((cell) => {
              if (cell.includes(",") || cell.includes("\n") || cell.includes("\r")) {
                return `"${cell.replace(/"/g, '""')}"`;
              }
              return cell;
            })
            .join(",")
        )
        .join("\n");

      setOutput(csv);
      toast.success("Successfully converted TSV to CSV");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
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
    a.download = "converted.csv";
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
        <h1 className="text-3xl font-semibold mb-2">TSV to CSV Converter</h1>
        <p className="text-muted-foreground">
          Convert TSV (tab-separated values) to CSV (comma-separated values) format
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">TSV Input</Label>
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
                Drag and drop a TSV file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste TSV data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".tsv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste TSV data here...&#10;name	age	city&#10;John	30	New York&#10;Jane	25	Los Angeles"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
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
