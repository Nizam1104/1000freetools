"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, RotateCcw, FileSpreadsheet, Upload } from "lucide-react";

const BarcodeToCsv: React.FC = () => {
  const [barcodeData, setBarcodeData] = useState("");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [delimiter, setDelimiter] = useState(",");
  const [csvOutput, setCsvOutput] = useState("");
  const [generated, setGenerated] = useState(false);

  const sampleBarcodes = `123456789012
987654321098
456789012345
789012345678`;

  const handleConvert = useCallback(() => {
    if (!barcodeData.trim()) return;

    const lines = barcodeData.split("\n").map(l => l.trim()).filter(l => l);
    
    let csv = "";
    
    if (includeHeaders) {
      csv += `barcode_id${delimiter}barcode_value${delimiter}format${delimiter}timestamp\n`;
    }
    
    lines.forEach((barcode, index) => {
      const id = `BC${String(index + 1).padStart(6, "0")}`;
      const format = detectBarcodeFormat(barcode);
      const timestamp = new Date().toISOString();
      csv += `${id}${delimiter}${barcode}${delimiter}${format}${delimiter}${timestamp}\n`;
    });
    
    setCsvOutput(csv);
    setGenerated(true);
  }, [barcodeData, includeHeaders, delimiter]);

  const detectBarcodeFormat = (barcode: string): string => {
    const clean = barcode.replace(/[^0-9]/g, "");
    
    if (clean.length === 12) return "UPC-A";
    if (clean.length === 13) return "EAN-13";
    if (clean.length === 8) return "EAN-8";
    if (clean.length === 14) return "EAN-14";
    if (clean.length >= 7 && clean.length <= 12) return "UPC-E";
    if (barcode.length >= 1) return "Code 128";
    
    return "Unknown";
  };

  const handleClear = useCallback(() => {
    setBarcodeData("");
    setCsvOutput("");
    setGenerated(false);
  }, []);

  const handleCopy = useCallback(() => {
    if (csvOutput) {
      navigator.clipboard.writeText(csvOutput);
    }
  }, [csvOutput]);

  const handleDownload = useCallback(() => {
    if (!csvOutput) return;
    
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const link = document.createElement("a");
    link.download = "barcodes.csv";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [csvOutput]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setBarcodeData(content);
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Barcode to CSV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="barcodeData">Barcode Data (one per line)</Label>
              <Textarea
                id="barcodeData"
                value={barcodeData}
                onChange={(e) => setBarcodeData(e.target.value)}
                placeholder="Enter barcodes, one per line..."
                rows={10}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={() => setBarcodeData(sampleBarcodes)} 
                  variant="outline" 
                  size="sm"
                >
                  Load Sample
                </Button>
                <div className="relative">
                  <Input
                    type="file"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" size="sm" className="relative">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {barcodeData.split("\n").filter(l => l.trim()).length} barcodes entered
              </p>
            </div>

            <div className="space-y-2">
              <Label>CSV Options</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="includeHeaders"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="includeHeaders" className="font-normal text-sm">
                    Include header row
                  </Label>
                </div>

                <div>
                  <Label htmlFor="delimiter" className="text-xs">Delimiter</Label>
                  <select
                    id="delimiter"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value=",">Comma (,)</option>
                    <option value=";">Semicolon (;)</option>
                    <option value="|">Pipe (|)</option>
                    <option value="	">Tab</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Preview</Label>
                <Textarea
                  value={csvOutput || "CSV output will appear here..."}
                  readOnly
                  rows={10}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConvert} disabled={!barcodeData.trim()}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Convert to CSV
            </Button>
            <Button onClick={handleCopy} variant="outline" disabled={!generated}>
              <Copy className="w-4 h-4 mr-2" />
              Copy CSV
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!generated}>
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button onClick={handleClear} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {generated && (
            <div className="p-4 border rounded-lg bg-blue-50">
              <p className="text-sm font-semibold mb-2">Conversion Summary:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Total barcodes: {barcodeData.split("\n").filter(l => l.trim()).length}</li>
                <li>• Delimiter: {delimiter === "," ? "Comma" : delimiter === ";" ? "Semicolon" : delimiter === "|" ? "Pipe" : "Tab"}</li>
                <li>• Headers: {includeHeaders ? "Included" : "Not included"}</li>
                <li>• Columns: barcode_id, barcode_value, format, timestamp</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BarcodeToCsv;
