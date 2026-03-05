"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SimpleInterestCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [result, setResult] = useState<{
    interest: number;
    totalAmount: number;
  } | null>(null);

  const calculateSimpleInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      return;
    }

    const interest = (P * R * T) / 100;
    const totalAmount = P + interest;

    setResult({ interest, totalAmount });
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Simple Interest Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the interest earned or owed on a principal amount using the formula I = P × R × T. Enter your principal, annual rate, and time period to get instant results.
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

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSimpleInterest} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Simple Interest</p>
                    <p className="text-2xl font-bold">${result.interest.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${result.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Formula: I = P × R × T / 100</p>
                    <p className="mt-1">
                      Where P = ${parseFloat(principal).toFixed(2)}, R = {rate}%, T = {time} years
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

        {/* How It Works Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Simple Interest</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Principal Amount</h3>
                <p className="text-sm text-muted-foreground">Input the initial sum of money invested or borrowed.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Add Rate and Time</h3>
                <p className="text-sm text-muted-foreground">Enter the annual interest rate percentage and time period in years.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Interest Results</h3>
                <p className="text-sm text-muted-foreground">View the calculated simple interest and total amount owed or earned.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features of This Simple Interest Calculator</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Classic I = PRT Formula
                </h3>
                <p className="text-sm text-muted-foreground">Uses the standard simple interest formula taught in schools and used in basic finance.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Total Amount Display
                </h3>
                <p className="text-sm text-muted-foreground">Shows both the interest earned/owed and the total principal plus interest amount.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Formula Breakdown
                </h3>
                <p className="text-sm text-muted-foreground">Displays the calculation with your actual values for transparency and learning.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Instant Calculation
                </h3>
                <p className="text-sm text-muted-foreground">Get results immediately without manual computation or spreadsheet setup.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Educational Tool
                </h3>
                <p className="text-sm text-muted-foreground">Perfect for students learning basic finance concepts and interest calculations.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions About Simple Interest</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the simple interest formula?</h3>
                <p className="text-sm text-muted-foreground">Simple Interest = (Principal × Rate × Time) / 100, or I = PRT/100. This calculates interest only on the original principal, not on accumulated interest.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the difference between simple and compound interest?</h3>
                <p className="text-sm text-muted-foreground">Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously earned interest, resulting in faster growth over time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">When is simple interest used?</h3>
                <p className="text-sm text-muted-foreground">Simple interest is commonly used for short-term loans, car loans, some mortgages, and basic savings accounts. It is also used in educational settings to teach interest concepts.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do you calculate simple interest for months instead of years?</h3>
                <p className="text-sm text-muted-foreground">Convert months to years by dividing by 12. For example, 6 months = 0.5 years. Then use the standard formula: I = P × R × (months/12) / 100.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can simple interest be negative?</h3>
                <p className="text-sm text-muted-foreground">No, simple interest cannot be negative with positive principal, rate, and time. However, from a borrower perspective, interest represents money owed, while from a lender or investor perspective, it represents money earned.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Tools Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Finance Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/compound-interest-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Compound Interest Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate interest with compounding for more accurate long-term projections.</p>
              </a>
              <a href="/calculators/future-value-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Future Value Calculator</h3>
                <p className="text-sm text-muted-foreground">Determine the future value of investments with regular contributions.</p>
              </a>
              <a href="/calculators/loan-emi-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Loan EMI Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate monthly loan payments with principal and interest breakdown.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
