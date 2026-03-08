"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, Download, Copy, Check, FileSpreadsheet, Combine, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { parseCSVIntelligently, copyToClipboard, CSVRow, exportCSVData, joinCsv } from "./csv-utils";

type JoinType = "inner" | "left" | "right" | "full";

export default function CsvJoinMerge() {
  const [leftInput, setLeftInput] = useState<string>("");
  const [rightInput, setRightInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [leftHeaders, setLeftHeaders] = useState<string[]>([]);
  const [rightHeaders, setRightHeaders] = useState<string[]>([]);
  const [leftKeyColumn, setLeftKeyColumn] = useState<string>("");
  const [rightKeyColumn, setRightKeyColumn] = useState<string>("");
  const [joinType, setJoinType] = useState<JoinType>("inner");
  const [leftPrefix, setLeftPrefix] = useState<string>("");
  const [rightPrefix, setRightPrefix] = useState<string>("right_");
  const [addPrefixToRight, setAddPrefixToRight] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeFileInput, setActiveFileInput] = useState<"left" | "right" | null>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, side: "left" | "right") => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        if (side === "left") {
          setLeftInput(text);
          const { headers: parsedHeaders } = parseCSVIntelligently(text);
          setLeftHeaders(parsedHeaders);
          if (parsedHeaders.length > 0 && !leftKeyColumn) {
            setLeftKeyColumn(parsedHeaders[0]);
          }
        } else {
          setRightInput(text);
          const { headers: parsedHeaders } = parseCSVIntelligently(text);
          setRightHeaders(parsedHeaders);
          if (parsedHeaders.length > 0 && !rightKeyColumn) {
            setRightKeyColumn(parsedHeaders[0]);
          }
        }
        toast.success(`Loaded file: ${file.name}`);
      } catch (error) {
        toast.error("Failed to read file");
      }
    },
    [leftKeyColumn, rightKeyColumn]
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>, side: "left" | "right") => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".csv")) {
      file.text().then((text) => {
        if (side === "left") {
          setLeftInput(text);
          const { headers: parsedHeaders } = parseCSVIntelligently(text);
          setLeftHeaders(parsedHeaders);
          if (parsedHeaders.length > 0) {
            setLeftKeyColumn(parsedHeaders[0]);
          }
        } else {
          setRightInput(text);
          const { headers: parsedHeaders } = parseCSVIntelligently(text);
          setRightHeaders(parsedHeaders);
          if (parsedHeaders.length > 0) {
            setRightKeyColumn(parsedHeaders[0]);
          }
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

  const performJoin = useCallback(() => {
    if (!leftInput.trim()) {
      toast.error("Please enter or upload left CSV data");
      return;
    }

    if (!rightInput.trim()) {
      toast.error("Please enter or upload right CSV data");
      return;
    }

    if (!leftKeyColumn) {
      toast.error("Please select a key column from left CSV");
      return;
    }

    if (!rightKeyColumn) {
      toast.error("Please select a key column from right CSV");
      return;
    }

    setIsProcessing(true);

    try {
      const { data: leftData } = parseCSVIntelligently(leftInput);
      const { data: rightData } = parseCSVIntelligently(rightInput);

      const { data: joinedData, headers: joinedHeaders } = joinCsv(
        leftData,
        leftKeyColumn,
        rightData,
        rightKeyColumn,
        joinType,
        {
          leftPrefix,
          rightPrefix: addPrefixToRight ? rightPrefix : "",
        }
      );

      const csvOutput = [joinedHeaders.join(","), ...joinedData.map((row) => joinedHeaders.map((h) => {
        const val = String(row[h] || "");
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","))].join("\n");

      setOutput(csvOutput);
      toast.success(`Joined ${leftData.length} left rows with ${rightData.length} right rows = ${joinedData.length} result rows`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Join operation failed");
    } finally {
      setIsProcessing(false);
    }
  }, [leftInput, rightInput, leftKeyColumn, rightKeyColumn, joinType, leftPrefix, rightPrefix, addPrefixToRight]);

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
      exportCSVData(data, "joined.csv");
      toast.success("Downloaded CSV file");
    } catch (error) {
      toast.error("Failed to download");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setLeftInput("");
    setRightInput("");
    setOutput("");
    setLeftHeaders([]);
    setRightHeaders([]);
    setLeftKeyColumn("");
    setRightKeyColumn("");
  }, []);

  const getJoinDescription = () => {
    switch (joinType) {
      case "inner":
        return "Returns only rows with matching keys in both tables";
      case "left":
        return "Returns all left rows, with matching right rows (or nulls)";
      case "right":
        return "Returns all right rows, with matching left rows (or nulls)";
      case "full":
        return "Returns all rows from both tables, with nulls where no match";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">CSV Join Merge</h1>
        <p className="text-muted-foreground">
          SQL-style joins (inner, left, right, full outer) on two CSV files using key column
        </p>
      </div>

      <div className="space-y-6">
        {/* Two-column Input Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base">CSV Inputs</Label>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Input */}
            <div>
              <Label className="text-sm mb-2 block font-medium">Left Table (Primary)</Label>
              <div
                onDrop={(e) => handleDrop(e, "left")}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-border rounded-md p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer mb-2"
                onClick={() => document.getElementById("left-file-input")?.click()}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <FileSpreadsheet className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Drop CSV file or click to browse
                  </p>
                </div>
                <input
                  id="left-file-input"
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, "left")}
                  className="hidden"
                />
              </div>

              <Textarea
                value={leftInput}
                onChange={(e) => {
                  setLeftInput(e.target.value);
                  const { headers: parsedHeaders } = parseCSVIntelligently(e.target.value);
                  setLeftHeaders(parsedHeaders);
                  if (parsedHeaders.length > 0 && !leftKeyColumn) {
                    setLeftKeyColumn(parsedHeaders[0]);
                  }
                }}
                placeholder="Paste left CSV data here...&#10;id,name,department&#10;1,John,Sales&#10;2,Jane,Marketing"
                className="min-h-[200px] font-mono text-sm"
              />

              {leftHeaders.length > 0 && (
                <div className="mt-2">
                  <Label htmlFor="left-key" className="text-xs mb-1 block">
                    Key Column (Left)
                  </Label>
                  <Select value={leftKeyColumn} onValueChange={setLeftKeyColumn}>
                    <SelectTrigger id="left-key" className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {leftHeaders.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Right Input */}
            <div>
              <Label className="text-sm mb-2 block font-medium">Right Table (Lookup)</Label>
              <div
                onDrop={(e) => handleDrop(e, "right")}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-border rounded-md p-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer mb-2"
                onClick={() => document.getElementById("right-file-input")?.click()}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <FileSpreadsheet className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Drop CSV file or click to browse
                  </p>
                </div>
                <input
                  id="right-file-input"
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, "right")}
                  className="hidden"
                />
              </div>

              <Textarea
                value={rightInput}
                onChange={(e) => {
                  setRightInput(e.target.value);
                  const { headers: parsedHeaders } = parseCSVIntelligently(e.target.value);
                  setRightHeaders(parsedHeaders);
                  if (parsedHeaders.length > 0 && !rightKeyColumn) {
                    setRightKeyColumn(parsedHeaders[0]);
                  }
                }}
                placeholder="Paste right CSV data here...&#10;id,manager,location&#10;1,Alice,New York&#10;2,Bob,Los Angeles"
                className="min-h-[200px] font-mono text-sm"
              />

              {rightHeaders.length > 0 && (
                <div className="mt-2">
                  <Label htmlFor="right-key" className="text-xs mb-1 block">
                    Key Column (Right)
                  </Label>
                  <Select value={rightKeyColumn} onValueChange={setRightKeyColumn}>
                    <SelectTrigger id="right-key" className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rightHeaders.map((header) => (
                        <SelectItem key={header} value={header}>
                          {header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </section>

        {(leftHeaders.length > 0 || rightHeaders.length > 0) && (
          <>
            <Separator />

            {/* Join Configuration Section */}
            <section>
              <Label className="text-base mb-3 block">Join Configuration</Label>

              <div className="space-y-4">
                {/* Join Type */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">Join Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      variant={joinType === "inner" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setJoinType("inner")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">Inner Join</span>
                      <span className="text-xs text-muted-foreground mt-1">Matches only</span>
                    </Button>
                    <Button
                      variant={joinType === "left" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setJoinType("left")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">Left Join</span>
                      <span className="text-xs text-muted-foreground mt-1">All left + matches</span>
                    </Button>
                    <Button
                      variant={joinType === "right" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setJoinType("right")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">Right Join</span>
                      <span className="text-xs text-muted-foreground mt-1">All right + matches</span>
                    </Button>
                    <Button
                      variant={joinType === "full" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setJoinType("full")}
                      className="flex flex-col h-auto py-3"
                    >
                      <span className="font-medium">Full Outer</span>
                      <span className="text-xs text-muted-foreground mt-1">All rows</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{getJoinDescription()}</p>
                </div>

                {/* Column Prefixes */}
                <div className="p-4 border rounded-md">
                  <Label className="text-sm mb-3 block">Column Prefixes (to avoid name conflicts)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="left-prefix" className="text-xs mb-1 block">
                        Left Column Prefix (optional)
                      </Label>
                      <Input
                        id="left-prefix"
                        value={leftPrefix}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeftPrefix(e.target.value)}
                        placeholder="e.g., left_"
                        className="h-9"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Checkbox
                          id="add-prefix"
                          checked={addPrefixToRight}
                          onCheckedChange={(checked) => setAddPrefixToRight(checked as boolean)}
                        />
                        <Label htmlFor="add-prefix" className="text-xs cursor-pointer">
                          Add prefix to right columns
                        </Label>
                      </div>
                      <Input
                        id="right-prefix"
                        value={rightPrefix}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRightPrefix(e.target.value)}
                        placeholder="e.g., right_"
                        className="h-9"
                        disabled={!addPrefixToRight}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Join Visualization */}
            <section>
              <Label className="text-base mb-3 block">Join Preview</Label>
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-sm font-medium">Left Table</p>
                    <p className="text-xs text-muted-foreground">
                      {leftHeaders.length > 0 ? `${leftHeaders.length} columns` : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Key: <span className="font-mono">{leftKeyColumn || "-"}</span>
                    </p>
                  </div>
                  <ArrowLeftRight className="w-6 h-6 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">{joinType.toUpperCase()} JOIN</p>
                    <p className="text-xs text-muted-foreground">on</p>
                  </div>
                  <ArrowLeftRight className="w-6 h-6 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Right Table</p>
                    <p className="text-xs text-muted-foreground">
                      {rightHeaders.length > 0 ? `${rightHeaders.length} columns` : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Key: <span className="font-mono">{rightKeyColumn || "-"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Join Button */}
            <section>
              <Button
                onClick={performJoin}
                disabled={isProcessing || !leftKeyColumn || !rightKeyColumn}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  "Joining..."
                ) : (
                  <>
                    <Combine className="w-4 h-4" />
                    Perform {joinType.charAt(0).toUpperCase() + joinType.slice(1)} Join
                  </>
                )}
              </Button>
            </section>

            {/* Output Section */}
            {output && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-base">Joined Output</Label>
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
        {leftHeaders.length === 0 && rightHeaders.length === 0 && (
          <section className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-start gap-3">
              <Combine className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">How CSV Join Works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload or paste two CSV files to join</li>
                  <li>Select the key column from each table for matching</li>
                  <li>Choose join type: Inner, Left, Right, or Full Outer</li>
                  <li>Configure column prefixes to avoid naming conflicts</li>
                  <li>Click "Perform Join" to generate the merged result</li>
                  <li>Similar to SQL JOIN operations on database tables</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
