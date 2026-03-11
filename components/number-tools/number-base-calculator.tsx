"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberBaseCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [base1, setBase1] = useState(10);
  const [base2, setBase2] = useState(10);
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply" | "divide">("add");
  const [result, setResult] = useState("");
  const [resultBase, setResultBase] = useState(10);

  const toDecimal = (num: string, base: number) => {
    return parseInt(num.replace(/[^0-9a-fA-F]/g, ""), base);
  };

  const fromDecimal = (num: number, base: number) => {
    if (num < 0) {
      return "-" + Math.abs(num).toString(base).toUpperCase();
    }
    return num.toString(base).toUpperCase();
  };

  const handleCalculate = () => {
    const n1 = toDecimal(num1, base1);
    const n2 = toDecimal(num2, base2);
    
    if (isNaN(n1) || isNaN(n2)) {
      setResult("Error: Invalid input");
      return;
    }
    
    let calcResult: number;
    switch (operation) {
      case "add":
        calcResult = n1 + n2;
        break;
      case "subtract":
        calcResult = n1 - n2;
        break;
      case "multiply":
        calcResult = n1 * n2;
        break;
      case "divide":
        if (n2 === 0) {
          setResult("Error: Division by zero");
          return;
        }
        calcResult = n1 / n2;
        break;
    }
    
    setResult(fromDecimal(calcResult, resultBase));
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Base Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Perform arithmetic on numbers in different bases (binary, octal, decimal, hexadecimal)
        </p>
      </div>

      <Card className="p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Result Base</Label>
            <div className="flex gap-2">
              {[2, 8, 10, 16].map((b) => (
                <Button
                  key={b}
                  variant={resultBase === b ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResultBase(b)}
                >
                  {b === 2 ? "Binary" : b === 8 ? "Octal" : b === 10 ? "Decimal" : "Hex"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex-1 min-w-[150px] space-y-2">
            <Label>First Number</Label>
            <Input
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder={base1 === 16 ? "1A3F" : base1 === 8 ? "377" : base1 === 2 ? "1010" : "100"}
              className="font-mono"
            />
            <div className="flex gap-2">
              {[2, 8, 10, 16].map((b) => (
                <Button
                  key={b}
                  variant={base1 === b ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBase1(b)}
                >
                  {b === 2 ? "Bin" : b === 8 ? "Oct" : b === 10 ? "Dec" : "Hex"}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-6">
            {(["add", "subtract", "multiply", "divide"] as const).map((op) => (
              <Button
                key={op}
                variant={operation === op ? "default" : "outline"}
                size="sm"
                onClick={() => setOperation(op)}
              >
                {op === "add" ? "+" : op === "subtract" ? "−" : op === "multiply" ? "×" : "÷"}
              </Button>
            ))}
          </div>

          <div className="flex-1 min-w-[150px] space-y-2">
            <Label>Second Number</Label>
            <Input
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder={base2 === 16 ? "00C1" : base2 === 8 ? "017" : base2 === 2 ? "1100" : "50"}
              className="font-mono"
            />
            <div className="flex gap-2">
              {[2, 8, 10, 16].map((b) => (
                <Button
                  key={b}
                  variant={base2 === b ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBase2(b)}
                >
                  {b === 2 ? "Bin" : b === 8 ? "Oct" : b === 10 ? "Dec" : "Hex"}
                </Button>
              ))}
            </div>
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
            <Label className="text-sm text-muted-foreground">Result ({resultBase === 2 ? "Binary" : resultBase === 8 ? "Octal" : resultBase === 10 ? "Decimal" : "Hexadecimal"})</Label>
            <div className="text-3xl font-mono font-bold mt-2">{result}</div>
          </Card>
        )}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>Binary: 1010 + 0101 = 1111</div>
            <div className="text-muted-foreground">(10 + 5 = 15)</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>Hex: 1A + 0F = 29</div>
            <div className="text-muted-foreground">(26 + 15 = 41)</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>Octal: 10 × 10 = 100</div>
            <div className="text-muted-foreground">(8 × 8 = 64)</div>
          </div>
          <div className="bg-muted p-3 rounded font-mono text-sm">
            <div>Hex: FF − 01 = FE</div>
            <div className="text-muted-foreground">(255 − 1 = 254)</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
