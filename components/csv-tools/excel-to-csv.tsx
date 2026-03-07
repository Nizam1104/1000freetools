"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function ExcelToCsv() {
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.name.toLowerCase().endsWith(".xlsx") && !file.name.toLowerCase().endsWith(".xls")) {
        toast.error("Please upload an Excel file (.xlsx or .xls)");
        return;
      }

      setFileName(file.name);
      setIsProcessing(true);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          toast.error("No sheets found in Excel file");
          setIsProcessing(false);
          return;
        }

        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to CSV
        const csv = XLSX.utils.sheet_to_csv(worksheet, {
          FS: delimiter,
        });

        setOutput(csv);
        toast.success(`Converted sheet: ${firstSheetName}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Conversion failed");
      } finally {
        setIsProcessing(false);
      }
    },
    [delimiter]
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.name.toLowerCase().endsWith(".xlsx") || file.name.toLowerCase().endsWith(".xls"))) {
      setFileName(file.name);
      const fakeEvent = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(fakeEvent);
    } else {
      toast.error("Please drop an Excel file (.xlsx or .xls)");
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.replace(/\.(xlsx|xls)$/i, "") + ".csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded CSV file");
  }, [output, fileName]);

  const clearAll = useCallback(() => {
    setOutput("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Excel to CSV Converter</h1>
        <p className="text-muted-foreground">
          Convert Excel .xlsx/.xls files to CSV format with customizable delimiter
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">Excel File</Label>
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
                Drag and drop an Excel file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">Supports .xlsx and .xls formats</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {fileName && (
            <div className="mt-3 p-3 border rounded-md bg-muted/30">
              <p className="text-sm">
                <span className="text-muted-foreground">Selected file:</span>{" "}
                <span className="font-medium">{fileName}</span>
              </p>
            </div>
          )}
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">CSV Options</Label>
          <div className="max-w-xs">
            <div className="space-y-2">
              <Label htmlFor="delimiter" className="text-sm">Delimiter</Label>
              <Select value={delimiter} onValueChange={setDelimiter}>
                <SelectTrigger id="delimiter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <Separator />

        {/* Output Section */}
        {output && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">CSV Output</Label>
              <Button variant="outline" size="sm" onClick={downloadOutput}>
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>

            <Textarea
              value={output}
              readOnly
              className="min-h-[300px] font-mono text-sm bg-muted/30"
            />
          </section>
        )}

        {/* Info Section */}
        {!output && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Supported Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Convert .xlsx and .xls files to CSV</li>
                  <li>Extracts data from the first sheet by default</li>
                  <li>Customizable delimiter (comma, semicolon, pipe, tab)</li>
                  <li>Preserves cell values and formatting</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
