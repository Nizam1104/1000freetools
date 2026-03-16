"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberPatternGenerator() {
  const [start, setStart] = useState("1");
  const [count, setCount] = useState("10");
  const [pattern, setPattern] = useState<"arithmetic" | "geometric" | "square" | "cube" | "fibonacci" | "prime" | "custom">("arithmetic");
  const [commonDiff, setCommonDiff] = useState("1");
  const [commonRatio, setCommonRatio] = useState("2");
  const [customRule, setCustomRule] = useState("n * 2");
  const [output, setOutput] = useState("");

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const generatePrimes = (count: number): number[] => {
    const primes: number[] = [];
    let num = 2;
    while (primes.length < count) {
      if (isPrime(num)) primes.push(num);
      num++;
    }
    return primes;
  };

  const generateFibonacci = (count: number): number[] => {
    const fib = [0, 1];
    for (let i = 2; i < count; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib.slice(0, count);
  };

  const handleGenerate = () => {
    const startNum = parseFloat(start);
    const countNum = parseInt(count);
    const diff = parseFloat(commonDiff);
    const ratio = parseFloat(commonRatio);

    if (isNaN(startNum) || isNaN(countNum) || countNum <= 0 || countNum > 1000) {
      setOutput("Error: Invalid input");
      return;
    }

    let numbers: number[] = [];

    switch (pattern) {
      case "arithmetic":
        numbers = Array.from({ length: countNum }, (_, i) => startNum + i * diff);
        break;
      case "geometric":
        numbers = Array.from({ length: countNum }, (_, i) => startNum * Math.pow(ratio, i));
        break;
      case "square":
        numbers = Array.from({ length: countNum }, (_, i) => Math.pow(startNum + i, 2));
        break;
      case "cube":
        numbers = Array.from({ length: countNum }, (_, i) => Math.pow(startNum + i, 3));
        break;
      case "fibonacci":
        numbers = generateFibonacci(countNum);
        break;
      case "prime":
        numbers = generatePrimes(countNum);
        break;
      case "custom":
        try {
          numbers = Array.from({ length: countNum }, (_, i) => {
            const n = startNum + i;
            // Safe evaluation of custom rule
            const rule = customRule.toLowerCase().replace(/n/g, `(${n})`);
            return Function(`"use strict"; return (${rule})`)();
          });
        } catch (e) {
          setOutput("Error: Invalid custom rule");
          return;
        }
        break;
    }

    // Format output
    const formatted = numbers.map((n) => {
      if (typeof n === "number" && !Number.isInteger(n)) {
        return n.toFixed(4).replace(/\.?0+$/, "");
      }
      return n.toString();
    });

    setOutput(formatted.join(", "));
  };

  const handleCopy = async () => {
    if (output && !output.startsWith("Error")) {
      await navigator.clipboard.writeText(output);
    }
  };

  const handleClear = () => {
    setStart("1");
    setCount("10");
    setOutput("");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Pattern Generator</h2>
        <p className="text-sm text-muted-foreground">
          Generate number sequences based on various patterns and rules
        </p>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {([
            { value: "arithmetic", label: "Arithmetic" },
            { value: "geometric", label: "Geometric" },
            { value: "square", label: "Square" },
            { value: "cube", label: "Cube" },
            { value: "fibonacci", label: "Fibonacci" },
            { value: "prime", label: "Prime" },
            { value: "custom", label: "Custom" },
          ] as const).map((p) => (
            <Button
              key={p.value}
              variant={pattern === p.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPattern(p.value)}
            >
              {p.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="start">Start Value</Label>
            <Input
              id="start"
              type="number"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="1"
              disabled={pattern === "fibonacci" || pattern === "prime"}
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="count">Count</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="10"
              className="font-mono"
            />
          </div>

          {pattern === "arithmetic" && (
            <div className="space-y-2">
              <Label htmlFor="diff">Common Difference</Label>
              <Input
                id="diff"
                type="number"
                value={commonDiff}
                onChange={(e) => setCommonDiff(e.target.value)}
                placeholder="1"
                className="font-mono"
              />
            </div>
          )}

          {pattern === "geometric" && (
            <div className="space-y-2">
              <Label htmlFor="ratio">Common Ratio</Label>
              <Input
                id="ratio"
                type="number"
                step="0.1"
                value={commonRatio}
                onChange={(e) => setCommonRatio(e.target.value)}
                placeholder="2"
                className="font-mono"
              />
            </div>
          )}

          {pattern === "custom" && (
            <div className="sm:col-span-3 space-y-2">
              <Label htmlFor="rule">Custom Rule (use 'n' for position)</Label>
              <Input
                id="rule"
                value={customRule}
                onChange={(e) => setCustomRule(e.target.value)}
                placeholder="n * 2 + 1"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">Examples: n * 2, n ** 2, n + 5, Math.sqrt(n)</p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleGenerate} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {output && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Label className="text-sm text-muted-foreground">Generated Sequence</Label>
              <div className="font-mono text-sm mt-2 break-all whitespace-pre-wrap">{output}</div>
            </div>
            {!output.startsWith("Error") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleCopy();
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Pattern Examples</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Arithmetic (diff=3)</div>
            <div className="font-mono text-sm">1, 4, 7, 10, 13...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Geometric (ratio=2)</div>
            <div className="font-mono text-sm">1, 2, 4, 8, 16...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Square Numbers</div>
            <div className="font-mono text-sm">1, 4, 9, 16, 25...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Fibonacci</div>
            <div className="font-mono text-sm">0, 1, 1, 2, 3, 5, 8...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Prime Numbers</div>
            <div className="font-mono text-sm">2, 3, 5, 7, 11, 13...</div>
          </div>
          <div className="bg-muted p-3 rounded">
            <div className="font-semibold">Custom (n * 2 + 1)</div>
            <div className="font-mono text-sm">3, 5, 7, 9, 11...</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
