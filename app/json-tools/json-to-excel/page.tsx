"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function JsonToExcelConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [sheetName, setSheetName] = useState("Sheet1");

  const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else if (Array.isArray(value)) {
        result[newKey] = value.map(v =>
          typeof v === "object" ? JSON.stringify(v) : String(v)
        ).join(", ");
      } else {
        result[newKey] = value;
      }
    }

    return result;
  };

  const convertJsonToExcel = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter JSON to convert");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const dataArray = Array.isArray(parsed) ? parsed : [parsed];

      if (dataArray.length === 0) {
        toast.error("JSON array is empty");
        return;
      }

      const flattenedData = dataArray.map(item => flattenObject(item as Record<string, unknown>));
      const allKeys = Array.from(new Set(flattenedData.flatMap(obj => Object.keys(obj))));

      const worksheetData = [allKeys];
      for (const row of flattenedData) {
        worksheetData.push(allKeys.map(key => String(row[key] ?? "")));
      }

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      const excelBuffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);

      setOutput(`Excel file generated with ${dataArray.length} rows and ${allKeys.length} columns`);
      toast.success("Excel file generated successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input, sheetName]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify([
      { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering", salary: 75000 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing", salary: 65000 },
      { id: 3, name: "Bob Wilson", email: "bob@example.com", department: "Sales", salary: 70000 },
      { id: 4, name: "Alice Brown", email: "alice@example.com", department: "Engineering", salary: 80000 },
    ], null, 2);
    setInput(sample);
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to Excel Converter – Export JSON to XLSX</h1>
          <p className="text-muted-foreground">
            Export JSON data directly to Excel XLSX format using client-side generation. Our free JSON to Excel Converter requires no uploads — your data stays private in your browser.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={loadSample}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Sample JSON
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="sheetName" className="text-sm text-muted-foreground whitespace-nowrap">
                  Sheet Name:
                </Label>
                <input
                  id="sheetName"
                  type="text"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  className="h-9 w-[150px] rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Sheet1"
                />
              </div>

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Download Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="input" className="text-sm font-medium text-muted-foreground mb-2 block">
                Input JSON
              </Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON array here..."
                className="min-h-[500px] font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="output" className="text-sm font-medium text-muted-foreground">
                  Output Status
                </Label>
                {output && (
                  <Button variant="ghost" size="sm" onClick={copyOutput}>
                    {copied ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder="Excel generation status will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
