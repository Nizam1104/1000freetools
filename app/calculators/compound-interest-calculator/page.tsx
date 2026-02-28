"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("12");
  const [result, setResult] = useState<{
    totalAmount: number;
    compoundInterest: number;
    totalPrincipal: number;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);
    const n = parseInt(compoundingFrequency);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      return;
    }

    const totalAmount = P * Math.pow(1 + R / (100 * n), n * T);
    const compoundInterest = totalAmount - P;

    setResult({ totalAmount, compoundInterest, totalPrincipal: P });
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompoundingFrequency("12");
    setResult(null);
  };

  const frequencyOptions = [
    { value: "1", label: "Annually (1 time/year)" },
    { value: "2", label: "Semi-annually (2 times/year)" },
    { value: "4", label: "Quarterly (4 times/year)" },
    { value: "12", label: "Monthly (12 times/year)" },
    { value: "52", label: "Weekly (52 times/year)" },
    { value: "365", label: "Daily (365 times/year)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Compound Interest Calculator</h1>
          <p className="text-muted-foreground">
            Find out how your money grows when interest compounds on both principal and accumulated earnings. Choose your compounding frequency for accurate projections.
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
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="Enter annual interest rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time Period (Years)</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="Enter time period in years"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Compounding Frequency</Label>
                <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCompoundInterest} className="flex-1">
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
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold">${result.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Compound Interest Earned</p>
                    <p className="text-2xl font-bold text-primary">${result.compoundInterest.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: A = P(1 + r/n)^(nt)</p>
                    <p className="mt-1">
                      Principal: ${result.totalPrincipal.toFixed(2)} | Interest: ${result.compoundInterest.toFixed(2)}
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
      </div>
    </div>
  );
}
