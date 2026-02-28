"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RomanNumeralsConverter() {
  const [value, setValue] = useState<string>("");
  const [mode, setMode] = useState<"toRoman" | "fromRoman">("toRoman");
  const [result, setResult] = useState<string>("");

  const toRoman = (num: number): string => {
    const romanNumerals: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    
    let result = "";
    for (const [value, symbol] of romanNumerals) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (roman: string): number => {
    const romanValues: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    
    let result = 0;
    let prevValue = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
      const value = romanValues[roman[i].toUpperCase()];
      if (value < prevValue) {
        result -= value;
      } else {
        result += value;
      }
      prevValue = value;
    }
    
    return result;
  };

  const calculate = () => {
    if (mode === "toRoman") {
      const num = parseInt(value);
      if (!isNaN(num) && num > 0 && num < 4000) {
        setResult(toRoman(num));
      }
    } else {
      const num = fromRoman(value);
      if (num > 0) {
        setResult(num.toString());
      }
    }
  };

  const reset = () => {
    setValue("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Roman Numerals Converter</CardTitle>
          <CardDescription>Convert between Roman numerals and decimal numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "toRoman" ? "default" : "outline"}
                onClick={() => { setMode("toRoman"); setResult(""); }}
              >
                Decimal → Roman
              </Button>
              <Button
                variant={mode === "fromRoman" ? "default" : "outline"}
                onClick={() => { setMode("fromRoman"); setResult(""); }}
              >
                Roman → Decimal
              </Button>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {mode === "toRoman" ? "Decimal Number (1-3999)" : "Roman Numerals"}
              </label>
              <Input
                type={mode === "toRoman" ? "number" : "text"}
                placeholder={mode === "toRoman" ? "e.g., 2024" : "e.g., MMXXIV"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-2xl font-semibold">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
