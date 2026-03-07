"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { copyToClipboard } from "./csv-utils";

interface CSVRow {
  [key: string]: string | number;
}

export default function JsonToCsv() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [flattenObjects, setFlattenObjects] = useState<boolean>(true);
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
    if (file && (file.name.toLowerCase().endsWith(".json") || file.name.toLowerCase().endsWith(".txt"))) {
      file.text().then((text) => {
        setInputText(text);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a JSON file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const flattenObject = useCallback((obj: any, prefix = ""): any => {
    const result: any = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          Object.assign(result, flattenObject(value, newKey));
        } else {
          result[newKey] = value === null ? "" : String(value);
        }
      }
    }

    return result;
  }, []);

  const convertToCsv = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload JSON data");
      return;
    }

    setIsProcessing(true);

    try {
      let jsonData: any[];
      try {
        jsonData = JSON.parse(inputText);
        if (!Array.isArray(jsonData)) {
          jsonData = [jsonData];
        }
      } catch (error) {
        throw new Error("Invalid JSON format");
      }

      let headers: string[] = [];
      const data: CSVRow[] = [];

      if (flattenObjects) {
        jsonData.forEach((item) => {
          const flattened = flattenObject(item);
          data.push(flattened as CSVRow);
          Object.keys(flattened).forEach((key) => {
            if (!headers.includes(key)) {
              headers.push(key);
            }
          });
        });
      } else {
        jsonData.forEach((item) => {
          const row: CSVRow = {};
          Object.keys(item).forEach((key) => {
            const value = item[key];
            row[key] = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
          });
          data.push(row);
          Object.keys(row).forEach((key) => {
            if (!headers.includes(key)) {
              headers.push(key);
            }
          });
        });
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
      toast.success("Successfully converted JSON to CSV");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, flattenObjects, delimiter, flattenObject]);

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
    setFlattenObjects(true);
    setDelimiter(",");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">JSON to CSV Converter</h1>
        <p className="text-muted-foreground">
          Convert JSON data to CSV format with object flattening options
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">JSON Input</Label>
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
              <FileJson className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop a JSON file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">or paste JSON data below</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Paste JSON data here...&#10;[&#10;  {"name": "John", "age": 30},&#10;  {"name": "Jane", "age": 25}&#10;]'
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Conversion Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="flattenObjects"
                checked={flattenObjects}
                onCheckedChange={(checked) => setFlattenObjects(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="flattenObjects" className="text-sm font-medium cursor-pointer">
                  Flatten Nested Objects
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Convert nested objects to dot notation (e.g., address.city)
                </p>
              </div>
            </div>

            <div className="p-3 border rounded-md">
              <Label htmlFor="delimiter" className="text-sm font-medium">
                Delimiter
              </Label>
              <Select
                value={delimiter}
                onValueChange={setDelimiter}
              >
                <SelectTrigger id="delimiter" className="w-full mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                </SelectContent>
              </Select>
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
