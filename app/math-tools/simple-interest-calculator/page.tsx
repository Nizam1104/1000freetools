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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Simple Interest?</h2>
        <p className="text-muted-foreground">
          Simple interest is a method of calculating interest where the interest is computed only on the original principal amount. Unlike compound interest, it doesn't take into account any interest that has been accumulated over previous periods.
        </p>
        <p className="text-muted-foreground">
          Simple interest is commonly used for short-term loans, car loans, and some types of bonds. It's straightforward to calculate and easy to understand.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Simple Interest Formula</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            SI = (P × R × T) / 100
          </code>
          <div className="mt-4 grid md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">P</p>
              <p className="text-xs text-muted-foreground">Principal amount (initial investment or loan)</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">R</p>
              <p className="text-xs text-muted-foreground">Annual interest rate (as a percentage)</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">T</p>
              <p className="text-xs text-muted-foreground">Time period in years</p>
            </div>
            <div className="p-3 bg-muted rounded">
              <p className="font-semibold text-sm">SI</p>
              <p className="text-xs text-muted-foreground">Simple interest earned or paid</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Personal Loan</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Borrow $5,000 at 8% simple interest for 2 years
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              SI = (5000 × 8 × 2) / 100 = $800<br />
              Total repayment = $5,800
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Savings Account</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Deposit $10,000 at 4% simple interest for 18 months
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              SI = (10000 × 4 × 1.5) / 100 = $600<br />
              Total amount = $10,600
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Car Loan</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Finance $20,000 at 6% simple interest for 5 years
            </p>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              SI = (20000 × 6 × 5) / 100 = $6,000<br />
              Total repayment = $26,000
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Simple vs Compound Interest</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Simple Interest</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Interest on principal only</li>
              <li>• Linear growth over time</li>
              <li>• Easier to calculate</li>
              <li>• Lower total interest</li>
              <li>• Used for short-term loans</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Compound Interest</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Interest on principal + interest</li>
              <li>• Exponential growth over time</li>
              <li>• More complex calculation</li>
              <li>• Higher total interest</li>
              <li>• Used for savings & investments</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How is simple interest calculated?</h3>
            <p className="text-sm text-muted-foreground">
              Simple interest is calculated using the formula SI = (P × R × T) / 100, where P is principal, R is the annual interest rate, and T is time in years.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">When is simple interest used?</h3>
            <p className="text-sm text-muted-foreground">
              Simple interest is commonly used for short-term personal loans, car loans, some bonds, and certain types of savings accounts.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is simple interest better than compound interest?</h3>
            <p className="text-sm text-muted-foreground">
              For borrowers, simple interest is better (less total interest). For savers and investors, compound interest is better (more growth over time).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I calculate simple interest for months?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, convert months to years by dividing by 12. For example, 18 months = 1.5 years in the formula.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Compound Interest</p>
            <p className="text-xs text-muted-foreground">Calculate CI with compounding</p>
          </a>
          <a href="/math-tools/emi-loan-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">EMI Calculator</p>
            <p className="text-xs text-muted-foreground">Monthly loan payments</p>
          </a>
          <a href="/math-tools/roi-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">ROI Calculator</p>
            <p className="text-xs text-muted-foreground">Return on investment</p>
          </a>
        </div>
      </section>
    </div>
  );
}
