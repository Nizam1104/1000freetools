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

  const loadExample = (fv: string, r: string, t: string, unit: "years" | "months", comp: typeof compounding) => {
    setFutureValue(fv);
    setRate(r);
    setTime(t);
    setTimeUnit(unit);
    setCompounding(comp);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Present Value Calculator - Compute PV of Future Money</h1>
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate Present Value</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("50000", "6", "10", "years", "annual")}>$50k in 10 yrs @ 6%</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("100000", "5", "20", "years", "annual")}>$100k retirement</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10000", "4", "3", "years", "quarterly")}>$10k quarterly</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5000", "3.5", "24", "months", "monthly")}>$5k in 2 yrs</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1000000", "7", "30", "years", "annual")}>$1M in 30 yrs</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("25000", "8", "5", "years", "daily")}>$25k daily comp</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Present Value</h2>
        <p className="text-muted-foreground">
          Present value answers a fundamental financial question: What is a future sum of money worth today? The answer depends on the time value of money - the principle that money available now is worth more than the same amount in the future because it can earn interest.
        </p>
        <p className="text-muted-foreground">
          This concept is crucial for investment decisions, retirement planning, loan comparisons, and business valuation. If someone promises you $10,000 in 5 years, present value tells you what that promise is worth right now.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Present Value Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-lg mb-3">
            PV = FV / (1 + r/n)^(nt)
          </p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Where:</p>
            <p>• PV = Present Value (what we're solving for)</p>
            <p>• FV = Future Value (the amount you'll receive later)</p>
            <p>• r = Annual interest rate (as a decimal)</p>
            <p>• n = Compounding frequency per year</p>
            <p>• t = Time in years</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Why Discount Future Money?</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Opportunity cost - money today can be invested</li>
              <li>• Inflation erodes purchasing power over time</li>
              <li>• Risk - future payments aren't guaranteed</li>
              <li>• Preference for immediate consumption</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Compounding Impact</h4>
            <p className="text-sm text-muted-foreground mb-2">More frequent compounding means:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Higher effective interest rate</li>
              <li>• Lower present value (more discounting)</li>
              <li>• Daily vs annual can make a real difference</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Simple Present Value</h4>
            <p className="text-sm text-muted-foreground mb-2">
              What's the present value of $50,000 to be received in 10 years, assuming a 6% annual return?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>FV = $50,000, r = 6%, n = 1 (annual), t = 10 years</div>
              <div>PV = 50,000 / (1 + 0.06/1)^(1×10)</div>
              <div>PV = 50,000 / (1.06)^10</div>
              <div>PV = 50,000 / 1.7908</div>
              <div className="text-green-600 font-semibold">PV = $27,919.74</div>
              <div className="text-muted-foreground">You'd need to invest $27,920 today to have $50,000 in 10 years at 6%</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Retirement Planning</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You want $1,000,000 for retirement in 30 years. At 7% annual return, how much do you need today?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>FV = $1,000,000, r = 7%, t = 30 years</div>
              <div>PV = 1,000,000 / (1.07)^30</div>
              <div>PV = 1,000,000 / 7.6123</div>
              <div className="text-green-600 font-semibold">PV = $131,367.12</div>
              <div className="text-muted-foreground">Invest $131k now at 7% and you'll have $1M in 30 years</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Comparing Payment Options</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Should you take $8,000 today or $10,000 in 3 years? Assume you can earn 5% annually.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>PV of $10,000 in 3 years:</div>
              <div>PV = 10,000 / (1.05)^3 = 10,000 / 1.1576</div>
              <div>PV = $8,638.38</div>
              <div className="text-green-600 font-semibold">Take the $10,000 in 3 years - it's worth $8,638 today!</div>
              <div className="text-muted-foreground">The future payment has higher present value</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Effect of Compounding Frequency</h4>
            <p className="text-sm text-muted-foreground mb-2">
              PV of $10,000 in 5 years at 5% with different compounding:
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Annual (n=1): PV = $7,835.26</div>
              <div>Quarterly (n=4): PV = $7,800.22</div>
              <div>Monthly (n=12): PV = $7,792.06</div>
              <div>Daily (n=365): PV = $7,788.08</div>
              <div className="text-muted-foreground">More frequent compounding = slightly lower PV</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The concept of present value dates back to the 13th century when Italian mathematician Leonardo Fibonacci wrote about it in Liber Abaci (1202). However, the formal mathematical treatment wasn't developed until the 17th century by Dutch mathematician Christiaan Huygens, who used it to value annuities. Today, PV calculations underpin everything from mortgage payments to stock valuations to lottery payout decisions.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a good discount rate to use?</h4>
            <p className="text-sm text-muted-foreground">
              It depends on your situation. For personal finance, use your expected investment return (8-10% for stocks, 4-5% for bonds). For business, use the weighted average cost of capital (WACC). For risk-free calculations, use Treasury bond rates. Higher rates mean lower present values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does inflation affect present value?</h4>
            <p className="text-sm text-muted-foreground">
              Inflation is one reason future money is worth less. If you want to account for inflation specifically, use a "real" discount rate: real rate = nominal rate - inflation rate. At 6% nominal return and 3% inflation, your real return is about 3%.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can present value be negative?</h4>
            <p className="text-sm text-muted-foreground">
              No, present value of a positive future amount is always positive. However, in investment analysis, "net present value" (NPV) can be negative if the initial cost exceeds the present value of future cash flows - indicating a bad investment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between PV and NPV?</h4>
            <p className="text-sm text-muted-foreground">
              PV calculates the current worth of a single future amount or stream of cash flows. NPV subtracts the initial investment cost from the PV of future cash flows. Positive NPV means the investment creates value; negative NPV means it destroys value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does compounding frequency matter?</h4>
            <p className="text-sm text-muted-foreground">
              More frequent compounding means interest earns interest sooner. $1,000 at 6% compounded daily earns more than compounded annually. The difference seems small short-term but grows over time. The theoretical limit is "continuous compounding" using e (Euler's number).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When would I use present value in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Comparing job offers with different signing bonuses, deciding between lump-sum and annuity lottery payouts, evaluating whether to pay off a loan early, calculating how much to save for retirement, valuing a business, or determining if a rental property is worth the purchase price.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
