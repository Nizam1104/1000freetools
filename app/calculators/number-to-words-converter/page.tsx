"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NumberToWordsConverter() {
  const [number, setNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const ones: string[] = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens: string[] = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens: string[] = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const convertHundreds = (num: number): string => {
    if (num === 0) return "";
    
    let result = "";
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + " hundred";
      num %= 100;
      if (num > 0) result += " ";
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      if (num % 10 > 0) result += "-" + ones[num % 10];
    } else if (num >= 10) {
      result += teens[num - 10];
    } else if (num > 0) {
      result += ones[num];
    }
    
    return result;
  };

  const calculate = () => {
    const num = parseInt(number);
    
    if (!isNaN(num) && num >= 0 && num <= 999999999999) {
      if (num === 0) {
        setResult("zero");
        return;
      }
      
      let result = "";
      const billions = Math.floor(num / 1000000000);
      const millions = Math.floor((num % 1000000000) / 1000000);
      const thousands = Math.floor((num % 1000000) / 1000);
      const remainder = num % 1000;
      
      if (billions > 0) {
        result += convertHundreds(billions) + " billion";
      }
      if (millions > 0) {
        if (result) result += ", ";
        result += convertHundreds(millions) + " million";
      }
      if (thousands > 0) {
        if (result) result += ", ";
        result += convertHundreds(thousands) + " thousand";
      }
      if (remainder > 0) {
        if (result) result += ", ";
        result += convertHundreds(remainder);
      }
      
      setResult(result);
    }
  };

  const reset = () => {
    setNumber("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Number to Words Converter</CardTitle>
          <CardDescription>Convert numbers to English words</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Number</label>
              <Input
                type="number"
                placeholder="e.g., 1234"
                min="0"
                max="999999999999"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Words</p>
                <p className="text-xl font-semibold capitalize">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
