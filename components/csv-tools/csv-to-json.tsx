"use client";

import React, { useState, useCallback, useRef } from "react";
import { Download, Copy, Check, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard } from "./csv-utils";

export default function CsvToJson() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [typeInference, setTypeInference] = useState<boolean>(false);
  const [nestedOutput, setNestedOutput] = useState<boolean>(false);
  const [arrayMode, setArrayMode] = useState<boolean>(false);
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

  const convertToJson = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      let jsonData: any[] = data;

      if (arrayMode) {
        jsonData = data.map((row) => Object.values(row));
      } else if (typeInference) {
        jsonData = data.map((row) => {
          const typedRow: any = {};
          Object.entries(row).forEach(([key, value]) => {
            const strValue = String(value);
            if (strValue === "" || strValue === null || strValue === undefined) {
              typedRow[key] = null;
            } else if (strValue.toLowerCase() === "true") {
              typedRow[key] = true;
            } else if (strValue.toLowerCase() === "false") {
              typedRow[key] = false;
            } else if (strValue.toLowerCase() === "null") {
              typedRow[key] = null;
            } else {
              const num = Number(strValue);
              typedRow[key] = !isNaN(num) ? num : strValue;
            }
          });
          return typedRow;
        });
      }

      if (nestedOutput && !arrayMode) {
        jsonData = jsonData.map((row) => {
          const result: any = {};
          for (const key in row) {
            if (key.includes(".")) {
              const parts = key.split(".");
              let current = result;
              for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!(part in current)) {
                  current[part] = {};
                }
                current = current[part];
              }
              current[parts[parts.length - 1]] = row[key];
            } else {
              result[key] = row[key];
            }
          }
          return result;
        });
      }

      const jsonString = JSON.stringify(jsonData, null, 2);
      setOutput(jsonString);
      toast.success("Successfully converted CSV to JSON");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, typeInference, nestedOutput, arrayMode]);

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
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded JSON file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setTypeInference(false);
    setNestedOutput(false);
    setArrayMode(false);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
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
          <Label className="text-base mb-3 block">Conversion Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="typeInference"
                checked={typeInference}
                onCheckedChange={(checked) => setTypeInference(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="typeInference" className="text-sm font-medium cursor-pointer">
                  Type Inference
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Convert numbers and booleans automatically
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="nestedOutput"
                checked={nestedOutput}
                onCheckedChange={(checked) => setNestedOutput(checked as boolean)}
                disabled={arrayMode}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="nestedOutput" className="text-sm font-medium cursor-pointer">
                  Nested Output
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Create nested objects from dot notation keys
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="arrayMode"
                checked={arrayMode}
                onCheckedChange={(checked) => setArrayMode(checked as boolean)}
                disabled={nestedOutput}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="arrayMode" className="text-sm font-medium cursor-pointer">
                  Array Mode
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Output as arrays of values instead of objects
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToJson}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Convert to JSON"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">JSON Output</Label>
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
