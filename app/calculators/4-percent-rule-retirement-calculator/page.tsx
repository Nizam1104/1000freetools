"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FourPercentRuleRetirementCalculatorPage() {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [yearsToRetirement, setYearsToRetirement] = useState<string>("");
  const [result, setResult] = useState<{
    projectedCorpus: number;
    annualWithdrawal: number;
    monthlyWithdrawal: number;
    requiredCorpus: number;
    onTrack: boolean;
  } | null>(null);

  const calculateFourPercent = () => {
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(expectedReturn) / 100 / 12;
    const years = parseFloat(yearsToRetirement);

    if (isNaN(years) || years <= 0) {
      return;
    }

    const months = years * 12;
    const projectedCorpus = savings * Math.pow(1 + rate, months) + monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    const annualWithdrawal = projectedCorpus * 0.04;
    const monthlyWithdrawal = annualWithdrawal / 12;

    // Calculate required corpus for $4000/month (example target)
    const targetMonthly = 4000;
    const requiredCorpus = (targetMonthly * 12) / 0.04;
    const onTrack = projectedCorpus >= requiredCorpus;

    setResult({
      projectedCorpus,
      annualWithdrawal,
      monthlyWithdrawal,
      requiredCorpus,
      onTrack,
    });
  };

  const reset = () => {
    setCurrentSavings("");
    setMonthlyContribution("");
    setExpectedReturn("");
    setYearsToRetirement("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">4% Rule Retirement Calculator</h1>
          <p className="text-muted-foreground">
            Apply the classic 4% rule to your retirement plan. Calculate the corpus needed to withdraw 4% annually and see if your current savings are on track.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Retirement Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="Enter current savings"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  placeholder="Enter monthly contribution"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  placeholder="Default 7%"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsToRetirement">Years to Retirement</Label>
                <Input
                  id="yearsToRetirement"
                  type="number"
                  placeholder="Enter years"
                  value={yearsToRetirement}
                  onChange={(e) => setYearsToRetirement(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateFourPercent} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Projected Retirement Corpus</p>
                    <p className="text-3xl font-bold text-primary">${result.projectedCorpus.toLocaleString()}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Annual Withdrawal (4%)</p>
                      <p className="text-lg font-bold">${result.annualWithdrawal.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Withdrawal</p>
                      <p className="text-lg font-bold">${result.monthlyWithdrawal.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${result.onTrack ? 'bg-green-100 dark:bg-green-900/20' : 'bg-orange-100 dark:bg-orange-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`text-lg font-bold ${result.onTrack ? 'text-green-600' : 'text-orange-600'}`}>
                      {result.onTrack ? 'On Track!' : 'Need to save more'}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>The 4% Rule suggests you can withdraw 4% annually, adjusted for inflation, for 30+ years</p>
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
