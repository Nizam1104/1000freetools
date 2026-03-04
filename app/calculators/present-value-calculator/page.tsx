"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PresentValueCalculatorPage() {
  const [futureValue, setFutureValue] = useState<string>("");
  const [discountRate, setDiscountRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    presentValue: number;
    discountFactor: number;
  } | null>(null);

  const calculatePresentValue = () => {
    const FV = parseFloat(futureValue);
    const R = parseFloat(discountRate) / 100;
    const T = parseFloat(timePeriod);

    if (isNaN(FV) || isNaN(R) || isNaN(T) || FV <= 0 || R < 0 || T <= 0) {
      return;
    }

    const discountFactor = 1 / Math.pow(1 + R, T);
    const presentValue = FV * discountFactor;

    setResult({ presentValue, discountFactor });
  };

  const reset = () => {
    setFutureValue("");
    setDiscountRate("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Present Value Calculator</h1>
          <p className="text-muted-foreground">
            Determine what a future sum of money is worth in today&apos;s dollars. Discount single or multiple future cash flows using your chosen discount rate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="futureValue">Future Value</Label>
                <Input
                  id="futureValue"
                  type="number"
                  placeholder="Enter future value"
                  value={futureValue}
                  onChange={(e) => setFutureValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountRate">Discount Rate (%)</Label>
                <Input
                  id="discountRate"
                  type="number"
                  placeholder="Enter discount rate"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timePeriod">Time Period (Years)</Label>
                <Input
                  id="timePeriod"
                  type="number"
                  placeholder="Enter time period in years"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculatePresentValue} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Present Value</p>
                    <p className="text-3xl font-bold text-primary">${result.presentValue.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Discount Factor</p>
                    <p className="text-xl font-bold">{result.discountFactor.toFixed(4)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: PV = FV / (1 + r)^t</p>
                    <p className="mt-1">
                      Future Value: ${parseFloat(futureValue).toFixed(2)} discounted at {discountRate}% for {timePeriod} years
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Calculate Present Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <p className="font-semibold mb-1">Enter future value</p>
                <p className="text-sm text-muted-foreground">Input the amount of money you expect to receive in the future.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <p className="font-semibold mb-1">Set discount rate and time</p>
                <p className="text-sm text-muted-foreground">Enter your expected rate of return and the number of years until receipt.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <p className="font-semibold mb-1">Get present value</p>
                <p className="text-sm text-muted-foreground">See what that future amount is worth in today's dollars.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Why Present Value Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Investment comparison</p>
                <p className="text-sm text-muted-foreground">Compare different investment opportunities on equal footing.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Time value of money</p>
                <p className="text-sm text-muted-foreground">Understand that money today is worth more than the same amount tomorrow.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Retirement planning</p>
                <p className="text-sm text-muted-foreground">Calculate how much you need to save now for future goals.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Loan evaluation</p>
                <p className="text-sm text-muted-foreground">Assess the true cost of loans and payment plans.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Business decisions</p>
                <p className="text-sm text-muted-foreground">Evaluate project viability using discounted cash flow analysis.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">What is present value?</p>
                <p className="text-sm text-muted-foreground">Present value is what a future sum of money is worth today, accounting for the time value of money and discount rate.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">How do you calculate present value?</p>
                <p className="text-sm text-muted-foreground">PV = FV / (1 + r)^t. For $10,000 in 5 years at 5%: PV = 10000 / (1.05)^5 = $7,835.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What is the discount rate?</p>
                <p className="text-sm text-muted-foreground">The discount rate is your expected rate of return or opportunity cost. Higher rates reduce present value.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Why is present value important?</p>
                <p className="text-sm text-muted-foreground">It helps compare money received at different times and make informed financial decisions.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">What is the difference between PV and FV?</p>
                <p className="text-sm text-muted-foreground">PV is today's value. FV is future value. PV is always less than FV when discount rate is positive.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Finance Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Try our other financial tools: the <a href="/calculators/future-value-calculator" className="text-primary hover:underline">future value calculator</a> for investment growth, the <a href="/calculators/npv-calculator" className="text-primary hover:underline">NPV calculator</a> for project evaluation, and the <a href="/calculators/compound-interest-calculator" className="text-primary hover:underline">compound interest calculator</a> for savings projections.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
