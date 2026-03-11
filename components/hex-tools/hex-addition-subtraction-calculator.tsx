"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function HexAdditionSubtractionCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState("");
  const [showDecimal, setShowDecimal] = useState(false);

  const hexToDecimal = (hex: string) => {
    const cleanHex = hex.replace(/[^0-9a-fA-FxX]/g, "");
    return parseInt(cleanHex, 16);
  };

  const decimalToHex = (num: number) => {
    if (num < 0) {
      return "-" + Math.abs(num).toString(16).toUpperCase();
    }
    return num.toString(16).toUpperCase();
  };

  const handleCalculate = () => {
    const n1 = hexToDecimal(num1);
    const n2 = hexToDecimal(num2);
    
    if (isNaN(n1) || isNaN(n2)) {
      setResult("Error: Invalid hexadecimal input");
      return;
    }
    
    const calcResult = operation === "add" ? n1 + n2 : n1 - n2;
    const hexResult = decimalToHex(calcResult);
    
    if (showDecimal) {
      setResult(`${hexResult} (Decimal: ${calcResult})`);
    } else {
      setResult(hexResult);
    }
  };

  const handleCopy = async () => {
    if (result && !result.startsWith("Error")) {
      await navigator.clipboard.writeText(result.split(" ")[0]);
    }
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hex Addition & Subtraction Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Perform arithmetic operations on hexadecimal numbers
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showDecimal"
              checked={showDecimal}
              onChange={(e) => setShowDecimal(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="showDecimal" className="text-sm">Show decimal equivalent</Label>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label htmlFor="num1">First Hex Number</Label>
            <Input
              id="num1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="1A3F"
              className="font-mono"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={operation === "add" ? "default" : "outline"}
              onClick={() => setOperation("add")}
            >
              +
            </Button>
            <Button
              variant={operation === "subtract" ? "default" : "outline"}
              onClick={() => setOperation("subtract")}
            >
              −
            </Button>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="num2">Second Hex Number</Label>
            <Input
              id="num2"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="00C1"
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Calculate
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-sm text-muted-foreground">Result</Label>
                <div className="text-2xl font-mono font-bold">{result}</div>
              </div>
              {!result.startsWith("Error") && (
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
              )}
            </div>
          </Card>
        )}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>1A + 0F = 29</div>
            <div className="text-muted-foreground">(26 + 15 = 41)</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>FF - 01 = FE</div>
            <div className="text-muted-foreground">(255 - 1 = 254)</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>100 + 1 = 101</div>
            <div className="text-muted-foreground">(256 + 1 = 257)</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>0A - 0F = -5</div>
            <div className="text-muted-foreground">(10 - 15 = -5)</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
