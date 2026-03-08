"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LeapYearChecker() {
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{
    isLeap: boolean;
    explanation: string;
    nextLeap: number;
    prevLeap: number;
  } | null>(null);
  const [error, setError] = useState("");

  const checkLeapYear = (year: number) => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
    let explanation = "";
    if (year % 400 === 0) {
      explanation = `${year} is divisible by 400, so it's a leap year`;
    } else if (year % 100 === 0) {
      explanation = `${year} is divisible by 100 but not 400, so it's NOT a leap year`;
    } else if (year % 4 === 0) {
      explanation = `${year} is divisible by 4 but not 100, so it's a leap year`;
    } else {
      explanation = `${year} is not divisible by 4, so it's NOT a leap year`;
    }

    let nextLeap = year + 1;
    while (!((nextLeap % 4 === 0 && nextLeap % 100 !== 0) || (nextLeap % 400 === 0))) {
      nextLeap++;
    }

    let prevLeap = year - 1;
    while (!((prevLeap % 4 === 0 && prevLeap % 100 !== 0) || (prevLeap % 400 === 0))) {
      prevLeap--;
    }

    return { isLeap, explanation, nextLeap, prevLeap };
  };

  const calculate = () => {
    const num = parseInt(year.trim());

    if (isNaN(num)) {
      setError("Please enter a valid year");
      setResult(null);
      return;
    }

    if (num < 1 || num > 9999) {
      setError("Please enter a year between 1 and 9999");
      setResult(null);
      return;
    }

    setError("");
    setResult(checkLeapYear(num));
  };

  const reset = () => {
    setYear("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Leap Year Checker – Check If a Year Is a Leap Year</h1>
        <p className="text-muted-foreground">
          Find out if any year is a leap year with our free online leap year checker. Get instant results with clear explanations of the leap year rules.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter a year</Label>
          <Input
            type="text"
            placeholder="e.g., 2024"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Check Leap Year</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isLeap ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isLeap ? "text-green-600" : ""}`}>
                {result.isLeap ? "Leap Year" : "Not a Leap Year"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Previous Leap Year</p>
                <p className="text-2xl font-bold">{result.prevLeap}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Next Leap Year</p>
                <p className="text-2xl font-bold">{result.nextLeap}</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
