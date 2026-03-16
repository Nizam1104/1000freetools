"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberFactorialCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [mode, setMode] = useState<"factorial" | "doubleFactorial" | "permutation" | "combination">("factorial");
  const [n2, setN2] = useState("");

  const calculateFactorial = (n: number): bigint => {
    if (n < 0) return BigInt(-1);
    if (n === 0 || n === 1) return BigInt(1);
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result;
  };

  const calculateDoubleFactorial = (n: number): bigint => {
    if (n < 0) return BigInt(-1);
    if (n === 0 || n === 1) return BigInt(1);
    let result = BigInt(n);
    for (let i = n - 2; i > 0; i -= 2) {
      result *= BigInt(i);
    }
    return result;
  };

  const calculatePermutation = (n: number, r: number): bigint => {
    if (n < 0 || r < 0 || r > n) return BigInt(-1);
    return calculateFactorial(n) / calculateFactorial(n - r);
  };

  const calculateCombination = (n: number, r: number): bigint => {
    if (n < 0 || r < 0 || r > n) return BigInt(-1);
    return calculatePermutation(n, r) / calculateFactorial(r);
  };

  const handleCalculate = () => {
    const n = parseInt(input);
    
    if (isNaN(n) || n < 0) {
      setResult("Error: Please enter a non-negative integer");
      return;
    }
    
    if (n > 1000) {
      setResult("Error: Number too large (max 1000)");
      return;
    }

    let calcResult: bigint;
    let formula = "";
    
    switch (mode) {
      case "factorial":
        calcResult = calculateFactorial(n);
        formula = `${n}!`;
        break;
      case "doubleFactorial":
        calcResult = calculateDoubleFactorial(n);
        formula = `${n}!!`;
        break;
      case "permutation":
        const r1 = parseInt(n2);
        if (isNaN(r1)) {
          setResult("Error: Please enter r value");
          return;
        }
        calcResult = calculatePermutation(n, r1);
        formula = `P(${n}, ${r1})`;
        break;
      case "combination":
        const r2 = parseInt(n2);
        if (isNaN(r2)) {
          setResult("Error: Please enter r value");
          return;
        }
        calcResult = calculateCombination(n, r2);
        formula = `C(${n}, ${r2})`;
        break;
    }

    if (calcResult === BigInt(-1)) {
      setResult("Error: Invalid input");
    } else {
      setResult(`${formula} = ${calcResult.toString()}`);
    }
  };

  const handleCopy = async () => {
    if (result && !result.startsWith("Error")) {
      await navigator.clipboard.writeText(result.split(" = ")[1] || result);
    }
  };

  const handleClear = () => {
    setInput("");
    setN2("");
    setResult("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Factorial Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate factorial, double factorial, permutations, and combinations
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {([
            { value: "factorial", label: "n!", desc: "Factorial" },
            { value: "doubleFactorial", label: "n!!", desc: "Double Factorial" },
            { value: "permutation", label: "P(n,r)", desc: "Permutation" },
            { value: "combination", label: "C(n,r)", desc: "Combination" },
          ] as const).map((m) => (
            <Button
              key={m.value}
              variant={mode === m.value ? "default" : "outline"}
              size="sm"
              onClick={() => setMode(m.value as typeof mode)}
              title={m.desc}
            >
              {m.label}
            </Button>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="n">n</Label>
            <Input
              id="n"
              type="number"
              min="0"
              max="1000"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="5"
              className="font-mono"
            />
          </div>
          
          {(mode === "permutation" || mode === "combination") && (
            <div className="space-y-2">
              <Label htmlFor="r">r</Label>
              <Input
                id="r"
                type="number"
                min="0"
                value={n2}
                onChange={(e) => setN2(e.target.value)}
                placeholder="3"
                className="font-mono"
              />
            </div>
          )}
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
                <div className="text-xl font-mono font-bold mt-1 break-all">{result}</div>
              </div>
              {!result.startsWith("Error") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleCopy();
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
        <h3 className="font-semibold mb-3">Formulas</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded">
            <div className="font-mono font-bold">n! = n × (n-1) × ... × 1</div>
            <div className="text-sm text-muted-foreground mt-1">5! = 5 × 4 × 3 × 2 × 1 = 120</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-mono font-bold">n!! = n × (n-2) × (n-4) × ...</div>
            <div className="text-sm text-muted-foreground mt-1">5!! = 5 × 3 × 1 = 15</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-mono font-bold">P(n,r) = n! / (n-r)!</div>
            <div className="text-sm text-muted-foreground mt-1">P(5,3) = 5! / 2! = 60</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-mono font-bold">C(n,r) = n! / (r! × (n-r)!)</div>
            <div className="text-sm text-muted-foreground mt-1">C(5,3) = 5! / (3! × 2!) = 10</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
