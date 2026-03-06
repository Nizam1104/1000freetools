"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
  const [compounding, setCompounding] = useState<"annual" | "semi-annual" | "quarterly" | "monthly" | "daily">("annual");
  const [result, setResult] = useState<{
    presentValue: number;
    discountAmount: number;
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
    const FV = parseFloat(futureValue);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(FV) || isNaN(R) || isNaN(T)) {
      setError("Please enter valid numbers for all fields");
      setResult(null);
      return;
    }

    if (FV < 0 || R < 0 || T < 0) {
      setError("Values cannot be negative");
      setResult(null);
      return;
    }

    const timeInYears = timeUnit === "months" ? T / 12 : T;
    const n = getCompoundingFrequency();
    const r = R / 100;

    const presentValue = FV / Math.pow(1 + r / n, n * timeInYears);
    const discountAmount = FV - presentValue;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    setResult({
      presentValue: Math.round(presentValue * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    });
    setError("");
  };

  const reset = () => {
    setFutureValue("");
    setRate("");
    setTime("");
    setTimeUnit("years");
    setCompounding("annual");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setFutureValue("50000");
    setRate("6");
    setTime("10");
    setTimeUnit("years");
    setCompounding("annual");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Present Value Calculator – Compute PV of Future Money</h1>
        <p className="text-muted-foreground">
          Determine the present value of any future amount with our free online present value calculator. Discount future cash flows to their current worth using any interest rate.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Future Value (FV)</Label>
            <Input
              type="number"
              placeholder="e.g., 50000"
              value={futureValue}
              onChange={(e) => setFutureValue(e.target.value)}
            />
          </div>
          <div>
            <Label>Discount Rate (%)</Label>
            <Input
              type="number"
              placeholder="e.g., 6"
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
          <Button onClick={calculate}>Calculate Present Value</Button>
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
                <p className="text-sm text-muted-foreground mb-2">Present Value</p>
                <p className="text-3xl font-bold">${result.presentValue.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Discount Amount</p>
                <p className="text-3xl font-bold text-primary">-${result.discountAmount.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Effective Rate</p>
                <p className="text-3xl font-bold">{result.effectiveRate}%</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula & Calculation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                PV = FV / (1 + r/n)^(nt)<br />
                PV = ${futureValue} / (1 + {(parseFloat(rate.toString())/100).toFixed(4)}/{getCompoundingFrequency()})^({getCompoundingFrequency()} × {timeUnit === "months" ? `${time}/12` : time})<br />
                PV = ${result.presentValue.toLocaleString()}<br />
                <br />
                Discount = FV - PV = ${futureValue} - ${result.presentValue.toLocaleString()} = ${result.discountAmount.toLocaleString()}
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">What This Means</h4>
              <p className="text-sm text-muted-foreground">
                Receiving ${result.presentValue.toLocaleString()} today is equivalent to receiving ${futureValue} in {time} {timeUnit}, assuming you can invest at {rate}% annual return compounded {getCompoundingLabel()}. The difference of ${result.discountAmount.toLocaleString()} represents the time value of money.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Present Value?</h2>
        <p className="text-muted-foreground">
          Present Value (PV) is the current worth of a future sum of money, discounted at a specific rate of return. It's based on the principle that money available today is worth more than the same amount in the future due to its potential earning capacity.
        </p>
        <p className="text-muted-foreground">
          Present value calculations are fundamental to finance, used in investment analysis, loan evaluation, retirement planning, and business valuation. The concept helps answer: "How much should I invest today to reach a future goal?"
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Present Value Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            PV = FV / (1 + r/n)^(nt)
          </code>
          <div className="mt-4 grid md:grid-cols-5 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">PV</p>
              <p className="text-xs text-muted-foreground">Present value</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">FV</p>
              <p className="text-xs text-muted-foreground">Future value</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">r</p>
              <p className="text-xs text-muted-foreground">Discount rate</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">n</p>
              <p className="text-xs text-muted-foreground">Compounds per year</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">t</p>
              <p className="text-xs text-muted-foreground">Time in years</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Lottery Payout Decision</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Choose between $1M today or $1.5M in 10 years (6% discount rate)
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              PV = 1,500,000 / (1 + 0.06)^10<br />
              PV = $837,592<br />
              <br />
              Take the $1M today - it's worth more!
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">College Fund Goal</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Need $100,000 in 15 years, earning 5% annually
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              PV = 100,000 / (1 + 0.05)^15<br />
              PV = $48,101.71<br />
              <br />
              Invest $48,102 today to reach your goal
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Bond Valuation</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Bond pays $10,000 in 5 years, market rate is 4%
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              PV = 10,000 / (1 + 0.04)^5<br />
              PV = $8,219.27<br />
              <br />
              Fair price for the bond today
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is present value less than future value?</h3>
            <p className="text-sm text-muted-foreground">
              Money today can earn interest, so you need less now to reach a future amount. The difference represents the opportunity cost of waiting - the interest you could have earned.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I choose a discount rate?</h3>
            <p className="text-sm text-muted-foreground">
              Use your expected investment return, cost of capital, or a risk-adjusted rate. Higher risk investments warrant higher discount rates. For conservative estimates, use Treasury bond rates.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the relationship between PV and FV?</h3>
            <p className="text-sm text-muted-foreground">
              They're inverse calculations. FV compounds forward: FV = PV × (1+r)^t. PV discounts backward: PV = FV / (1+r)^t. They use the same formula, just rearranged.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How does inflation affect present value?</h3>
            <p className="text-sm text-muted-foreground">
              Use a real (inflation-adjusted) discount rate: real rate = nominal rate - inflation. If you expect 7% returns and 3% inflation, use 4% as your discount rate for purchasing power.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/future-value-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Future Value</p>
            <p className="text-xs text-muted-foreground">FV of investment</p>
          </a>
          <a href="/math-tools/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Compound Interest</p>
            <p className="text-xs text-muted-foreground">CI calculation</p>
          </a>
          <a href="/math-tools/npv-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">NPV Calculator</p>
            <p className="text-xs text-muted-foreground">Net present value</p>
          </a>
        </div>
      </section>
    </div>
  );
}
