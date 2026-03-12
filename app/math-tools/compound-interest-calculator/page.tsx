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

  const loadExample = (type: string) => {
    const examples: Record<string, { p: string; r: string; t: string; unit: "years" | "months"; comp: "annual" | "semi-annual" | "quarterly" | "monthly" | "daily" }> = {
      savings: { p: "10000", r: "6", t: "5", unit: "years", comp: "monthly" },
      retirement: { p: "50000", r: "7", t: "20", unit: "years", comp: "quarterly" },
      cd: { p: "25000", r: "4.5", t: "3", unit: "years", comp: "annual" },
      loan: { p: "15000", r: "9", t: "4", unit: "years", comp: "monthly" },
      investment: { p: "100000", r: "8", t: "10", unit: "years", comp: "quarterly" },
      emergency: { p: "5000", r: "4", t: "24", unit: "months", comp: "monthly" },
      daily: { p: "1000", r: "5", t: "1", unit: "years", comp: "daily" }
    };
    const ex = examples[type] || examples.savings;
    setPrincipal(ex.p);
    setRate(ex.r);
    setTime(ex.t);
    setTimeUnit(ex.unit);
    setCompounding(ex.comp);
    setResult(null);
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate Compound Interest</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("savings")}>Savings</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("retirement")}>Retirement</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("cd")}>CD</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("loan")}>Loan</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("investment")}>Investment</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("emergency")}>Emergency Fund</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("daily")}>Daily Compounding</Button>
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
                A = ${principal}(1 + {(parseFloat(rate.toString()) / 100).toFixed(4)}/{getCompoundingFrequency()})^({getCompoundingFrequency()} × {timeUnit === "months" ? `${time}/12` : time})<br />
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Compound Interest</h2>
        <p className="text-muted-foreground">
          Compound interest is interest on interest – your money earns interest, then that interest earns its own interest, and so on. It's like a snowball rolling downhill, gathering more snow as it goes. The longer it rolls, the bigger it gets, and the faster it grows.
        </p>
        <p className="text-muted-foreground">
          This is different from simple interest, where you only earn interest on your original principal. With compound interest, you earn interest on the principal plus all previously earned interest. Over time, this creates exponential growth – the curve gets steeper and steeper.
        </p>
        <p className="text-muted-foreground">
          Albert Einstein supposedly called compound interest "the eighth wonder of the world." Whether or not he said it, the sentiment is right. Understanding compound interest is essential for building wealth through savings and investments, and equally important for avoiding the trap of compound interest on debt.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">The Compound Interest Formula</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-lg mb-4 text-center">
            A = P(1 + r/n)^(nt)
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">A</div>
                <div className="text-muted-foreground">Final amount (principal + interest)</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">P</div>
                <div className="text-muted-foreground">Principal (initial investment)</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">r</div>
                <div className="text-muted-foreground">Annual interest rate (as decimal)</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">n</div>
                <div className="text-muted-foreground">Compounding frequency per year</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">t</div>
                <div className="text-muted-foreground">Time in years</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-semibold">Compound Interest</div>
                <div className="text-muted-foreground">A - P (interest earned)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Compounding Frequencies</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Annual</span>
                <span className="font-mono">n = 1</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Semi-annual</span>
                <span className="font-mono">n = 2</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Quarterly</span>
                <span className="font-mono">n = 4</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Monthly</span>
                <span className="font-mono">n = 12</span>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Daily</span>
                <span className="font-mono">n = 365</span>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Effective Annual Rate</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The effective rate tells you what simple annual rate would give you the same return as your compounded rate.
            </p>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-2">
              EAR = (1 + r/n)^n - 1
            </div>
            <p className="text-xs text-muted-foreground">
              For 6% compounded monthly: EAR = (1 + 0.06/12)^12 - 1 = 6.17%. You actually earn 6.17%, not 6%.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Savings Account</h3>
            <p className="text-sm text-muted-foreground mb-3">$10,000 at 6% annual interest, compounded monthly, for 5 years</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>P =</strong> $10,000</div>
              <div><strong>r =</strong> 0.06 (6%)</div>
              <div><strong>n =</strong> 12 (monthly)</div>
              <div><strong>t =</strong> 5 years</div>
              <div className="pt-2 border-t font-mono">
                A = 10000(1 + 0.06/12)^(12×5)<br />
                A = 10000(1.005)^60<br />
                A = 10000 × 1.34885<br />
                A = $13,488.50
              </div>
              <div className="font-semibold">Interest earned: $3,488.50</div>
              <div className="text-muted-foreground">Effective rate: 6.17%</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Retirement Investment</h3>
            <p className="text-sm text-muted-foreground mb-3">$50,000 at 7% annual interest, compounded quarterly, for 20 years</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>P =</strong> $50,000</div>
              <div><strong>r =</strong> 0.07 (7%)</div>
              <div><strong>n =</strong> 4 (quarterly)</div>
              <div><strong>t =</strong> 20 years</div>
              <div className="pt-2 border-t font-mono">
                A = 50000(1 + 0.07/4)^(4×20)<br />
                A = 50000(1.0175)^80<br />
                A = 50000 × 4.0064<br />
                A = $200,320
              </div>
              <div className="font-semibold">Interest earned: $150,320</div>
              <div className="text-muted-foreground">The investment quadruples in 20 years!</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Daily Compounding</h3>
            <p className="text-sm text-muted-foreground mb-3">$1,000 at 5% annual interest, compounded daily, for 1 year</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>P =</strong> $1,000</div>
              <div><strong>r =</strong> 0.05 (5%)</div>
              <div><strong>n =</strong> 365 (daily)</div>
              <div><strong>t =</strong> 1 year</div>
              <div className="pt-2 border-t font-mono">
                A = 1000(1 + 0.05/365)^(365×1)<br />
                A = 1000(1.000137)^365<br />
                A = 1000 × 1.0513<br />
                A = $1,051.27
              </div>
              <div className="font-semibold">Interest earned: $51.27</div>
              <div className="text-muted-foreground">Effective rate: 5.13% (vs 5% simple)</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Long-Term Growth</h3>
            <p className="text-sm text-muted-foreground mb-3">$100,000 at 8% annual interest, compounded quarterly, for 30 years</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>P =</strong> $100,000</div>
              <div><strong>r =</strong> 0.08 (8%)</div>
              <div><strong>n =</strong> 4 (quarterly)</div>
              <div><strong>t =</strong> 30 years</div>
              <div className="pt-2 border-t font-mono">
                A = 100000(1 + 0.08/4)^(4×30)<br />
                A = 100000(1.02)^120<br />
                A = 100000 × 10.765<br />
                A = $1,076,500
              </div>
              <div className="font-semibold">Interest earned: $976,500</div>
              <div className="text-muted-foreground">Nearly 11x growth over 30 years – the power of compounding!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>Jacob Bernoulli</strong> (1654-1705) discovered the mathematical constant e (approximately 2.718) while studying compound interest. He asked: what happens if you compound interest continuously – not daily or hourly, but at every instant? The answer involves e. The formula for continuous compounding is A = Pe^(rt). Bernoulli's work on this problem laid the foundation for calculus and the study of exponential growth, which describes everything from population growth to radioactive decay.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between compound and simple interest?</h3>
            <p className="text-sm text-muted-foreground">
              Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all accumulated interest. On $1,000 at 5% for 10 years: simple interest earns $500, but compound interest (monthly) earns $647. The gap widens dramatically over time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How much does compounding frequency matter?</h3>
            <p className="text-sm text-muted-foreground">
              More frequent compounding means more interest, but the difference diminishes. On $10,000 at 6% for 10 years: annual compounding gives $17,908, monthly gives $18,194, and daily gives $18,220. The jump from annual to monthly adds $286, but monthly to daily adds only $26.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is the Rule of 72?</h3>
            <p className="text-sm text-muted-foreground">
              The Rule of 72 estimates how long it takes to double your money: divide 72 by the interest rate. At 6%, your money doubles in about 72/6 = 12 years. At 9%, it doubles in 8 years. It's a quick mental shortcut that's surprisingly accurate for typical interest rates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can compound interest work against me?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. Credit card debt compounds, usually daily. A $5,000 balance at 18% APR with minimum payments can take over 20 years to pay off and cost $7,000+ in interest. This is why paying off high-interest debt should be a top priority – you're losing the benefit of compounding on your own investments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What is continuous compounding?</h3>
            <p className="text-sm text-muted-foreground">
              Continuous compounding calculates and adds interest at every possible instant – infinitely frequent compounding. The formula uses e (Euler's number): A = Pe^(rt). It gives the theoretical maximum return. In practice, daily compounding is very close to continuous for most purposes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How does inflation affect compound interest?</h3>
            <p className="text-sm text-muted-foreground">
              Inflation erodes purchasing power. If you earn 6% interest but inflation is 3%, your real return is only about 3%. Always consider the real rate of return (nominal rate minus inflation) when evaluating investments. A "safe" 2% return with 3% inflation means you're actually losing purchasing power.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">When should I start investing for retirement?</h3>
            <p className="text-sm text-muted-foreground">
              As early as possible. Time is the most powerful factor in compound interest. Investing $200/month from age 25 to 65 at 7% gives you $525,000. Waiting until 35 gives you only $244,000 – less than half, despite investing the same amount for 30 years. The first 10 years matter enormously.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
