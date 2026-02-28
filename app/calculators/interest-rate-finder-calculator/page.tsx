"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InterestRateFinderPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [emi, setEmi] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [result, setResult] = useState<{
    annualRate: number;
    monthlyRate: number;
  } | null>(null);

  const calculateInterestRate = () => {
    const P = parseFloat(principal);
    const E = parseFloat(emi);
    const N = parseFloat(tenure) * 12;

    if (isNaN(P) || isNaN(E) || isNaN(N) || P <= 0 || E <= 0 || N <= 0) {
      return;
    }

    // Binary search to find the interest rate
    let low = 0;
    let high = 100;
    let mid = 0;

    for (let i = 0; i < 100; i++) {
      mid = (low + high) / 2;
      const r = mid / 12 / 100;
      const calculatedEmi = P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);

      if (Math.abs(calculatedEmi - E) < 0.01) {
        break;
      }

      if (calculatedEmi > E) {
        high = mid;
      } else {
        low = mid;
      }
    }

    setResult({ annualRate: mid, monthlyRate: mid / 12 });
  };

  const reset = () => {
    setPrincipal("");
    setEmi("");
    setTenure("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Interest Rate Finder Calculator</h1>
          <p className="text-muted-foreground">
            Don&apos;t know your loan&apos;s interest rate? Reverse-calculate the implied annual rate from your known principal, monthly payment, and loan tenure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Loan Principal</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter loan amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emi">Monthly EMI/Payment</Label>
                <Input
                  id="emi"
                  type="number"
                  placeholder="Enter monthly payment"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter loan tenure in years"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateInterestRate} className="flex-1">
                  Calculate Rate
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
                    <p className="text-sm text-muted-foreground">Annual Interest Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.annualRate.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Interest Rate</p>
                    <p className="text-xl font-bold">{result.monthlyRate.toFixed(2)}%</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on Principal: ${parseFloat(principal).toFixed(2)}, EMI: ${parseFloat(emi).toFixed(2)}, Tenure: {tenure} years</p>
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
      </div>
    </div>
  );
}
