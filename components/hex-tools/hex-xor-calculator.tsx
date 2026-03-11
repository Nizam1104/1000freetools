"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft, Calculator } from "lucide-react";

export default function HexXorCalculator() {
  const [hex1, setHex1] = useState("");
  const [hex2, setHex2] = useState("");
  const [result, setResult] = useState("");
  const [showDecimal, setShowDecimal] = useState(false);
  const [showBinary, setShowBinary] = useState(false);

  const hexToBytes = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
    const bytes = [];
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes.push(parseInt(cleanHex.substr(i, 2), 16));
    }
    return bytes;
  };

  const bytesToHex = (bytes: number[]) => {
    return bytes.map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join("");
  };

  const xorHex = (h1: string, h2: string) => {
    const bytes1 = hexToBytes(h1);
    const bytes2 = hexToBytes(h2);
    
    // Pad shorter array with zeros
    const maxLength = Math.max(bytes1.length, bytes2.length);
    while (bytes1.length < maxLength) bytes1.push(0);
    while (bytes2.length < maxLength) bytes2.push(0);
    
    const result = bytes1.map((b, i) => b ^ bytes2[i]);
    return result;
  };

  const handleCalculate = () => {
    const resultBytes = xorHex(hex1, hex2);
    const hexResult = bytesToHex(resultBytes);
    
    if (showBinary || showDecimal) {
      let output = hexResult;
      if (showDecimal) {
        const decimalResult = resultBytes.map((b) => b.toString()).join(" ");
        output += ` (Decimal: ${decimalResult})`;
      }
      if (showBinary) {
        const binaryResult = resultBytes.map((b) => b.toString(2).padStart(8, "0")).join(" ");
        output += ` (Binary: ${binaryResult})`;
      }
      setResult(output);
    } else {
      setResult(hexResult);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.split(" ")[0]);
    }
  };

  const handleClear = () => {
    setHex1("");
    setHex2("");
    setResult("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hex XOR Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Perform bitwise XOR operations on hexadecimal strings
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showDecimal"
              checked={showDecimal}
              onChange={(e) => setShowDecimal(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="showDecimal" className="text-sm">Show decimal</Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showBinary"
              checked={showBinary}
              onChange={(e) => setShowBinary(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="showBinary" className="text-sm">Show binary</Label>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label htmlFor="hex1">First Hex Value</Label>
            <Input
              id="hex1"
              value={hex1}
              onChange={(e) => setHex1(e.target.value)}
              placeholder="1A2B3C"
              className="font-mono"
            />
          </div>
          
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted font-mono font-bold">
            ⊕
          </div>
          
          <div className="flex-1">
            <Label htmlFor="hex2">Second Hex Value</Label>
            <Input
              id="hex2"
              value={hex2}
              onChange={(e) => setHex2(e.target.value)}
              placeholder="0F0F0F"
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            XOR
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">XOR Result</Label>
                <div className="text-2xl font-mono font-bold">{result}</div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(result.split(" ")[0]);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">XOR Truth Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Bit A</th>
                <th className="p-2 text-left">Bit B</th>
                <th className="p-2 text-left">A XOR B</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono">0</td>
                <td className="p-2 font-mono">0</td>
                <td className="p-2 font-mono">0</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">0</td>
                <td className="p-2 font-mono">1</td>
                <td className="p-2 font-mono">1</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono">1</td>
                <td className="p-2 font-mono">0</td>
                <td className="p-2 font-mono">1</td>
              </tr>
              <tr>
                <td className="p-2 font-mono">1</td>
                <td className="p-2 font-mono">1</td>
                <td className="p-2 font-mono">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
