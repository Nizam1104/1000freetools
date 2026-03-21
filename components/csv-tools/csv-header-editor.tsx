"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Type, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

type CaseFormat = "lowercase" | "uppercase" | "titlecase" | "camelCase" | "snake_case" | "kebab-case" | "PascalCase";

export default function CsvHeaderEditor() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [editedHeaders, setEditedHeaders] = useState<string[]>([]);
  const [findText, setFindText] = useState<string>("");
  const [replaceText, setReplaceText] = useState<string>("");
  const [caseFormat, setCaseFormat] = useState<CaseFormat>("lowercase");
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        setEditedHeaders([...parsedHeaders]);
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
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        setEditedHeaders([...parsedHeaders]);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleHeaderChange = useCallback((index: number, value: string) => {
    setEditedHeaders((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  const toCamelCase = (str: string): string => {
    const parts = str.toLowerCase().split(/[\s_-]+/);
    return parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  };

  const toPascalCase = (str: string): string => {
    const parts = str.toLowerCase().split(/[\s_-]+/);
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  };

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_")
      .toLowerCase();
  };

  const toKebabCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  };

  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(/[\s_-]+/)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
  };

  const applyCaseFormat = useCallback((format: CaseFormat) => {
    setEditedHeaders((prev) =>
      prev.map((header) => {
        switch (format) {
          case "lowercase":
            return header.toLowerCase();
          case "uppercase":
            return header.toUpperCase();
          case "titlecase":
            return toTitleCase(header);
          case "camelCase":
            return toCamelCase(header);
          case "PascalCase":
            return toPascalCase(header);
          case "snake_case":
            return toSnakeCase(header);
          case "kebab-case":
            return toKebabCase(header);
          default:
            return header;
        }
      })
    );
    toast.success(`Applied ${format} format to headers`);
  }, []);

  const applyFindReplace = useCallback(() => {
    if (!findText) {
      toast.error("Please enter text to find");
      return;
    }

    setEditedHeaders((prev) =>
      prev.map((header) => {
        let result = header;
        let searchValue = findText;
        let replaceValue = replaceText;

        if (!caseSensitive) {
          searchValue = findText.toLowerCase();
          replaceValue = replaceText.toLowerCase();
        }

        if (useRegex) {
          try {
            const flags = caseSensitive ? "g" : "gi";
            const regex = new RegExp(findText, flags);
            result = header.replace(regex, replaceText);
          } catch {
            toast.error("Invalid regex pattern");
          }
        } else {
          if (caseSensitive) {
            result = header.split(findText).join(replaceText);
          } else {
            const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
            result = header.replace(regex, replaceText);
          }
        }

        return result;
      })
    );

    toast.success("Find and replace applied to headers");
  }, [findText, replaceText, useRegex, caseSensitive]);

  const resetHeaders = useCallback(() => {
    setEditedHeaders([...headers]);
    toast.success("Headers reset to original");
  }, [headers]);

  const applyChanges = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const newData: CSVRow[] = data.map((row) => {
        const newRow: CSVRow = {};
        headers.forEach((header, index) => {
          newRow[editedHeaders[index]] = row[header] || "";
        });
        return newRow;
      });

      const csvOutput = [editedHeaders.join(","), ...newData.map((row) => editedHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Updated ${editedHeaders.length} headers`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Header edit failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, headers, editedHeaders]);

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
    try {
      const { data } = parseCSVIntelligently(output);
      exportCSVData(data, "edited-headers.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setEditedHeaders([]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
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
            onChange={(e) => {
              setInputText(e.target.value);
              const { headers: parsedHeaders } = parseCSVIntelligently(e.target.value);
              setHeaders(parsedHeaders);
              setEditedHeaders([...parsedHeaders]);
            }}
            placeholder="Paste CSV data here...&#10;First Name,Last Name,Email Address,Phone Number&#10;John,Doe,john@example.com,555-1234"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Inline Header Editor */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Edit Headers Inline</Label>
                <Button variant="outline" size="sm" onClick={resetHeaders}>
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-3 border rounded-md">
                {headers.map((header, index) => (
                  <div key={header} className="flex items-center gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1 line-through">{header}</p>
                      <Input
                        value={editedHeaders[index]}
                        onChange={(e) => handleHeaderChange(index, e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bulk Operations Section */}
            <section>
              <Label className="text-base mb-3 block">Bulk Operations</Label>

              <div className="space-y-4">
                {/* Case Format */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-2 block">Case Conversion</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("lowercase")}
                    >
                      lowercase
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("uppercase")}
                    >
                      UPPERCASE
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("titlecase")}
                    >
                      Title Case
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("camelCase")}
                    >
                      camelCase
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("PascalCase")}
                    >
                      PascalCase
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("snake_case")}
                    >
                      snake_case
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyCaseFormat("kebab-case")}
                    >
                      kebab-case
                    </Button>
                  </div>
                </div>

                {/* Find and Replace */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-2 block">Find and Replace</Label>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Input
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      placeholder="Find"
                      className="w-40"
                    />
                    <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
                    <Input
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      placeholder="Replace"
                      className="w-40"
                    />
                    <Button onClick={applyFindReplace} size="sm">
                      Apply
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="use-regex"
                        checked={useRegex}
                        onCheckedChange={(checked) => setUseRegex(checked as boolean)}
                      />
                      <Label htmlFor="use-regex" className="text-sm cursor-pointer">
                        Use regex
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="case-sensitive"
                        checked={caseSensitive}
                        onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                      />
                      <Label htmlFor="case-sensitive" className="text-sm cursor-pointer">
                        Case sensitive
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Preview Section */}
            <section>
              <Label className="text-base mb-3 block">Header Preview</Label>
              <div className="p-4 border rounded-md bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">Original headers:</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {headers.map((header) => (
                    <span key={header} className="px-2 py-1 bg-muted rounded text-sm font-mono">
                      {header}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">New headers:</p>
                <div className="flex flex-wrap gap-2">
                  {editedHeaders.map((header, index) => (
                    <span
                      key={header}
                      className={`px-2 py-1 rounded text-sm font-mono ${
                        header !== headers[index]
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-muted"
                      }`}
                    >
                      {header}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <Separator />

            {/* Apply Button */}
            <section>
              <Button
                onClick={applyChanges}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Applying..." : "Apply Header Changes"}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Output with New Headers</Label>
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
          </>
        )}

        {/* Info Section */}
        {!headers.length && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Type className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Header Editor:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Edit headers inline in the text inputs</li>
                  <li>Use case conversion buttons for bulk formatting</li>
                  <li>Use find/replace for bulk renaming</li>
                  <li>Supports regex patterns for advanced replacements</li>
                  <li>Click "Apply Header Changes" to generate output</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
