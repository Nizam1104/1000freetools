"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, FileSpreadsheet, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function CsvToExcel() {
  const [inputText, setInputText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [headerStyle, setHeaderStyle] = useState<boolean>(true);
  const [autoFitColumns, setAutoFitColumns] = useState<boolean>(true);
  const [sheetName, setSheetName] = useState<string>("Sheet1");
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

  const convertToExcel = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      // Parse CSV
      const workbook = XLSX.utils.book_new();

      // Parse CSV text to array of arrays
      const rows: string[][] = [];
      const lines = inputText.split(/\r?\n/);

      for (const line of lines) {
        if (line.trim() === "") continue;

        // Simple CSV parsing (handles quoted fields)
        const cells: string[] = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === "," && !inQuotes) {
            cells.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        cells.push(current.trim());
        rows.push(cells);
      }

      // Create worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(rows);

      // Apply header styling if enabled
      if (headerStyle && rows.length > 0) {
        const headerRow = 0;
        const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

        // Style header row
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col });
          if (!worksheet[cellAddress]) continue;

          worksheet[cellAddress].s = {
            fill: {
              fgColor: { rgb: "4472C4" },
            },
            font: {
              color: { rgb: "FFFFFF" },
              bold: true,
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }

      // Auto-fit columns if enabled
      if (autoFitColumns && rows.length > 0) {
        const colWidths: { wch: number }[] = [];
        const numCols = rows[0].length;

        for (let col = 0; col < numCols; col++) {
          let maxWidth = 10; // Default minimum width

          for (let row = 0; row < rows.length; row++) {
            const cellValue = rows[row][col] || "";
            const cellWidth = String(cellValue).length;
            if (cellWidth > maxWidth) {
              maxWidth = Math.min(cellWidth, 50); // Cap at 50 characters
            }
          }

          colWidths.push({ wch: maxWidth });
        }

        worksheet["!cols"] = colWidths;
      }

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || "Sheet1");

      // Generate and download Excel file
      XLSX.writeFile(workbook, "converted.xlsx", {
        bookType: "xlsx",
        type: "buffer",
      });

      toast.success("Excel file downloaded successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Conversion failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText, headerStyle, autoFitColumns, sheetName]);

  const clearAll = useCallback(() => {
    setInputText("");
    setSheetName("Sheet1");
  }, []);

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
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste CSV data here...&#10;name,age,city&#10;John Doe,30,New York&#10;Jane Smith,25,Los Angeles"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Options Section */}
        <section>
          <Label className="text-base mb-3 block">Excel Options</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="headerStyle"
                checked={headerStyle}
                onCheckedChange={(checked) => setHeaderStyle(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="headerStyle" className="text-sm font-medium cursor-pointer">
                  Header Styling
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Apply blue background and white bold text to header row
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 border rounded-md">
              <Checkbox
                id="autoFitColumns"
                checked={autoFitColumns}
                onCheckedChange={(checked) => setAutoFitColumns(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor="autoFitColumns" className="text-sm font-medium cursor-pointer">
                  Auto-Fit Columns
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically adjust column widths to fit content
                </p>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sheetName" className="text-sm">Sheet Name</Label>
              <Input
                id="sheetName"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="Sheet1"
                className="max-w-xs"
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Convert Button */}
        <section>
          <Button
            onClick={convertToExcel}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              "Converting..."
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4" />
                Convert to Excel
              </>
            )}
          </Button>
        </section>

        {/* Info Section */}
        <section className="p-4 border rounded-md bg-muted/30">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Header row styling with blue background and white bold text</li>
                <li>Automatic column width adjustment based on content</li>
                <li>Custom sheet name support</li>
                <li>Full Excel .xlsx format compatibility</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
