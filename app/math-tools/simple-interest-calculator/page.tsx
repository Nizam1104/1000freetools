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

  const loadExample = (p: string, r: string, t: string, unit: "years" | "months" = "years") => {
    setPrincipal(p);
    setRate(r);
    setTime(t);
    setTimeUnit(unit);
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10000", "5", "3", "years")}>$10K at 5% for 3 yrs</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5000", "8", "18", "months")}>$5K at 8% for 18 mo</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("25000", "4.5", "5", "years")}>$25K at 4.5% for 5 yrs</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "12", "6", "months")}>$1K at 12% for 6 mo</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50000", "3.25", "10", "years")}>$50K at 3.25% for 10 yrs</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2000", "6", "24", "months")}>$2K at 6% for 24 mo</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("15000", "7.5", "2", "years")}>$15K at 7.5% for 2 yrs</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Simple Interest</h2>
          <p className="text-muted-foreground">
            Simple interest is the most straightforward way to calculate interest on money. Unlike compound interest, which grows exponentially, simple interest grows linearly – you earn or pay the same amount of interest each period based on the original principal.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Banks use simple interest for some loans and savings accounts. Car loans often use simple interest calculations. When you lend money to a friend with a verbal agreement to pay back "plus 5%," you're talking about simple interest.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Simple Interest Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-lg font-mono text-center mb-4">SI = (P × R × T) / 100</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold mb-1">Where:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>P</strong> = Principal (initial amount)</li>
                <li><strong>R</strong> = Annual interest rate (as a percentage)</li>
                <li><strong>T</strong> = Time period (in years)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Total Amount:</p>
              <p className="text-muted-foreground font-mono">A = P + SI</p>
              <p className="text-muted-foreground mt-2">Or combined: A = P(1 + RT/100)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Basic savings calculation</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: You deposit $10,000 in a savings account paying 5% simple interest per year. How much interest do you earn in 3 years?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: SI = (10000 × 5 × 3) / 100 = 150,000 / 100 = $1,500
            </p>
            <p className="text-sm text-muted-foreground">
              Total amount after 3 years: $10,000 + $1,500 = $11,500
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Short-term loan with months</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: You borrow $5,000 at 8% annual simple interest for 18 months. What's the total repayment?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Convert 18 months to years: 18/12 = 1.5 years
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              SI = (5000 × 8 × 1.5) / 100 = 60,000 / 100 = $600
            </p>
            <p className="text-sm text-muted-foreground">
              Total repayment: $5,000 + $600 = $5,600
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Finding the rate</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: $2,000 grows to $2,400 in 4 years with simple interest. What's the rate?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Interest earned = $2,400 - $2,000 = $400
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Using SI = PRT/100: 400 = (2000 × R × 4) / 100
            </p>
            <p className="text-sm text-muted-foreground">
              R = (400 × 100) / (2000 × 4) = 40,000 / 8,000 = 5% per year
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Finding the time</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: How long will it take $8,000 to earn $1,200 at 6% simple interest?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Using SI = PRT/100: 1200 = (8000 × 6 × T) / 100
            </p>
            <p className="text-sm text-muted-foreground">
              T = (1200 × 100) / (8000 × 6) = 120,000 / 48,000 = 2.5 years (or 30 months)
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Comparing investment options</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Option A pays 7% for 3 years. Option B pays 5% for 5 years. Which earns more on $10,000?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Option A: SI = (10000 × 7 × 3) / 100 = $2,100
            </p>
            <p className="text-sm text-muted-foreground">
              Option B: SI = (10000 × 5 × 5) / 100 = $2,500. Option B earns $400 more despite the lower rate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            Simple interest has been used for over 4,000 years. Ancient Babylonian clay tablets from 1800 BCE show interest calculations on grain loans. The Romans formalized interest rate laws, capping rates at 8.33% (1/12 per month). The word "interest" comes from Latin "interesse," meaning "to make a difference" – the difference between what you borrowed and what you repay.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Simple vs Compound Interest</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Simple Interest</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Interest calculated on original principal only</li>
              <li>• Linear growth – same interest each period</li>
              <li>• Formula: SI = PRT/100</li>
              <li>• Used for: short-term loans, car loans, some bonds</li>
              <li>• Easier to calculate mentally</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Compound Interest</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Interest calculated on principal + accumulated interest</li>
              <li>• Exponential growth – interest grows each period</li>
              <li>• Formula: A = P(1 + r/n)^(nt)</li>
              <li>• Used for: savings accounts, mortgages, credit cards</li>
              <li>• "Interest on interest" effect</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">When is simple interest better than compound interest?</h4>
            <p className="text-sm text-muted-foreground">
              Simple interest benefits borrowers on short-term loans – you pay less overall. For savers, compound interest is better because your money grows faster. Banks typically use compound interest for savings accounts but simple interest for some personal loans.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do car loans use simple interest?</h4>
            <p className="text-sm text-muted-foreground">
              Most car loans use simple interest calculated daily on the remaining balance. As you pay down the principal, you pay less interest each month. This is different from "add-on interest" loans where total interest is calculated upfront and added to the loan amount.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert monthly rate to annual rate?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply the monthly rate by 12. A 1% monthly rate equals 12% annual simple interest. Be careful – this doesn't work for compound interest, where you'd use (1 + monthly rate)^12 - 1.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can simple interest be calculated for partial years?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Express time as a fraction of a year. For 90 days, use 90/365 = 0.247 years. For 6 months, use 6/12 = 0.5 years. The formula works with any time value as long as it's in years.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good simple interest rate?</h4>
            <p className="text-sm text-muted-foreground">
              "Good" depends on context. For savings, anything above 4-5% is decent. For personal loans, under 10% is favorable. Credit cards charge 15-25% (usually compound). Government bonds typically pay 3-5%. Compare rates relative to current market conditions and inflation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is simple interest used for mortgages?</h4>
            <p className="text-sm text-muted-foreground">
              Most mortgages use compound interest (monthly compounding). However, some interest-only loans or short-term bridge loans may use simple interest. Always check your loan documents to understand how interest is calculated.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Compound Interest Calculator</p>
            <p className="text-xs text-muted-foreground">Interest on interest</p>
          </a>
          <a href="/math-tools/loan-payment-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Loan Payment Calculator</p>
            <p className="text-xs text-muted-foreground">Monthly payments</p>
          </a>
          <a href="/math-tools/percentage-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Percentage Calculator</p>
            <p className="text-xs text-muted-foreground">Percent calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
