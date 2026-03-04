"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RetirementWithdrawalRateCalculatorPage() {
  const [retirementCorpus, setRetirementCorpus] = useState<string>("");
  const [currentAge, setCurrentAge] = useState<string>("");
  const [lifeExpectancy, setLifeExpectancy] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [inflation, setInflation] = useState<string>("");
  const [result, setResult] = useState<{
    retirementYears: number;
    safeWithdrawalRate: number;
    annualWithdrawal: number;
    monthlyWithdrawal: number;
    inflationAdjustedWithdrawal: number;
  } | null>(null);

  const calculateWithdrawal = () => {
    const corpus = parseFloat(retirementCorpus);
    const age = parseFloat(currentAge);
    const lifeExp = parseFloat(lifeExpectancy);
    const retRate = parseFloat(expectedReturn) / 100;
    const infRate = parseFloat(inflation) / 100;

    if (isNaN(corpus) || isNaN(age) || isNaN(lifeExp) || isNaN(retRate) || isNaN(infRate) || corpus <= 0) {
      return;
    }

    const retirementYears = lifeExp - age;
    const realReturnRate = (retRate - infRate) / (1 + infRate);

    // Calculate safe withdrawal rate using annuity formula
    const safeWithdrawalRate = realReturnRate / (1 - Math.pow(1 + realReturnRate, -retirementYears));
    const annualWithdrawal = corpus * safeWithdrawalRate;
    const monthlyWithdrawal = annualWithdrawal / 12;
    const inflationAdjustedWithdrawal = annualWithdrawal * (1 + infRate);

    setResult({
      retirementYears,
      safeWithdrawalRate: safeWithdrawalRate * 100,
      annualWithdrawal,
      monthlyWithdrawal,
      inflationAdjustedWithdrawal,
    });
  };

  const reset = () => {
    setRetirementCorpus("");
    setCurrentAge("");
    setLifeExpectancy("");
    setExpectedReturn("");
    setInflation("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Retirement Withdrawal Rate Calculator</h1>
          <p className="text-muted-foreground">
            Calculate a safe and sustainable annual withdrawal rate from your retirement corpus. Accounts for corpus size, expected returns, inflation, and retirement duration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retirementCorpus">Retirement Corpus</Label>
                <Input
                  id="retirementCorpus"
                  type="number"
                  placeholder="Enter total savings"
                  value={retirementCorpus}
                  onChange={(e) => setRetirementCorpus(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  placeholder="Enter your age"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifeExpectancy">Life Expectancy</Label>
                <Input
                  id="lifeExpectancy"
                  type="number"
                  placeholder="Expected age"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Enter expected return"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inflation">Inflation Rate (%)</Label>
                <Input
                  id="inflation"
                  type="number"
                  placeholder="Default 3%"
                  value={inflation}
                  onChange={(e) => setInflation(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWithdrawal} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Safe Withdrawal Rate</p>
                    <p className="text-3xl font-bold text-primary">{result.safeWithdrawalRate.toFixed(2)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Withdrawal</p>
                      <p className="text-lg font-bold">${result.annualWithdrawal.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Withdrawal</p>
                      <p className="text-lg font-bold">${result.monthlyWithdrawal.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Year 2 Withdrawal (Inflation-Adjusted)</p>
                    <p className="text-lg font-bold text-green-600">${result.inflationAdjustedWithdrawal.toLocaleString()}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Retirement duration: {result.retirementYears} years</p>
                    <p>Withdrawals increase annually with inflation</p>
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
