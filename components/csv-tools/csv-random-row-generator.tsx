"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Plus, Trash2, Settings2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  parseCSVIntelligently,
  copyToClipboard,
  generateUuid,
  generateRandomName,
  generateRandomEmail,
  generateRandomDate,
  seededRandom,
  CSVRow,
} from "./csv-utils";

interface ColumnConfig {
  id: string;
  name: string;
  type: "name" | "email" | "date" | "uuid" | "number" | "boolean" | "custom";
  options: ColumnOptions;
}

interface ColumnOptions {
  // For number type
  min?: number;
  max?: number;
  decimals?: number;

  // For date type
  dateStart?: string;
  dateEnd?: string;
  dateFormat?: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY";

  // For boolean type
  trueProbability?: number;

  // For custom type
  customValues?: string;

  // For email type
  emailDomain?: string;
}

const DEFAULT_OPTIONS: ColumnOptions = {
  min: 0,
  max: 100,
  decimals: 0,
  dateStart: "2020-01-01",
  dateEnd: new Date().toISOString().split("T")[0],
  dateFormat: "YYYY-MM-DD",
  trueProbability: 50,
  customValues: "Option A, Option B, Option C",
  emailDomain: "example.com",
};

export default function CsvRandomRowGenerator() {
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: "1", name: "name", type: "name", options: {} },
    { id: "2", name: "email", type: "email", options: { emailDomain: "example.com" } },
    { id: "3", name: "age", type: "number", options: { min: 18, max: 80 } },
  ]);
  const [rowCount, setRowCount] = useState<number>(100);
  const [seed, setSeed] = useState<string>("");
  const [useSeed, setUseSeed] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addColumn = useCallback(() => {
    const newColumn: ColumnConfig = {
      id: generateId(),
      name: `column_${columns.length + 1}`,
      type: "custom",
      options: { ...DEFAULT_OPTIONS },
    };
    setColumns([...columns, newColumn]);
  }, [columns]);

  const removeColumn = useCallback((id: string) => {
    if (columns.length <= 1) {
      toast.error("Cannot remove the last column");
      return;
    }
    setColumns(columns.filter((col) => col.id !== id));
  }, [columns]);

  const updateColumn = useCallback((id: string, updates: Partial<ColumnConfig>) => {
    setColumns(columns.map((col) => (col.id === id ? { ...col, ...updates } : col)));
  }, [columns]);

  const updateColumnOptions = useCallback((id: string, options: ColumnOptions) => {
    setColumns(columns.map((col) => (col.id === id ? { ...col, options: { ...col.options, ...options } } : col)));
  }, [columns]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const { headers } = parseCSVIntelligently(text);

        // Create columns from headers
        const newColumns: ColumnConfig[] = headers.map((header, index) => ({
          id: generateId(),
          name: header,
          type: index === 0 ? "name" : index === 1 ? "email" : "custom",
          options: { ...DEFAULT_OPTIONS },
        }));

        setColumns(newColumns);
        toast.success(`Loaded ${headers.length} columns from file: ${file.name}`);
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
        const { headers } = parseCSVIntelligently(text);
        const newColumns: ColumnConfig[] = headers.map((header, index) => ({
          id: generateId(),
          name: header,
          type: index === 0 ? "name" : index === 1 ? "email" : "custom",
          options: { ...DEFAULT_OPTIONS },
        }));
        setColumns(newColumns);
        toast.success(`Loaded ${headers.length} columns from file: ${file.name}`);
      });
    } else {
      toast.error("Please drop a CSV file");
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const generateData = useCallback(() => {
    if (columns.length === 0) {
      toast.error("Please add at least one column");
      return;
    }

    setIsProcessing(true);

    try {
      const random = useSeed && seed ? seededRandom(parseInt(seed) || Math.floor(Math.random() * 10000)) : null;
      const getRandom = () => (random ? random() : Math.random());

      const data: CSVRow[] = [];

      for (let i = 0; i < rowCount; i++) {
        const row: CSVRow = {};

        columns.forEach((col) => {
          const opts = col.options;

          switch (col.type) {
            case "name":
              row[col.name] = generateRandomName();
              break;

            case "email":
              const domain = opts.emailDomain || "example.com";
              const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
              let username = "";
              for (let j = 0; j < 8; j++) {
                username += chars.charAt(Math.floor(getRandom() * chars.length));
              }
              row[col.name] = `${username}@${domain}`;
              break;

            case "date":
              const start = opts.dateStart ? new Date(opts.dateStart) : new Date(2020, 0, 1);
              const end = opts.dateEnd ? new Date(opts.dateEnd) : new Date();
              const randomTime = start.getTime() + getRandom() * (end.getTime() - start.getTime());
              const date = new Date(randomTime);
              
              switch (opts.dateFormat) {
                case "MM/DD/YYYY":
                  row[col.name] = `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
                  break;
                case "DD/MM/YYYY":
                  row[col.name] = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
                  break;
                default:
                  row[col.name] = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              }
              break;

            case "uuid":
              if (typeof crypto !== "undefined" && crypto.randomUUID) {
                row[col.name] = crypto.randomUUID();
              } else {
                row[col.name] = generateUuid();
              }
              break;

            case "number":
              const min = opts.min ?? 0;
              const max = opts.max ?? 100;
              const decimals = opts.decimals ?? 0;
              const numValue = min + getRandom() * (max - min);
              row[col.name] = decimals > 0 ? numValue.toFixed(decimals) : Math.floor(numValue).toString();
              break;

            case "boolean":
              const probability = opts.trueProbability ?? 50;
              row[col.name] = getRandom() * 100 < probability ? "true" : "false";
              break;

            case "custom":
              const values = (opts.customValues || "Option A, Option B, Option C")
                .split(",")
                .map((v) => v.trim())
                .filter((v) => v);
              row[col.name] = values[Math.floor(getRandom() * values.length)] || "";
              break;

            default:
              row[col.name] = "";
          }
        });

        data.push(row);
      }

      // Generate CSV output
      const headers = columns.map((col) => col.name);
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers.map((h) => {
            const value = String(row[h] || "");
            if (value.includes(",") || value.includes('"') || value.includes("\n")) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(",")
        ),
      ].join("\n");

      setOutput(csvContent);
      setPreviewData(data.slice(0, 10));
      toast.success(`Generated ${rowCount} rows of synthetic data`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Data generation failed");
    } finally {
      setIsProcessing(false);
    }
  }, [columns, rowCount, seed, useSeed]);

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
    a.download = "synthetic-data.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output]);

  const clearAll = useCallback(() => {
    setColumns([
      { id: generateId(), name: "name", type: "name", options: {} },
      { id: generateId(), name: "email", type: "email", options: { emailDomain: "example.com" } },
      { id: generateId(), name: "age", type: "number", options: { min: 18, max: 80 } },
    ]);
    setOutput("");
    setPreviewData([]);
  }, []);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      name: "Name",
      email: "Email",
      date: "Date",
      uuid: "UUID",
      number: "Number",
      boolean: "Boolean",
      custom: "Custom List",
    };
    return labels[type] || type;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">CSV Random Row Generator</h2>
        <p className="text-muted-foreground">
          Generate synthetic CSV data with configurable column types including names, emails, dates, UUIDs, numbers, booleans, and custom lists
        </p>
      </div>

      <div className="space-y-6">
        {/* Load from File */}
        <section>
          <Label className="text-base mb-3 block">Optional: Load Column Headers from CSV</Label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-md p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex items-center justify-center gap-3 text-center">
              <FileSpreadsheet className="w-6 h-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop a CSV file to use its headers, or configure columns manually below
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </section>

        <Separator />

        {/* Column Configuration */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">Column Configuration</Label>
            <Button variant="outline" size="sm" onClick={addColumn}>
              <Plus className="w-4 h-4 mr-2" />
              Add Column
            </Button>
          </div>

          <div className="space-y-3">
            {columns.map((col, index) => (
              <div key={col.id} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor={`name-${col.id}`} className="text-xs">Column Name</Label>
                      <Input
                        id={`name-${col.id}`}
                        value={col.name}
                        onChange={(e) => updateColumn(col.id, { name: e.target.value })}
                        placeholder="column_name"
                        className="h-9"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor={`type-${col.id}`} className="text-xs">Data Type</Label>
                      <Select
                        value={col.type}
                        onValueChange={(value: ColumnConfig["type"]) =>
                          updateColumn(col.id, { type: value })
                        }
                      >
                        <SelectTrigger id={`type-${col.id}`} className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="uuid">UUID</SelectItem>
                          <SelectItem value="number">Number Range</SelectItem>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="custom">Custom List</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColumn(col.id)}
                        className="h-9 text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Type-specific options */}
                {col.type === "number" && (
                  <div className="grid grid-cols-3 gap-3 pl-9">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Min Value</Label>
                      <Input
                        type="number"
                        value={col.options.min ?? 0}
                        onChange={(e) =>
                          updateColumnOptions(col.id, { min: parseFloat(e.target.value) || 0 })
                        }
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Max Value</Label>
                      <Input
                        type="number"
                        value={col.options.max ?? 100}
                        onChange={(e) =>
                          updateColumnOptions(col.id, { max: parseFloat(e.target.value) || 100 })
                        }
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Decimal Places</Label>
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        value={col.options.decimals ?? 0}
                        onChange={(e) =>
                          updateColumnOptions(col.id, { decimals: parseInt(e.target.value) || 0 })
                        }
                        className="h-9"
                      />
                    </div>
                  </div>
                )}

                {col.type === "date" && (
                  <div className="grid grid-cols-3 gap-3 pl-9">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Start Date</Label>
                      <Input
                        type="date"
                        value={col.options.dateStart || "2020-01-01"}
                        onChange={(e) =>
                          updateColumnOptions(col.id, { dateStart: e.target.value })
                        }
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">End Date</Label>
                      <Input
                        type="date"
                        value={col.options.dateEnd || new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          updateColumnOptions(col.id, { dateEnd: e.target.value })
                        }
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Format</Label>
                      <Select
                        value={col.options.dateFormat || "YYYY-MM-DD"}
                        onValueChange={(value: any) =>
                          updateColumnOptions(col.id, { dateFormat: value })
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {col.type === "boolean" && (
                  <div className="grid grid-cols-2 gap-3 pl-9">
                    <div className="space-y-2">
                      <Label className="text-xs">True Probability: {col.options.trueProbability ?? 50}%</Label>
                      <Slider
                        value={[col.options.trueProbability ?? 50]}
                        onValueChange={(v) =>
                          updateColumnOptions(col.id, { trueProbability: v[0] })
                        }
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                  </div>
                )}

                {col.type === "custom" && (
                  <div className="space-y-1.5 pl-9">
                    <Label className="text-xs">Custom Values (comma-separated)</Label>
                    <Input
                      value={col.options.customValues || "Option A, Option B, Option C"}
                      onChange={(e) =>
                        updateColumnOptions(col.id, { customValues: e.target.value })
                      }
                      placeholder="Option A, Option B, Option C"
                      className="h-9"
                    />
                  </div>
                )}

                {col.type === "email" && (
                  <div className="space-y-1.5 pl-9">
                    <Label className="text-xs">Email Domain</Label>
                    <Input
                      value={col.options.emailDomain || "example.com"}
                      onChange={(e) =>
                        updateColumnOptions(col.id, { emailDomain: e.target.value })
                      }
                      placeholder="example.com"
                      className="h-9"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Generation Options */}
        <section>
          <Label className="text-base mb-3 block">Generation Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rowCount" className="text-sm">Number of Rows: {rowCount}</Label>
              <Slider
                id="rowCount"
                value={[rowCount]}
                onValueChange={(v) => setRowCount(v[0])}
                min={1}
                max={10000}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="useSeed"
                  checked={useSeed}
                  onCheckedChange={(checked) => setUseSeed(checked as boolean)}
                />
                <Label htmlFor="useSeed" className="text-sm cursor-pointer">
                  Use Seed for Reproducibility
                </Label>
              </div>
              {useSeed && (
                <Input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="Enter seed value"
                  className="h-9"
                />
              )}
            </div>
          </div>
        </section>

        <Separator />

        {/* Generate Button */}
        <section>
          <Button
            onClick={generateData}
            disabled={isProcessing || columns.length === 0}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Generating..." : "Generate Synthetic Data"}
          </Button>
        </section>

        {/* Preview Section */}
        {previewData.length > 0 && showPreview && (
          <section>
            <Label className="text-base mb-3 block">Preview (first 10 rows)</Label>
            <div className="border rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.id} className="text-left p-3 font-medium whitespace-nowrap">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-muted/30">
                      {columns.map((col) => (
                        <td key={col.id} className="p-3 font-mono text-xs whitespace-nowrap">
                          {String(row[col.name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Generated CSV Output</Label>
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

        {/* Info Section */}
        {!output && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Available column types:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Name:</strong> Random first and last names</li>
                  <li><strong>Email:</strong> Random email addresses with configurable domain</li>
                  <li><strong>Date:</strong> Random dates within a specified range</li>
                  <li><strong>UUID:</strong> Universally unique identifiers (v4)</li>
                  <li><strong>Number:</strong> Random numbers within min/max range with configurable decimals</li>
                  <li><strong>Boolean:</strong> True/false with configurable probability</li>
                  <li><strong>Custom List:</strong> Random selection from comma-separated values</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
