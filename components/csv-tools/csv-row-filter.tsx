"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData, filterCsvRows } from "./csv-utils";

type Operator = "equals" | "contains" | "regex" | "gt" | "lt" | "gte" | "lte" | "startsWith" | "endsWith" | "isEmpty" | "isNotEmpty";
type LogicMode = "AND" | "OR";

interface FilterCondition {
  id: string;
  column: string;
  operator: Operator;
  value: string;
}

export default function CsvRowFilter() {
  const [inputText, setInputText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [headers, setHeaders] = useState<string[]>([]);
  const [conditions, setConditions] = useState<FilterCondition[]>([]);
  const [logicMode, setLogicMode] = useState<LogicMode>("AND");
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        setInputText(text);
        const { headers: parsedHeaders } = parseCSVIntelligently(text);
        setHeaders(parsedHeaders);
        setConditions([]);
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
        setConditions([]);
        toast.success(`Loaded file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const addCondition = useCallback(() => {
    if (headers.length === 0) return;
    setConditions((prev) => [
      ...prev,
      { id: generateId(), column: headers[0], operator: "contains", value: "" },
    ]);
  }, [headers]);

  const removeCondition = useCallback((id: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateCondition = useCallback((id: string, field: keyof FilterCondition, value: string) => {
    setConditions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }, []);

  const filterRows = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    if (conditions.length === 0) {
      toast.error("Please add at least one filter condition");
      return;
    }

    setIsProcessing(true);

    try {
      const { data } = parseCSVIntelligently(inputText);

      const validConditions = conditions.filter((c) => {
        if (c.operator === "isEmpty" || c.operator === "isNotEmpty") return true;
        return c.value.trim() !== "";
      });

      if (validConditions.length === 0) {
        toast.error("Please enter values for filter conditions");
        setIsProcessing(false);
        return;
      }

      // Custom filter implementation with case sensitivity support
      const filteredData = data.filter((row) => {
        const results = validConditions.map((condition) => {
          let cellValue = String(row[condition.column] || "");
          let compareValue = condition.value;

          if (!caseSensitive && condition.operator !== "regex") {
            cellValue = cellValue.toLowerCase();
            compareValue = compareValue.toLowerCase();
          }

          switch (condition.operator) {
            case "equals":
              return cellValue === compareValue;
            case "contains":
              return cellValue.includes(compareValue);
            case "regex":
              try {
                const flags = caseSensitive ? "" : "i";
                return new RegExp(condition.value, flags).test(String(row[condition.column] || ""));
              } catch {
                return false;
              }
            case "gt":
              return Number(cellValue) > Number(compareValue);
            case "lt":
              return Number(cellValue) < Number(compareValue);
            case "gte":
              return Number(cellValue) >= Number(compareValue);
            case "lte":
              return Number(cellValue) <= Number(compareValue);
            case "startsWith":
              return cellValue.startsWith(compareValue);
            case "endsWith":
              return cellValue.endsWith(compareValue);
            case "isEmpty":
              return cellValue.trim() === "";
            case "isNotEmpty":
              return cellValue.trim() !== "";
            default:
              return false;
          }
        });

        return logicMode === "AND" ? results.every(Boolean) : results.some(Boolean);
      });

      if (filteredData.length === 0) {
        toast.warning("No rows match the filter conditions");
        setOutput("");
        setIsProcessing(false);
        return;
      }

      const csvOutput = [headers.join(","), ...filteredData.map((row) => headers.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Filtered from ${data.length} to ${filteredData.length} rows`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Filtering failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, conditions, logicMode, caseSensitive, headers]);

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
      exportCSVData(data, "filtered.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInputText("");
    setOutput("");
    setHeaders([]);
    setConditions([]);
  }, []);

  const getPreview = useCallback(() => {
    if (!inputText || conditions.length === 0) return null;

    try {
      const { data } = parseCSVIntelligently(inputText);
      return {
        totalRows: data.length,
        conditionsCount: conditions.length,
      };
    } catch {
      return null;
    }
  }, [inputText, conditions]);

  const preview = getPreview();

  const operators: { value: Operator; label: string }[] = [
    { value: "equals", label: "Equals" },
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts With" },
    { value: "endsWith", label: "Ends With" },
    { value: "regex", label: "Regex Match" },
    { value: "gt", label: "Greater Than (>)" },
    { value: "lt", label: "Less Than (<)" },
    { value: "gte", label: "Greater or Equal (>=)" },
    { value: "lte", label: "Less or Equal (<=)" },
    { value: "isEmpty", label: "Is Empty" },
    { value: "isNotEmpty", label: "Is Not Empty" },
  ];

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
              setConditions([]);
            }}
            placeholder="Paste CSV data here...&#10;name,age,city,salary&#10;John,30,New York,50000&#10;Jane,25,Los Angeles,60000"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        {headers.length > 0 && (
          <>
            <Separator />

            {/* Filter Configuration Section */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base">Filter Conditions</Label>
                <Button variant="outline" size="sm" onClick={addCondition}>
                  <Plus className="w-4 h-4" />
                  Add Condition
                </Button>
              </div>

              {/* Logic Mode */}
              <div className="flex items-center gap-4 mb-4 p-3 border rounded-md">
                <Label className="text-sm">Match:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={logicMode === "AND" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLogicMode("AND")}
                  >
                    ALL (AND)
                  </Button>
                  <Button
                    variant={logicMode === "OR" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLogicMode("OR")}
                  >
                    ANY (OR)
                  </Button>
                </div>
                <Separator orientation="vertical" className="h-6" />
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

              {/* Conditions */}
              {conditions.length > 0 ? (
                <div className="space-y-2">
                  {conditions.map((condition, index) => (
                    <div key={condition.id} className="flex items-center gap-2 p-3 border rounded-md">
                      {index > 0 && (
                        <span className="text-sm font-medium text-muted-foreground w-8 text-center">
                          {logicMode}
                        </span>
                      )}
                      {index === 0 && <span className="w-8" />}

                      <Select
                        value={condition.column}
                        onValueChange={(value) => updateCondition(condition.id, "column", value)}
                      >
                        <SelectTrigger className="w-40">
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

                      <Select
                        value={condition.operator}
                        onValueChange={(value) => updateCondition(condition.id, "operator", value)}
                      >
                        <SelectTrigger className="w-44">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {operators.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {condition.operator !== "isEmpty" && condition.operator !== "isNotEmpty" && (
                        <Input
                          value={condition.value}
                          onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                          placeholder="Value"
                          className="flex-1"
                        />
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCondition(condition.id)}
                        className="shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border rounded-md text-center text-muted-foreground">
                  Click "Add Condition" to create filter rules
                </div>
              )}
            </section>

            {/* Preview Section */}
            {preview && (
              <section>
                <Label className="text-base mb-3 block">Preview</Label>
                <div className="p-4 border rounded-md bg-muted/30">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Rows</p>
                      <p className="font-medium">{preview.totalRows}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conditions</p>
                      <p className="font-medium">{preview.conditionsCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Logic</p>
                      <p className="font-medium">{logicMode}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <Separator />

            {/* Filter Button */}
            <section>
              <Button
                onClick={filterRows}
                disabled={isProcessing || conditions.length === 0}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Filtering..."
                ) : (
                  <>
                    <Filter className="w-4 h-4" />
                    Apply Filter
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Filtered Output</Label>
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
              <Filter className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How to use CSV Row Filter:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a CSV file or paste CSV data</li>
                  <li>Add filter conditions for any column</li>
                  <li>Choose operators: equals, contains, regex, numeric comparisons</li>
                  <li>Select AND/OR logic for multiple conditions</li>
                  <li>Use "Is Empty" / "Is Not Empty" for null checks</li>
                  <li>Click "Apply Filter" to generate output</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
