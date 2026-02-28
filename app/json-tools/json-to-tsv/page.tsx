"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileJson, RotateCcw, Trash2, ArrowDownToLine, Copy, Check, Table } from "lucide-react";
import { toast } from "sonner";

export default function JsonToTsvConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const escapeTsv = (value: unknown): string => {
    if (value === null || value === undefined) {
      return "";
    }
    const str = String(value);
    if (str.includes("\t") || str.includes("\n") || str.includes("\r")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const flattenObject = (obj: Record<string, unknown>, prefix = ""): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        result[newKey] = value;
      }
    }
    
    return result;
  };

  const convertJsonToTsv = useCallback(() => {
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
      
      const header = allKeys.join("\t");
      const rows = flattenedData.map(obj => 
        allKeys.map(key => escapeTsv(obj[key])).join("\t")
      );
      
      const tsv = [header, ...rows].join("\n");
      setOutput(tsv);
      toast.success("Converted to TSV successfully!");
    } catch (e) {
      toast.error(`Invalid JSON: ${(e as Error).message}`);
    }
  }, [input]);

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const loadSample = () => {
    const sample = JSON.stringify([
      { id: 1, name: "John Doe", email: "john@example.com", active: true },
      { id: 2, name: "Jane Smith", email: "jane@example.com", active: false },
      { id: 3, name: "Bob Wilson", email: "bob@example.com", active: true },
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

  const downloadTsv = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/tab-separated-values;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.tsv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("TSV file downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">JSON to TSV Converter – Tab-Separated Values</h1>
          <p className="text-muted-foreground">
            Convert JSON arrays into tab-separated values (TSV) for easy spreadsheet and database import. Free online JSON to TSV Converter with instant preview and download support.
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

              <div className="flex-1" />

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={convertJsonToTsv}>
                  <Table className="h-4 w-4 mr-2" />
                  Convert to TSV
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
                  TSV Output
                </Label>
                {output && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyOutput}>
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadTsv}>
                      <ArrowDownToLine className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <Textarea
                id="output"
                value={output}
                readOnly
                placeholder="TSV output will appear here..."
                className="min-h-[500px] font-mono text-sm resize-none bg-muted/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
