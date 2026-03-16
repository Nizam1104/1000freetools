"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";

export default function HexAsciiTableGenerator() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  const asciiTable = Array.from({ length: 128 }, (_, i) => {
    const hex = i.toString(16).toUpperCase().padStart(2, "0");
    const decimal = i;
    const octal = i.toString(8).padStart(3, "0");
    const binary = i.toString(2).padStart(8, "0");
    let char = String.fromCharCode(i);
    let description = "";
    
    if (i < 32) {
      const controlCodes: Record<number, string> = {
        0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK",
        7: "BEL", 8: "BS", 9: "TAB", 10: "LF", 11: "VT", 12: "FF", 13: "CR",
        14: "SO", 15: "SI", 16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3",
        20: "DC4", 21: "NAK", 22: "SYN", 23: "ETB", 24: "CAN", 25: "EM",
        26: "SUB", 27: "ESC", 28: "FS", 29: "GS", 30: "RS", 31: "US",
      };
      char = "";
      description = controlCodes[i] || "Control";
    } else if (i === 127) {
      char = "";
      description = "DEL";
    }
    
    return { hex, decimal, octal, binary, char, description };
  });

  const filteredTable = asciiTable.filter(
    (row) =>
      searchTerm === "" ||
      row.hex.includes(searchTerm.toUpperCase()) ||
      row.decimal.toString().includes(searchTerm) ||
      row.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = async () => {
    const text = filteredTable
      .map((row) => `${row.hex}\t${row.decimal}\t${row.octal}\t${row.binary}\t${row.char || row.description}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const headers = "Hex,Decimal,Octal,Binary,Character,Description\n";
    const rows = filteredTable
      .map((row) => `${row.hex},${row.decimal},${row.octal},${row.binary},"${row.char || ""}","${row.description}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-table.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hex to ASCII Table Generator</h2>
        <p className="text-sm text-muted-foreground">
          Complete reference table mapping hexadecimal values to ASCII characters
        </p>
      </div>

      <Card className="p-4">
        <div className="flex gap-4">
          <Input
            placeholder="Search by hex, decimal, character, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Table
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left font-semibold">Hex</th>
                <th className="p-2 text-left font-semibold">Decimal</th>
                <th className="p-2 text-left font-semibold">Octal</th>
                <th className="p-2 text-left font-semibold">Binary</th>
                <th className="p-2 text-left font-semibold">Char</th>
                <th className="p-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((row, i) => (
                <tr key={i} className="border-t hover:bg-muted/50">
                  <td className="p-2 font-mono">{row.hex}</td>
                  <td className="p-2 font-mono">{row.decimal}</td>
                  <td className="p-2 font-mono">{row.octal}</td>
                  <td className="p-2 font-mono">{row.binary}</td>
                  <td className="p-2 font-mono">{row.char || "—"}</td>
                  <td className="p-2 text-muted-foreground">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Quick Reference</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>0x30-0x39</span>
              <span className="text-muted-foreground">Digits 0-9</span>
            </div>
            <div className="flex justify-between">
              <span>0x41-0x5A</span>
              <span className="text-muted-foreground">Uppercase A-Z</span>
            </div>
            <div className="flex justify-between">
              <span>0x61-0x7A</span>
              <span className="text-muted-foreground">Lowercase a-z</span>
            </div>
            <div className="flex justify-between">
              <span>0x20</span>
              <span className="text-muted-foreground">Space</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
