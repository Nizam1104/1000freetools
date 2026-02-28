"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CarLoanCalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [loanDuration, setLoanDuration] = useState<string>("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalLoan: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const calculateCarLoan = () => {
    const P = parseFloat(vehiclePrice) - parseFloat(downPayment);
    const R = parseFloat(interestRate) / 12 / 100;
    const N = parseFloat(loanDuration) * 12;

    if (isNaN(P) || isNaN(R) || isNaN(N) || P <= 0 || R <= 0 || N <= 0) {
      return;
    }

    const monthlyPayment = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalInterest = monthlyPayment * N - P;
    const totalCost = parseFloat(vehiclePrice) + totalInterest;

    setResult({ monthlyPayment, totalLoan: P, totalInterest, totalCost });
  };

  const reset = () => {
    setVehiclePrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanDuration("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Car Loan Calculator</h1>
          <p className="text-muted-foreground">
            Plan your auto financing with confidence. Calculate your monthly car loan payment and total cost based on vehicle price, down payment, rate, and duration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                <Input
                  id="vehiclePrice"
                  type="number"
                  placeholder="Enter vehicle price"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <Input
                  id="downPayment"
                  type="number"
                  placeholder="Enter down payment amount"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
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
                <Label htmlFor="loanDuration">Loan Duration (Years)</Label>
                <Input
                  id="loanDuration"
                  type="number"
                  placeholder="Enter loan duration in years"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateCarLoan} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-3xl font-bold text-primary">${result.monthlyPayment.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="text-lg font-bold">${result.totalLoan.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">${result.totalInterest.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Cost of Vehicle</p>
                    <p className="text-xl font-bold">${result.totalCost.toFixed(2)}</p>
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
