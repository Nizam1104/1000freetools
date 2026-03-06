"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
  const [compounding, setCompounding] = useState<"annual" | "semi-annual" | "quarterly" | "monthly" | "daily">("annual");
  const [result, setResult] = useState<{
    compoundInterest: number;
    totalAmount: number;
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
    const n = getCompoundingFrequency();
    const r = R / 100;

    const totalAmount = P * Math.pow(1 + r / n, n * timeInYears);
    const compoundInterest = totalAmount - P;
    const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;

    setResult({
      compoundInterest: Math.round(compoundInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    });
    setError("");
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setTimeUnit("years");
    setCompounding("annual");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setPrincipal("10000");
    setRate("6");
    setTime("5");
    setTimeUnit("years");
    setCompounding("monthly");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Compound Interest Calculator – Compute CI with Compounding</h1>
        <p className="text-muted-foreground">
          Calculate compound interest for daily, monthly, quarterly, or annual compounding with our free online calculator. See total interest earned and growth over time with a breakdown.
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
            <Label>Annual Interest Rate (%)</Label>
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
                placeholder="e.g., 5"
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
          <Button onClick={calculate}>Calculate Compound Interest</Button>
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
                <p className="text-sm text-muted-foreground mb-2">Compound Interest</p>
                <p className="text-3xl font-bold">${result.compoundInterest.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                <p className="text-3xl font-bold">${result.totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Effective Rate</p>
                <p className="text-3xl font-bold">{result.effectiveRate}%</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula & Calculation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                A = P(1 + r/n)^(nt)<br />
                A = ${principal}(1 + {(parseFloat(rate.toString())/100).toFixed(4)}/{getCompoundingFrequency()})^({getCompoundingFrequency()} × {timeUnit === "months" ? `${time}/12` : time})<br />
                A = ${result.totalAmount.toLocaleString()}<br />
                <br />
                Compound Interest = A - P = ${result.totalAmount.toLocaleString()} - ${principal} = ${result.compoundInterest.toLocaleString()}
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Compounding Impact</h4>
              <p className="text-sm text-muted-foreground">
                With {getCompoundingLabel()}, your money grows faster than simple interest. The effective annual rate is {result.effectiveRate}%, compared to the nominal rate of {rate}%.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Compound Interest?</h2>
        <p className="text-muted-foreground">
          Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. This creates a "snowball effect" where your money grows exponentially over time.
        </p>
        <p className="text-muted-foreground">
          Albert Einstein reportedly called compound interest "the eighth wonder of the world." The more frequently interest is compounded, the faster your money grows.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Compound Interest Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            A = P(1 + r/n)^(nt)
          </code>
          <div className="mt-4 grid md:grid-cols-5 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">A</p>
              <p className="text-xs text-muted-foreground">Final amount</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">P</p>
              <p className="text-xs text-muted-foreground">Principal</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">r</p>
              <p className="text-xs text-muted-foreground">Annual rate (decimal)</p>
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
        <h2 className="text-2xl font-semibold mb-6">Compounding Frequency Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Frequency</th>
                <th className="text-left p-3">n value</th>
                <th className="text-left p-3">Example on $10,000 at 6% for 5 years</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Annually</td>
                <td className="p-3">1</td>
                <td className="p-3">$13,382.26</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Semi-annually</td>
                <td className="p-3">2</td>
                <td className="p-3">$13,439.16</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Quarterly</td>
                <td className="p-3">4</td>
                <td className="p-3">$13,468.55</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Monthly</td>
                <td className="p-3">12</td>
                <td className="p-3">$13,488.50</td>
              </tr>
              <tr>
                <td className="p-3">Daily</td>
                <td className="p-3">365</td>
                <td className="p-3">$13,498.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Retirement Savings</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Invest $10,000 at 7% compounded monthly for 30 years
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = 10000(1 + 0.07/12)^(12×30) = $81,164.98<br />
              Interest earned: $71,164.98
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Credit Card Debt</h3>
            <p className="text-sm text-muted-foreground mb-2">
              $5,000 balance at 18% compounded daily for 2 years (no payments)
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = 5000(1 + 0.18/365)^(365×2) = $7,158.42<br />
              Interest accrued: $2,158.42
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Certificate of Deposit</h3>
            <p className="text-sm text-muted-foreground mb-2">
              $25,000 CD at 4.5% compounded quarterly for 3 years
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = 25000(1 + 0.045/4)^(4×3) = $28,576.89<br />
              Interest earned: $3,576.89
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Rule of 72</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            A quick way to estimate how long it takes for money to double: divide 72 by the interest rate.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 border rounded">
              <p className="font-semibold text-sm">At 6% interest</p>
              <p className="text-sm">72 ÷ 6 = 12 years to double</p>
            </div>
            <div className="p-3 border rounded">
              <p className="font-semibold text-sm">At 8% interest</p>
              <p className="text-sm">72 ÷ 8 = 9 years to double</p>
            </div>
            <div className="p-3 border rounded">
              <p className="font-semibold text-sm">At 10% interest</p>
              <p className="text-sm">72 ÷ 10 = 7.2 years to double</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How does compound interest work?</h3>
            <p className="text-sm text-muted-foreground">
              Compound interest earns interest on both your original money and the interest you've already earned. This creates exponential growth over time.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What compounding frequency is best?</h3>
            <p className="text-sm text-muted-foreground">
              For savings and investments, more frequent compounding is better (daily or monthly). For loans, less frequent compounding is better (annual).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the effective annual rate?</h3>
            <p className="text-sm text-muted-foreground">
              The effective annual rate (EAR) is the actual interest rate you earn or pay after accounting for compounding. It's always higher than the nominal rate when compounding occurs more than once per year.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How can I maximize compound interest?</h3>
            <p className="text-sm text-muted-foreground">
              Start early, contribute regularly, choose accounts with higher rates and more frequent compounding, and avoid withdrawing interest so it can continue growing.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/simple-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Simple Interest</p>
            <p className="text-xs text-muted-foreground">Basic SI calculation</p>
          </a>
          <a href="/math-tools/emi-loan-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">EMI Calculator</p>
            <p className="text-xs text-muted-foreground">Loan payments</p>
          </a>
          <a href="/math-tools/future-value-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Future Value</p>
            <p className="text-xs text-muted-foreground">Investment growth</p>
          </a>
        </div>
      </section>
    </div>
  );
}
