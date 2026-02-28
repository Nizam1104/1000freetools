"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FreelanceEffectiveHourlyRateCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("");
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<string>("");
  const [taxRate, setTaxRate] = useState<string>("");
  const [businessExpenses, setBusinessExpenses] = useState<string>("");
  const [result, setResult] = useState<{
    grossWeeklyIncome: number;
    netWeeklyIncome: number;
    effectiveHourlyRate: number;
  } | null>(null);

  const calculateEffectiveRate = () => {
    const rate = parseFloat(hourlyRate);
    const totalHours = parseFloat(hoursPerWeek);
    const billableHours = parseFloat(billableHoursPerWeek);
    const tax = parseFloat(taxRate) / 100;
    const expenses = parseFloat(businessExpenses);

    if (isNaN(rate) || isNaN(totalHours) || isNaN(billableHours) || isNaN(tax) || isNaN(expenses)) {
      return;
    }

    const grossWeeklyIncome = rate * billableHours;
    const afterTaxIncome = grossWeeklyIncome * (1 - tax);
    const netWeeklyIncome = afterTaxIncome - expenses;
    const effectiveHourlyRate = netWeeklyIncome / totalHours;

    setResult({ grossWeeklyIncome, netWeeklyIncome, effectiveHourlyRate });
  };

  const reset = () => {
    setHourlyRate("");
    setHoursPerWeek("");
    setBillableHoursPerWeek("");
    setTaxRate("");
    setBusinessExpenses("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Freelance Effective Hourly Rate Calculator</h1>
          <p className="text-muted-foreground">
            Know what you actually earn per hour. Calculate your real effective rate after non-billable hours, taxes, and business expenses are factored in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="Enter your hourly rate"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Total Hours Worked Per Week</Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  placeholder="Enter total hours worked"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billableHoursPerWeek">Billable Hours Per Week</Label>
                <Input
                  id="billableHoursPerWeek"
                  type="number"
                  placeholder="Enter billable hours"
                  value={billableHoursPerWeek}
                  onChange={(e) => setBillableHoursPerWeek(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="Enter tax rate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessExpenses">Weekly Business Expenses ($)</Label>
                <Input
                  id="businessExpenses"
                  type="number"
                  placeholder="Enter weekly expenses"
                  value={businessExpenses}
                  onChange={(e) => setBusinessExpenses(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateEffectiveRate} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Effective Hourly Rate</p>
                    <p className="text-3xl font-bold text-primary">${result.effectiveHourlyRate.toFixed(2)}/hr</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Weekly Income</p>
                      <p className="text-lg font-bold">${result.grossWeeklyIncome.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Weekly Income</p>
                      <p className="text-lg font-bold">${result.netWeeklyIncome.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {billableHoursPerWeek} billable hours out of {hoursPerWeek} total hours worked</p>
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
