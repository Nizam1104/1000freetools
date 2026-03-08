"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
  const [result, setResult] = useState<{
    interest: number;
    totalAmount: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (P < 0 || R < 0 || T < 0) {
      setError("Values cannot be negative");
      setResult(null);
      return;
    }

    const timeInYears = timeUnit === "months" ? T / 12 : T;
    const interest = (P * R * timeInYears) / 100;
    const totalAmount = P + interest;

    setResult({
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    });
    setError("");
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTimeUnit("years");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setPrincipal("10000");
    setRate("5");
    setTime("3");
    setTimeUnit("years");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Simple Interest Calculator – Compute SI Online Instantly</h1>
        <p className="text-muted-foreground">
          Calculate simple interest, total amount, principal, rate, or time with our free online simple interest calculator. Uses the SI = PRT formula with clear step-by-step results.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Principal (P)</Label>
            <Input
              type="number"
              placeholder="e.g., 10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div>
            <Label>Interest Rate (%)</Label>
            <Input
              type="number"
              placeholder="e.g., 5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label>Time Period</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="e.g., 3"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1"
              />
              <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as "years" | "months")}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Simple Interest</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Simple Interest</p>
                <p className="text-4xl font-bold">${result.interest.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                <p className="text-4xl font-bold">${result.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula & Calculation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                SI = (P × R × T) / 100<br />
                SI = ({principal} × {rate} × {timeUnit === "months" ? `${time}/12` : time}) / 100<br />
                SI = ${result.interest.toLocaleString()}<br />
                <br />
                Total Amount = P + SI = ${principal} + ${result.interest.toLocaleString()} = ${result.totalAmount.toLocaleString()}
              </code>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
