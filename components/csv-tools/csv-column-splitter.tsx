"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData } from "./csv-utils";

type SplitMethod = "delimiter" | "regex" | "fixed-width";

export default function CsvColumnSplitter() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("delimiter");
  const [delimiter, setDelimiter] = useState<string>(" ");
  const [regexPattern, setRegexPattern] = useState<string>("");
  const [fixedWidths, setFixedWidths] = useState<string>("");
  const [newColumnNames, setNewColumnNames] = useState<string>("");
  const [removeOriginal, setRemoveOriginal] = useState<boolean>(true);
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
        if (parsedHeaders.length > 0) {
          setSelectedColumn(parsedHeaders[0]);
        }
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
        if (parsedHeaders.length > 0) {
          setSelectedColumn(parsedHeaders[0]);
        }
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const getPreviewSplit = useCallback(() => {
    if (!inputText || !selectedColumn) return null;

    try {
      const { data } = parseCSVIntelligently(inputText);
      if (data.length === 0) return null;

      const sampleValue = String(data[0][selectedColumn] || "");
      let parts: string[] = [];

      if (splitMethod === "delimiter") {
        parts = sampleValue.split(delimiter);
      } else if (splitMethod === "regex" && regexPattern) {
        try {
          const regex = new RegExp(regexPattern);
          const match = sampleValue.match(regex);
          if (match) {
            parts = match.slice(1);
          }
        } catch {
          parts = [];
        }
      } else if (splitMethod === "fixed-width" && fixedWidths) {
        const widths = fixedWidths.split(",").map((w) => parseInt(w.trim(), 10)).filter((n) => !isNaN(n));
        let start = 0;
        widths.forEach((width) => {
          parts.push(sampleValue.substring(start, start + width));
          start += width;
        });
        if (start < sampleValue.length) {
          parts.push(sampleValue.substring(start));
        }
      }

      return {
        sampleValue,
        parts,
        partCount: parts.length,
      };
    } catch {
      return null;
    }
  }, [inputText, selectedColumn, splitMethod, delimiter, regexPattern, fixedWidths]);

  const splitColumn = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (!selectedColumn) {
      toast.error("Please select a column to split");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      let newColumnNamesArray: string[];
      let splitResults: string[][] = [];

      // Determine split results and column names
      if (splitMethod === "delimiter") {
        splitResults = data.map((row) => {
          const value = String(row[selectedColumn] || "");
          return value.split(delimiter).map((s) => s.trim());
        });
        const maxParts = Math.max(...splitResults.map((r) => r.length));
        const nameInput = newColumnNames.trim() || selectedColumn;
        const baseNames = nameInput.split(",").map((n) => n.trim());
        newColumnNamesArray = baseNames.length === 1
          ? baseNames.map((n, i) => `${n} ${i + 1}`)
          : baseNames;
        while (newColumnNamesArray.length < maxParts) {
          newColumnNamesArray.push(`${selectedColumn}_${newColumnNamesArray.length + 1}`);
        }
      } else if (splitMethod === "regex" && regexPattern) {
        const regex = new RegExp(regexPattern);
        splitResults = data.map((row) => {
          const value = String(row[selectedColumn] || "");
          const match = value.match(regex);
          return match ? match.slice(1).map((s) => s?.trim() || "") : [""];
        });
        const maxParts = Math.max(...splitResults.map((r) => r.length), 1);
        const nameInput = newColumnNames.trim() || selectedColumn;
        const baseNames = nameInput.split(",").map((n) => n.trim());
        newColumnNamesArray = baseNames.length === 1
          ? baseNames.map((n, i) => `${n} ${i + 1}`)
          : baseNames;
        while (newColumnNamesArray.length < maxParts) {
          newColumnNamesArray.push(`${selectedColumn}_group_${newColumnNamesArray.length + 1}`);
        }
      } else if (splitMethod === "fixed-width" && fixedWidths) {
        const widths = fixedWidths.split(",").map((w) => parseInt(w.trim(), 10)).filter((n) => !isNaN(n));
        if (widths.length === 0) {
          throw new Error("Please enter valid fixed widths");
        }
        splitResults = data.map((row) => {
          const value = String(row[selectedColumn] || "");
          const parts: string[] = [];
          let start = 0;
          widths.forEach((width) => {
            parts.push(value.substring(start, start + width).trim());
            start += width;
          });
          if (start < value.length) {
            parts.push(value.substring(start).trim());
          }
          return parts;
        });
        const nameInput = newColumnNames.trim() || selectedColumn;
        const baseNames = nameInput.split(",").map((n) => n.trim());
        newColumnNamesArray = baseNames.length === 1
          ? baseNames.map((n, i) => `${n} ${i + 1}`)
          : baseNames;
        while (newColumnNamesArray.length < splitResults[0]?.length) {
          newColumnNamesArray.push(`${selectedColumn}_${newColumnNamesArray.length + 1}`);
        }
      } else {
        throw new Error("Please configure split method");
      }

      // Build new headers
      const columnIndex = headers.indexOf(selectedColumn);
      const newHeaders = removeOriginal
        ? [...headers.slice(0, columnIndex), ...newColumnNamesArray, ...headers.slice(columnIndex + 1)]
        : [...headers, ...newColumnNamesArray];

      // Build new data
      const newData: CSVRow[] = data.map((row, rowIndex) => {
        const newRow: CSVRow = {};
        const parts = splitResults[rowIndex];

        if (removeOriginal) {
          headers.forEach((header, index) => {
            if (header === selectedColumn) {
              newColumnNamesArray.forEach((newName, partIndex) => {
                newRow[newName] = parts[partIndex] || "";
              });
            } else {
              newRow[header] = row[header] || "";
            }
          });
        } else {
          Object.assign(newRow, row);
          newColumnNamesArray.forEach((newName, partIndex) => {
            newRow[newName] = parts[partIndex] || "";
          });
        }

        return newRow;
      });

      const csvOutput = [newHeaders.join(","), ...newData.map((row) => newHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Split "${selectedColumn}" into ${newColumnNamesArray.length} columns`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Column split failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, selectedColumn, splitMethod, delimiter, regexPattern, fixedWidths, newColumnNames, removeOriginal, headers]);

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
      exportCSVData(data, "column-split.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setSelectedColumn("");
  }, []);

  const preview = getPreviewSplit();

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
            onChange={(e) => {
              setInputText(e.target.value);
              const { headers: parsedHeaders } = parseCSVIntelligently(e.target.value);
              setHeaders(parsedHeaders);
              if (parsedHeaders.length > 0 && !selectedColumn) {
                setSelectedColumn(parsedHeaders[0]);
              }
            }}
            placeholder="Paste CSV data here...&#10;name,full_address,phone&#10;John,123 Main St New York NY 10001,555-1234"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Configuration Section */}
            <section>
              <Label className="text-base mb-3 block">Split Configuration</Label>

              <div className="space-y-4">
                {/* Column Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="column-select" className="text-sm mb-2 block">
                      Column to Split
                    </Label>
                    <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                      <SelectTrigger id="column-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {headers.map((header) => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="split-method" className="text-sm mb-2 block">
                      Split Method
                    </Label>
                    <Select value={splitMethod} onValueChange={(v) => setSplitMethod(v as SplitMethod)}>
                      <SelectTrigger id="split-method">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delimiter">Delimiter</SelectItem>
                        <SelectItem value="regex">Regular Expression</SelectItem>
                        <SelectItem value="fixed-width">Fixed Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Method-specific inputs */}
                {splitMethod === "delimiter" && (
                  <div>
                    <Label htmlFor="delimiter" className="text-sm mb-2 block">
                      Delimiter
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="delimiter"
                        value={delimiter}
                        onChange={(e) => setDelimiter(e.target.value)}
                        placeholder="Enter delimiter (e.g., space, comma, |)"
                        className="flex-1"
                      />
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => setDelimiter(" ")}>Space</Button>
                        <Button variant="outline" size="sm" onClick={() => setDelimiter(",")}>Comma</Button>
                        <Button variant="outline" size="sm" onClick={() => setDelimiter("|")}>Pipe</Button>
                        <Button variant="outline" size="sm" onClick={() => setDelimiter(";")}>Semicolon</Button>
                      </div>
                    </div>
                  </div>
                )}

                {splitMethod === "regex" && (
                  <div>
                    <Label htmlFor="regex" className="text-sm mb-2 block">
                      Regular Expression Pattern
                    </Label>
                    <Input
                      id="regex"
                      value={regexPattern}
                      onChange={(e) => setRegexPattern(e.target.value)}
                      placeholder="e.g., (\d+) ([A-Za-z]+) for capturing groups"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use capturing groups (parentheses) to define split points
                    </p>
                  </div>
                )}

                {splitMethod === "fixed-width" && (
                  <div>
                    <Label htmlFor="fixed-widths" className="text-sm mb-2 block">
                      Column Widths
                    </Label>
                    <Input
                      id="fixed-widths"
                      value={fixedWidths}
                      onChange={(e) => setFixedWidths(e.target.value)}
                      placeholder="e.g., 10,20,15 for three columns"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter comma-separated widths for each column
                    </p>
                  </div>
                )}

                {/* New column names */}
                <div>
                  <Label htmlFor="new-names" className="text-sm mb-2 block">
                    New Column Names (optional)
                  </Label>
                  <Input
                    id="new-names"
                    value={newColumnNames}
                    onChange={(e) => setNewColumnNames(e.target.value)}
                    placeholder="e.g., first_name,last_name or just 'part' for auto-numbering"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter comma-separated names or a single base name for auto-numbering
                  </p>
                </div>

                {/* Remove original */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remove-original"
                    checked={removeOriginal}
                    onCheckedChange={(checked) => setRemoveOriginal(checked as boolean)}
                  />
                  <Label htmlFor="remove-original" className="text-sm cursor-pointer">
                    Remove original column after splitting
                  </Label>
                </div>
              </div>
            </section>

            {/* Preview Section */}
            {preview && (
              <section>
                <Label className="text-base mb-3 block">Preview</Label>
                <div className="p-4 border rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">Sample value from "{selectedColumn}":</p>
                  <p className="font-mono text-sm bg-muted p-2 rounded mb-3">{preview.sampleValue}</p>
                  <p className="text-sm text-muted-foreground mb-2">Will split into {preview.partCount} parts:</p>
                  <div className="flex flex-wrap gap-2">
                    {preview.parts.map((part, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 rounded text-sm font-mono">
                        {part || "(empty)"}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <Separator />

            {/* Split Button */}
            <section>
              <Button
                onClick={splitColumn}
                disabled={isProcessing || !selectedColumn}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Splitting..."
                ) : (
                  <>
                    <Scissors className="w-4 h-4" />
                    Split Column
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Split Output</Label>
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
              <Scissors className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Column Splitter:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Select the column you want to split</li>
                  <li>Choose split method: delimiter, regex, or fixed-width</li>
                  <li>Configure the split parameters</li>
                  <li>Optionally specify new column names</li>
                  <li>Click "Split Column" to generate output</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
