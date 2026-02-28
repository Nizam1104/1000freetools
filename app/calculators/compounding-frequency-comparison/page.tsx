"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompoundingFrequencyComparisonPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    frequencies: Array<{
      name: string;
      n: number;
      finalAmount: number;
      interest: number;
    }>;
  } | null>(null);

  const calculateComparison = () => {
    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 100;
    const T = parseFloat(timePeriod);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      return;
    }

    const frequencies = [
      { name: "Annually", n: 1 },
      { name: "Semi-Annually", n: 2 },
      { name: "Quarterly", n: 4 },
      { name: "Monthly", n: 12 },
      { name: "Weekly", n: 52 },
      { name: "Daily", n: 365 },
    ];

    const calculatedFrequencies = frequencies.map((freq) => {
      const finalAmount = P * Math.pow(1 + R / freq.n, freq.n * T);
      const interest = finalAmount - P;
      return { ...freq, finalAmount, interest };
    });

    setResult({ frequencies: calculatedFrequencies });
  };

  const reset = () => {
    setPrincipal("");
    setInterestRate("");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Compounding Frequency Comparison Calculator</h1>
          <p className="text-muted-foreground">
            Visualize how compounding frequency affects your returns. Compare daily, monthly, quarterly, and annual compounding side by side for the same principal and rate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter principal amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  placeholder="Enter annual interest rate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
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
                <Button onClick={calculateComparison} className="flex-1">
                  Compare
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results Comparison</h3>
              {result ? (
                <div className="space-y-3">
                  {result.frequencies.map((freq, index) => (
                    <div
                      key={freq.name}
                      className={`p-4 rounded-lg border-2 ${
                        index === result.frequencies.length - 1
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{freq.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {freq.n} time{freq.n > 1 ? "s" : ""}/year
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${freq.finalAmount.toFixed(2)}</p>
                          <p className="text-sm text-green-600">+${freq.interest.toFixed(2)}</p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${(freq.finalAmount / result.frequencies[result.frequencies.length - 1].finalAmount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>
                      Best option: <strong>Daily</strong> compounding gives you an extra{" "}
                      <strong>
                        ${(
                          result.frequencies[result.frequencies.length - 1].interest -
                          result.frequencies[0].interest
                        ).toFixed(2)}
                      </strong>{" "}
                      compared to annual compounding.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Compare to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
