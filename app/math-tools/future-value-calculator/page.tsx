"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FutureValueCalculator() {
  const [presentValue, setPresentValue] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
  const [compounding, setCompounding] = useState<"annual" | "semi-annual" | "quarterly" | "monthly" | "daily">("annual");
  const [result, setResult] = useState<{
    futureValue: number;
    interestEarned: number;
    effectiveRate: number;
  } | null>(null);
  const [error, setError] = useState("");

  const getCompoundingFrequency = (): number => {
    switch (compounding) {
      case "annual": return 1;
      case "semi-annual": return 2;
      case "quarterly": return 4;
      case "monthly": return 12;
      case "daily": return 365;
      default: return 1;
    }
  };

  const getCompoundingLabel = (): string => {
    switch (compounding) {
      case "annual": return "Annually (1×/year)";
      case "semi-annual": return "Semi-annually (2×/year)";
      case "quarterly": return "Quarterly (4×/year)";
      case "monthly": return "Monthly (12×/year)";
      case "daily": return "Daily (365×/year)";
      default: return "Annually";
    }
  };

  const calculate = () => {
    const PV = parseFloat(presentValue);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(PV) || isNaN(R) || isNaN(T)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (PV < 0 || R < 0 || T < 0) {
      setError("Values cannot be negative");
      setResult(null);
      return;
    }

    const timeInYears = timeUnit === "months" ? T / 12 : T;
    const n = getCompoundingFrequency();
    const r = R / 100;

    const futureValue = PV * Math.pow(1 + r / n, n * timeInYears);
    const interestEarned = futureValue - PV;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    setResult({
      futureValue: Math.round(futureValue * 100) / 100,
      interestEarned: Math.round(interestEarned * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    });
    setError("");
  };

  const reset = () => {
    setPresentValue("");
    setRate("");
    setTime("");
    setTimeUnit("years");
    setCompounding("annual");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setPresentValue("5000");
    setRate("7");
    setTime("10");
    setTimeUnit("years");
    setCompounding("monthly");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Future Value Calculator – Compute FV of Investment Online</h1>
        <p className="text-muted-foreground">
          Calculate the future value of any investment or savings with our free online future value calculator. Account for compound interest and time to see how your money grows.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Present Value (PV)</Label>
            <Input
              type="number"
              placeholder="e.g., 5000"
              value={presentValue}
              onChange={(e) => setPresentValue(e.target.value)}
            />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              placeholder="e.g., 7"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label>Time Period</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="e.g., 10"
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

        <div>
          <Label>Compounding Frequency</Label>
          <Select value={compounding} onValueChange={(v) => setCompounding(v as typeof compounding)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annually (1×/year)</SelectItem>
              <SelectItem value="semi-annual">Semi-annually (2×/year)</SelectItem>
              <SelectItem value="quarterly">Quarterly (4×/year)</SelectItem>
              <SelectItem value="monthly">Monthly (12×/year)</SelectItem>
              <SelectItem value="daily">Daily (365×/year)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Future Value</Button>
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
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Future Value</p>
                <p className="text-3xl font-bold">${result.futureValue.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Interest Earned</p>
                <p className="text-3xl font-bold text-primary">+${result.interestEarned.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Effective Rate</p>
                <p className="text-3xl font-bold">{result.effectiveRate}%</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula & Calculation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                FV = PV × (1 + r/n)^(nt)<br />
                FV = ${presentValue} × (1 + {(parseFloat(rate.toString())/100).toFixed(4)}/{getCompoundingFrequency()})^({getCompoundingFrequency()} × {timeUnit === "months" ? `${time}/12` : time})<br />
                FV = ${result.futureValue.toLocaleString()}<br />
                <br />
                Interest Earned = FV - PV = ${result.futureValue.toLocaleString()} - ${presentValue} = ${result.interestEarned.toLocaleString()}
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Growth Summary</h4>
              <p className="text-sm text-muted-foreground">
                Your initial investment of ${parseFloat(presentValue).toLocaleString()} will grow to ${result.futureValue.toLocaleString()} over {time} {timeUnit} at {rate}% annual interest compounded {getCompoundingLabel()}. That's a {((result.futureValue / parseFloat(presentValue) - 1) * 100).toFixed(1)}% total return.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
