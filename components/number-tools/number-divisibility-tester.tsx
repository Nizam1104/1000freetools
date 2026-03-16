"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy, Check, RotateCcw, ArrowRightLeft } from "lucide-react";

export default function NumberDivisibilityTester() {
  const [number, setNumber] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<{ divisible: boolean; remainder: number; allDivisors?: number[] } | null>(null);
  const [testAll, setTestAll] = useState(false);

  const checkDivisibility = (num: number, div: number) => {
    return num % div === 0;
  };

  const getAllDivisors = (num: number): number[] => {
    const divisors: number[] = [];
    const absNum = Math.abs(num);
    for (let i = 1; i <= Math.sqrt(absNum); i++) {
      if (absNum % i === 0) {
        divisors.push(i);
        if (i !== absNum / i) {
          divisors.push(absNum / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  };

  const handleTest = () => {
    const num = parseInt(number);
    const div = parseInt(divisor);

    if (isNaN(num)) {
      setResult(null);
      return;
    }

    if (testAll) {
      setResult({
        divisible: true,
        remainder: 0,
        allDivisors: getAllDivisors(num),
      });
    } else {
      if (isNaN(div) || div === 0) {
        setResult(null);
        return;
      }
      setResult({
        divisible: checkDivisibility(num, div),
        remainder: num % div,
      });
    }
  };

  const handleClear = () => {
    setNumber("");
    setDivisor("");
    setResult(null);
  };

  const divisibilityRules: Record<number, string> = {
    2: "Last digit is even (0, 2, 4, 6, 8)",
    3: "Sum of digits is divisible by 3",
    4: "Last two digits form a number divisible by 4",
    5: "Last digit is 0 or 5",
    6: "Divisible by both 2 and 3",
    7: "Double the last digit, subtract from rest; result divisible by 7",
    8: "Last three digits form a number divisible by 8",
    9: "Sum of digits is divisible by 9",
    10: "Last digit is 0",
    11: "Alternating sum of digits is divisible by 11",
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Number Divisibility Tester</h2>
        <p className="text-sm text-muted-foreground">
          Test if a number is divisible by another number
        </p>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="testAll"
            checked={testAll}
            onChange={(e) => setTestAll(e.target.checked)}
            className="h-4 w-4"
          />
          <Label htmlFor="testAll" className="text-sm">
            Test all divisors (find all factors)
          </Label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 items-end">
          <div className="space-y-2">
            <Label htmlFor="number">Number to Test</Label>
            <Input
              id="number"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="100"
              className="font-mono"
            />
          </div>

          {!testAll && (
            <div className="space-y-2">
              <Label htmlFor="divisor">Divisor</Label>
              <Input
                id="divisor"
                type="number"
                value={divisor}
                onChange={(e) => setDivisor(e.target.value)}
                placeholder="5"
                className="font-mono"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <Button onClick={handleTest} className="w-full">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Test Divisibility
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={handleTest} className="flex-1">
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Test
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          {!testAll ? (
            <Card className={`p-4 ${result.divisible ? "border-green-500" : "border-yellow-500"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${result.divisible ? "bg-green-500" : "bg-yellow-500"}`} />
                <div>
                  <div className="font-semibold text-lg">
                    {result.divisible ? "Divisible!" : "Not Divisible"}
                  </div>
                  <div className="text-muted-foreground">
                    {number} ÷ {divisor} = {Math.floor(parseInt(number) / parseInt(divisor))} remainder {result.remainder}
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4">
              <div className="mb-3">
                <div className="font-semibold">All Divisors of {number}</div>
                <div className="text-muted-foreground">
                  {result.allDivisors?.length} divisors found
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.allDivisors?.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1 bg-muted rounded-full font-mono text-sm"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Divisibility Rules</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.entries(divisibilityRules).map(([div, rule]) => (
            <div key={div} className="bg-muted p-3 rounded">
              <div className="font-semibold">Divisible by {div}</div>
              <div className="text-sm text-muted-foreground">{rule}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
