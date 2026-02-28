"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SWPCalculatorPage() {
  const [corpus, setCorpus] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<string>("");
  const [result, setResult] = useState<{
    monthsLasts: number;
    yearsLasts: number;
    totalWithdrawn: number;
    remainingCorpus: number;
  } | null>(null);

  const calculateSWP = () => {
    const P = parseFloat(corpus);
    const R = parseFloat(expectedReturn) / 12 / 100;
    const W = parseFloat(monthlyWithdrawal);

    if (isNaN(P) || isNaN(R) || isNaN(W) || P <= 0 || R < 0 || W <= 0) {
      return;
    }

    if (W <= P * R) {
      setResult({
        monthsLasts: 9999,
        yearsLasts: 9999,
        totalWithdrawn: P,
        remainingCorpus: 0,
      });
      return;
    }

    const n = Math.log(W / (W - P * R)) / Math.log(1 + R);
    const totalWithdrawn = W * n;
    const remainingCorpus = 0;

    setResult({
      monthsLasts: Math.ceil(n),
      yearsLasts: n / 12,
      totalWithdrawn,
      remainingCorpus,
    });
  };

  const reset = () => {
    setCorpus("");
    setExpectedReturn("");
    setMonthlyWithdrawal("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">SWP Calculator – Systematic Withdrawal Plan</h1>
          <p className="text-muted-foreground">
            Find out how long your retirement corpus will last or how much you can withdraw monthly. Plan sustainable withdrawals based on corpus size and expected returns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="corpus">Total Corpus</Label>
                <Input
                  id="corpus"
                  type="number"
                  placeholder="Enter total corpus amount"
                  value={corpus}
                  onChange={(e) => setCorpus(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return rate"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyWithdrawal">Monthly Withdrawal Amount</Label>
                <Input
                  id="monthlyWithdrawal"
                  type="number"
                  placeholder="Enter monthly withdrawal"
                  value={monthlyWithdrawal}
                  onChange={(e) => setMonthlyWithdrawal(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSWP} className="flex-1">
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
                  {result.yearsLasts >= 9999 ? (
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Corpus Duration</p>
                      <p className="text-xl font-bold text-green-600">Corpus will last indefinitely</p>
                      <p className="text-sm mt-1">Your withdrawal is less than the monthly returns</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">Corpus Will Last</p>
                        <p className="text-2xl font-bold text-primary">{result.yearsLasts.toFixed(1)} years ({result.monthsLasts} months)</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                        <p className="text-xl font-bold">${result.totalWithdrawn.toFixed(2)}</p>
                      </div>
                    </>
                  )}
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Initial Corpus: ${parseFloat(corpus).toFixed(2)} | Expected Return: {expectedReturn}%</p>
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
