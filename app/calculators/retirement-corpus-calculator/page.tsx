"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RetirementCorpusCalculatorPage() {
  const [currentAge, setCurrentAge] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<string>("");
  const [lifeExpectancy, setLifeExpectancy] = useState<string>("");
  const [monthlyExpense, setMonthlyExpense] = useState<string>("");
  const [inflationRate, setInflationRate] = useState<string>("3");
  const [returnRate, setReturnRate] = useState<string>("7");
  const [result, setResult] = useState<{
    retirementYears: number;
    retirementDuration: number;
    monthlyExpenseAtRetirement: number;
    requiredCorpus: number;
  } | null>(null);

  const calculateRetirementCorpus = () => {
    const currAge = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const lifeExp = parseFloat(lifeExpectancy);
    const monthlyExp = parseFloat(monthlyExpense);
    const inflation = parseFloat(inflationRate) / 100;
    const retRate = parseFloat(returnRate) / 100;

    if (isNaN(currAge) || isNaN(retAge) || isNaN(lifeExp) || isNaN(monthlyExp) || isNaN(inflation) || isNaN(retRate)) {
      return;
    }

    const retirementYears = retAge - currAge;
    const retirementDuration = lifeExp - retAge;
    const monthlyExpenseAtRetirement = monthlyExp * Math.pow(1 + inflation, retirementYears);
    const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

    const realReturnRate = (retRate - inflation) / (1 + inflation);
    const requiredCorpus = annualExpenseAtRetirement * ((1 - Math.pow(1 + realReturnRate, -retirementDuration)) / realReturnRate);

    setResult({
      retirementYears,
      retirementDuration,
      monthlyExpenseAtRetirement,
      requiredCorpus,
    });
  };

  const reset = () => {
    setCurrentAge("");
    setRetirementAge("");
    setLifeExpectancy("");
    setMonthlyExpense("");
    setInflationRate("3");
    setReturnRate("7");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Retirement Corpus Calculator</h1>
          <p className="text-muted-foreground">
            Estimate exactly how much you need to retire comfortably. Calculate the total corpus required to sustain your desired monthly income throughout retirement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentAge">Current Age</Label>
                <Input
                  id="currentAge"
                  type="number"
                  placeholder="Enter your current age"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retirementAge">Retirement Age</Label>
                <Input
                  id="retirementAge"
                  type="number"
                  placeholder="When do you want to retire?"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
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
                <Label htmlFor="monthlyExpense">Current Monthly Expense</Label>
                <Input
                  id="monthlyExpense"
                  type="number"
                  placeholder="Enter monthly expenses"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                <Input
                  id="inflationRate"
                  type="number"
                  placeholder="Default 3%"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnRate">Expected Return (%)</Label>
                <Input
                  id="returnRate"
                  type="number"
                  placeholder="Default 7%"
                  value={returnRate}
                  onChange={(e) => setReturnRate(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRetirementCorpus} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Required Retirement Corpus</p>
                    <p className="text-3xl font-bold text-primary">${result.requiredCorpus.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Years to Retirement</p>
                      <p className="text-lg font-bold">{result.retirementYears} years</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Retirement Duration</p>
                      <p className="text-lg font-bold">{result.retirementDuration} years</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Expense at Retirement</p>
                    <p className="text-lg font-bold">${result.monthlyExpenseAtRetirement.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Adjusted for inflation at {inflationRate}% annually</p>
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
