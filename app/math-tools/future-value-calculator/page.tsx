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

  const loadExample = (pv: string, r: string, t: string, unit: "years" | "months", comp: "annual" | "semi-annual" | "quarterly" | "monthly" | "daily") => {
    setPresentValue(pv);
    setRate(r);
    setTime(t);
    setTimeUnit(unit);
    setCompounding(comp);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate Future Value</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5000", "7", "10", "years", "monthly")}>$5K at 7% for 10yr</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10000", "5", "20", "years", "annual")}>$10K at 5% for 20yr</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "8", "30", "years", "quarterly")}>$1K at 8% for 30yr</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50000", "4.5", "15", "years", "semi-annual")}>$50K at 4.5% for 15yr</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000", "6", "60", "months", "monthly")}>$1K at 6% for 60mo</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("25000", "5.5", "25", "years", "daily")}>$25K at 5.5% for 25yr</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Future Value</h2>
        <p className="text-muted-foreground">
          Future value tells you what your money will be worth at some point in the future, assuming a specific rate of return. It's one of the most important concepts in finance because it helps you understand how investments grow over time through compound interest.
        </p>
        <p className="text-muted-foreground">
          Compound interest means you earn interest not just on your original investment, but also on the interest that accumulates. This creates a snowball effect – your money grows faster and faster as time goes on. The more frequently interest compounds, the more you earn.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Future Value Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-center text-lg p-4 bg-background rounded mb-4">
            FV = PV × (1 + r/n)^(nt)
          </div>
          <div className="text-sm space-y-2">
            <p><strong>FV</strong> = Future Value (what your investment will be worth)</p>
            <p><strong>PV</strong> = Present Value (your initial investment)</p>
            <p><strong>r</strong> = Annual interest rate (as a decimal, so 7% = 0.07)</p>
            <p><strong>n</strong> = Number of compounding periods per year</p>
            <p><strong>t</strong> = Time in years</p>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            The effective annual rate (EAR) shows the true annual return when compounding is taken into account. It's always higher than the nominal rate when compounding occurs more than once per year.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: $5,000 at 7% for 10 years (monthly compounding)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>PV = $5,000, r = 0.07, n = 12, t = 10</div>
              <div>FV = 5000 × (1 + 0.07/12)^(12×10)</div>
              <div>FV = 5000 × (1.005833)^120</div>
              <div>FV = 5000 × 2.00966</div>
              <div>FV = $10,048.30</div>
              <div className="text-muted-foreground mt-2">Interest earned: $5,048.30 (101% return)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: $10,000 at 5% for 20 years (annual compounding)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>PV = $10,000, r = 0.05, n = 1, t = 20</div>
              <div>FV = 10000 × (1 + 0.05/1)^(1×20)</div>
              <div>FV = 10000 × (1.05)^20</div>
              <div>FV = 10000 × 2.6533</div>
              <div>FV = $26,532.98</div>
              <div className="text-muted-foreground mt-2">Interest earned: $16,532.98 (165% return)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: The Power of Starting Early</h4>
            <div className="text-sm space-y-2">
              <p><strong>Person A:</strong> Invests $5,000 at age 25, earns 8% until age 65</p>
              <div className="font-mono">FV = 5000 × (1.08)^40 = $108,622.56</div>
              <p className="mt-2"><strong>Person B:</strong> Invests $5,000 at age 35, earns 8% until age 65</p>
              <div className="font-mono">FV = 5000 × (1.08)^30 = $50,313.28</div>
              <p className="text-muted-foreground mt-2">Same investment, 10-year head start = $58,309 more! Time is your biggest ally.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Effect of Compounding Frequency</h4>
            <div className="text-sm space-y-2">
              <p>$10,000 at 6% for 10 years with different compounding:</p>
              <div className="font-mono">Annual: $10,000 × (1.06)^10 = $17,908.48</div>
              <div className="font-mono">Quarterly: $10,000 × (1.015)^40 = $18,140.18</div>
              <div className="font-mono">Monthly: $10,000 × (1.005)^120 = $18,193.97</div>
              <div className="font-mono">Daily: $10,000 × (1.000164)^3650 = $18,220.29</div>
              <p className="text-muted-foreground mt-2">More frequent compounding = more money, but the difference diminishes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Albert Einstein reportedly called compound interest "the eighth wonder of the world" and said "he who understands it, earns it; he who doesn't, pays it." While the quote's authenticity is debated, it captures the transformative power of compound growth.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between simple and compound interest?</h4>
            <p className="text-sm text-muted-foreground">
              Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest. Over time, compound interest grows much faster. $1,000 at 5% for 20 years: simple = $2,000, compound = $2,653.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does compounding frequency affect returns?</h4>
            <p className="text-sm text-muted-foreground">
              More frequent compounding means slightly higher returns because interest starts earning interest sooner. The difference between annual and monthly compounding at typical rates is small but real. Daily compounding is very close to the theoretical maximum (continuous compounding).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good rate of return to assume?</h4>
            <p className="text-sm text-muted-foreground">
              Historically, the stock market averages about 10% annually (before inflation). Conservative investments like bonds return 3-5%. CDs and savings accounts typically offer 1-4%. Always use realistic rates for your specific investment type.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does inflation affect future value?</h4>
            <p className="text-sm text-muted-foreground">
              Inflation reduces purchasing power. A 3% inflation rate means prices double every 24 years. To find real (inflation-adjusted) future value, subtract inflation from your return rate. A 7% return with 3% inflation gives about 4% real growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the Rule of 72?</h4>
            <p className="text-sm text-muted-foreground">
              Divide 72 by your interest rate to estimate how many years it takes to double your money. At 6%, money doubles in 72/6 = 12 years. At 9%, it doubles in 8 years. It's a quick mental math trick for compound growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I use nominal or effective rate?</h4>
            <p className="text-sm text-muted-foreground">
              Use the nominal (stated) rate in the formula with the correct compounding frequency. The calculator will show you the effective rate, which is the true annual return after accounting for compounding.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/compound-interest-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Compound Interest</p>
            <p className="text-xs text-muted-foreground">Calculate compound growth</p>
          </a>
          <a href="/math-tools/present-value-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Present Value</p>
            <p className="text-xs text-muted-foreground">Discount future cash flows</p>
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
