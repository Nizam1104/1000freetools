"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { copyToClipboard, parseCSVIntelligently } from "./csv-utils";

export default function CsvToHtml() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [className, setClassName] = useState<string>("csv-table");
  const [striped, setStriped] = useState<boolean>(true);
  const [bordered, setBordered] = useState<boolean>(true);
  const [responsive, setResponsive] = useState<boolean>(true);
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

  const escapeHtml = useCallback((value: string): string => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }, []);

  const convertToHtml = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      const classes = [className];
      if (striped) classes.push("table-striped");
      if (bordered) classes.push("table-bordered");
      if (responsive) classes.push("table-responsive");

      let html = `<table class="${classes.join(" ")}">\n`;

      // Header
      html += `  <thead>\n    <tr>\n`;
      headers.forEach((header) => {
        html += `      <th>${escapeHtml(header)}</th>\n`;
      });
      html += `    </tr>\n  </thead>\n`;

      // Body
      html += `  <tbody>\n`;
      data.forEach((row) => {
        html += `    <tr>\n`;
        headers.forEach((header) => {
          html += `      <td>${escapeHtml(String(row[header] || ""))}</td>\n`;
        });
        html += `    </tr>\n`;
      });
      html += `  </tbody>\n`;

      html += `</table>`;

      setOutput(html);
      toast.success("Successfully converted CSV to HTML table");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, className, striped, bordered, responsive, escapeHtml]);

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
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded HTML file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setClassName("csv-table");
    setStriped(true);
    setBordered(true);
    setResponsive(true);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV to HTML Table Converter</h1>
        <p className="text-muted-foreground">
          Convert CSV data to HTML table format with styling options
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">CSV Input</Label>
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
          <Label className="text-base mb-3 block">Table Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-md">
              <Label htmlFor="className" className="text-sm font-medium">
                CSS Class Name
              </Label>
              <Input
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="mt-1"
                placeholder="csv-table"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Main CSS class for the table
              </p>
            </div>

            <div className="flex flex-col gap-3 p-3 border rounded-md">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="striped"
                  checked={striped}
                  onCheckedChange={(checked) => setStriped(checked as boolean)}
                />
                <Label htmlFor="striped" className="text-sm font-medium cursor-pointer">
                  Striped Rows
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="bordered"
                  checked={bordered}
                  onCheckedChange={(checked) => setBordered(checked as boolean)}
                />
                <Label htmlFor="bordered" className="text-sm font-medium cursor-pointer">
                  Bordered
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="responsive"
                  checked={responsive}
                  onCheckedChange={(checked) => setResponsive(checked as boolean)}
                />
                <Label htmlFor="responsive" className="text-sm font-medium cursor-pointer">
                  Responsive
                </Label>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToHtml}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Convert to HTML"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">HTML Output</Label>
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
