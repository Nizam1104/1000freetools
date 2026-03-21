"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { copyToClipboard, parseCSVIntelligently } from "./csv-utils";

export default function CsvToText() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [template, setTemplate] = useState<string>("{{row}}");
  const [rowTemplate, setRowTemplate] = useState<string>("{{header}}: {{value}}");
  const [separator, setSeparator] = useState<string>("\n\n");
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

  const convertToText = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data, headers } = parseCSVIntelligently(inputText);

      const results: string[] = [];

      data.forEach((row, rowIndex) => {
        let rowOutput = template;

        // Replace {{row}} with formatted row content
        if (rowOutput.includes("{{row}}")) {
          const rowContent = headers
            .map((header) => {
              const value = String(row[header] || "");
              return rowTemplate
                .replace(/{{header}}/g, header)
                .replace(/{{value}}/g, value);
            })
            .join("\n");
          rowOutput = rowOutput.replace(/{{row}}/g, rowContent);
        }

        // Replace {{index}} with row number
        rowOutput = rowOutput.replace(/{{index}}/g, String(rowIndex + 1));

        // Replace individual column placeholders
        headers.forEach((header) => {
          const placeholder = `{{${header}}}`;
          if (rowOutput.includes(placeholder)) {
            rowOutput = rowOutput.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), String(row[header] || ""));
          }
        });

        results.push(rowOutput);
      });

      setOutput(results.join(separator));
      toast.success("Successfully converted CSV to formatted text");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, template, rowTemplate, separator]);

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
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded text file");
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setTemplate("{{row}}");
    setRowTemplate("{{header}}: {{value}}");
    setSeparator("\n\n");
  }, []);

  const insertTemplate = (text: string, field: "template" | "rowTemplate") => {
    if (field === "template") {
      setTemplate(template + text);
    } else {
      setRowTemplate(rowTemplate + text);
    }
  };

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
          <Label className="text-base mb-3 block">Template Options</Label>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="template" className="text-sm font-medium">
                  Row Template
                </Label>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => insertTemplate("\n---\n", "template")}
                  >
                    Add Separator
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => insertTemplate("\nRow {{index}}", "template")}
                  >
                    Add Index
                  </Button>
                </div>
              </div>
              <Textarea
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
                placeholder="{{row}}"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Use <code className="bg-muted px-1 rounded">{`{{row}}`}</code> for full row, <code className="bg-muted px-1 rounded">{`{{index}}`}</code> for row number, or <code className="bg-muted px-1 rounded">{`{{column_name}}`}</code> for specific columns
              </p>
            </div>

            <div className="p-4 border rounded-md">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="rowTemplate" className="text-sm font-medium">
                  Field Template
                </Label>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setRowTemplate("{{header}}: {{value}}")}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              <Textarea
                id="rowTemplate"
                value={rowTemplate}
                onChange={(e) => setRowTemplate(e.target.value)}
                className="font-mono text-sm min-h-[80px]"
                placeholder="{{header}}: {{value}}"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Use <code className="bg-muted px-1 rounded">{`{{header}}`}</code> for column name and <code className="bg-muted px-1 rounded">{`{{value}}`}</code> for cell value
              </p>
            </div>

            <div className="p-4 border rounded-md max-w-md">
              <Label htmlFor="separator" className="text-sm font-medium">
                Row Separator
              </Label>
              <Input
                id="separator"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="mt-1 font-mono text-sm"
                placeholder="\n\n"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Text between each row (use {"\\n"} for newlines)
              </p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToText}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Converting..." : "Convert to Text"}
          </Button>
        </section>

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Text Output</Label>
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
