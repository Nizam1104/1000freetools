"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { validateCsv, parseCSVIntelligently } from "./csv-utils";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    rowCount: number;
    columnCount: number;
    emptyRows: number;
    inconsistentRows: number;
  };
}

export default function CsvValidator() {
  const [inputText, setInputText] = useState<string>("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
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

  const validateCsvData = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter or upload CSV data");
      return;
    }

    setIsProcessing(true);

    try {
      const result = validateCsv(inputText);
      setValidationResult(result);
      
      if (result.isValid) {
        toast.success("CSV validation passed!");
      } else {
        toast.error(`Validation failed with ${result.errors.length} error(s)`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Validation failed");
    } finally {
      setIsProcessing(false);
    }
  }, [inputText]);

  const clearAll = useCallback(() => {
    setInputText("");
    setValidationResult(null);
  }, []);

  const detectEncodingIssues = useCallback((text: string): string[] => {
    const issues: string[] = [];
    
    // Check for BOM
    if (text.startsWith("\uFEFF")) {
      issues.push("File contains BOM (Byte Order Mark)");
    }
    
    // Check for mixed line endings
    const crlfCount = (text.match(/\r\n/g) || []).length;
    const lfCount = (text.match(/\n/g) || []).length - crlfCount;
    const crCount = (text.match(/\r(?!\n)/g) || []).length;
    
    if (crlfCount > 0 && lfCount > 0) {
      issues.push("Mixed line endings detected (CRLF and LF)");
    }
    if (crCount > 0) {
      issues.push("Contains old Mac-style CR line endings");
    }
    
    // Check for non-UTF8 characters
    const nonAsciiCount = (text.match(/[^\x00-\x7F]/g) || []).length;
    if (nonAsciiCount > 0) {
      issues.push(`Contains ${nonAsciiCount} non-ASCII character(s) - verify encoding`);
    }
    
    // Check for null bytes
    if (text.includes("\0")) {
      issues.push("Contains null bytes - possible encoding corruption");
    }
    
    return issues;
  }, []);

  const analyzeDataTypes = useCallback((text: string): Array<{ column: string; detectedType: string; confidence: number }> => {
    try {
      const { data, headers } = parseCSVIntelligently(text);
      
      if (data.length === 0) return [];
      
      return headers.map((header) => {
        const values = data.map((row) => String(row[header] || ""));
        const nonEmptyValues = values.filter((v) => v.trim() !== "");
        
        if (nonEmptyValues.length === 0) {
          return { column: header, detectedType: "empty", confidence: 100 };
        }
        
        // Check for boolean
        const boolCount = nonEmptyValues.filter((v) => 
          v.toLowerCase() === "true" || v.toLowerCase() === "false" || v === "1" || v === "0"
        ).length;
        if (boolCount / nonEmptyValues.length > 0.8) {
          return { column: header, detectedType: "boolean", confidence: Math.round((boolCount / nonEmptyValues.length) * 100) };
        }
        
        // Check for numeric
        const numCount = nonEmptyValues.filter((v) => !isNaN(Number(v)) && v.trim() !== "").length;
        if (numCount / nonEmptyValues.length > 0.8) {
          return { column: header, detectedType: "numeric", confidence: Math.round((numCount / nonEmptyValues.length) * 100) };
        }
        
        // Check for date patterns
        const datePatterns = [
          /^\d{4}-\d{2}-\d{2}$/,
          /^\d{2}\/\d{2}\/\d{4}$/,
          /^\d{2}-\d{2}-\d{4}$/,
          /^[A-Za-z]{3} \d{1,2}, \d{4}$/,
        ];
        const dateCount = nonEmptyValues.filter((v) => 
          datePatterns.some((pattern) => pattern.test(v))
        ).length;
        if (dateCount / nonEmptyValues.length > 0.8) {
          return { column: header, detectedType: "date", confidence: Math.round((dateCount / nonEmptyValues.length) * 100) };
        }
        
        // Check for email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailCount = nonEmptyValues.filter((v) => emailPattern.test(v)).length;
        if (emailCount / nonEmptyValues.length > 0.8) {
          return { column: header, detectedType: "email", confidence: Math.round((emailCount / nonEmptyValues.length) * 100) };
        }
        
        return { column: header, detectedType: "text", confidence: 100 };
      });
    } catch {
      return [];
    }
  }, []);

  const encodingIssues = inputText ? detectEncodingIssues(inputText) : [];
  const dataTypes = inputText ? analyzeDataTypes(inputText) : [];

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
            placeholder="Paste CSV data here...&#10;name,age,email&#10;John,30,john@example.com&#10;Jane,25,jane@example.com"
            className="mt-3 min-h-[200px] font-mono text-sm"
          />
        </section>

        <Separator />

        {/* Validate Button */}
        <section>
          <Button
            onClick={validateCsvData}
            disabled={isProcessing || !inputText.trim()}
            className="w-full"
            size="lg"
          >
            {isProcessing ? "Validating..." : "Validate CSV"}
          </Button>
        </section>

        {/* Results Section */}
        {validationResult && (
          <>
            {/* Overall Status */}
            <section>
              <div className={`flex items-center gap-3 p-4 rounded-md ${
                validationResult.isValid 
                  ? "bg-green-500/10 text-green-600 dark:text-green-400" 
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}>
                {validationResult.isValid ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
                <div>
                  <p className="font-medium">
                    {validationResult.isValid ? "CSV is Valid" : "CSV Validation Failed"}
                  </p>
                  <p className="text-sm opacity-80">
                    {validationResult.isValid 
                      ? "No structural issues detected" 
                      : `${validationResult.errors.length} error(s) found`}
                  </p>
                </div>
              </div>
            </section>

            {/* Statistics */}
            <section>
              <Label className="text-base mb-3 block">Statistics</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{validationResult.stats.rowCount}</p>
                  <p className="text-xs text-muted-foreground">Total Rows</p>
                </div>
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{validationResult.stats.columnCount}</p>
                  <p className="text-xs text-muted-foreground">Columns</p>
                </div>
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{validationResult.stats.emptyRows}</p>
                  <p className="text-xs text-muted-foreground">Empty Rows</p>
                </div>
                <div className="p-3 border rounded-md">
                  <p className="text-2xl font-semibold">{validationResult.stats.inconsistentRows}</p>
                  <p className="text-xs text-muted-foreground">Inconsistent Rows</p>
                </div>
              </div>
            </section>

            {/* Encoding Issues */}
            {encodingIssues.length > 0 && (
              <section>
                <Label className="text-base mb-3 block">Encoding Issues</Label>
                <div className="p-4 border rounded-md bg-amber-500/10">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <ul className="space-y-1">
                      {encodingIssues.map((issue, index) => (
                        <li key={index} className="text-sm text-amber-800 dark:text-amber-200">
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Data Type Detection */}
            {dataTypes.length > 0 && (
              <section>
                <Label className="text-base mb-3 block">Detected Data Types</Label>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Column</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTypes.map((dt, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-mono">{dt.column}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-muted rounded text-xs">
                              {dt.detectedType}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${dt.confidence}%` }}
                                />
                              </div>
                              <span className="text-xs">{dt.confidence}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Errors */}
            {validationResult.errors.length > 0 && (
              <section>
                <Label className="text-base mb-3 block">Errors</Label>
                <div className="p-4 border rounded-md bg-red-500/10">
                  <ul className="space-y-2">
                    {validationResult.errors.map((error, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-200">
                        <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Warnings */}
            {validationResult.warnings.length > 0 && (
              <section>
                <Label className="text-base mb-3 block">Warnings</Label>
                <div className="p-4 border rounded-md bg-amber-500/10">
                  <ul className="space-y-2">
                    {validationResult.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </>
        )}

        {/* Info Section */}
        {!validationResult && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">What this validator checks:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Column count consistency across all rows</li>
                  <li>Empty or blank rows</li>
                  <li>Encoding issues (BOM, mixed line endings, non-ASCII characters)</li>
                  <li>Data type detection for each column</li>
                  <li>CSV parsing errors</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
