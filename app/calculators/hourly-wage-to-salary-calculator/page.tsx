"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HourlyWageToSalaryCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");
  const [result, setResult] = useState<{
    annualSalary: number;
    monthlySalary: number;
    weeklySalary: number;
    biweeklySalary: number;
  } | null>(null);

  const calculateSalary = () => {
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (isNaN(rate) || isNaN(hours) || isNaN(weeks) || rate <= 0 || hours <= 0 || weeks <= 0) {
      return;
    }

    const annualSalary = rate * hours * weeks;
    const monthlySalary = annualSalary / 12;
    const weeklySalary = rate * hours;
    const biweeklySalary = weeklySalary * 2;

    setResult({ annualSalary, monthlySalary, weeklySalary, biweeklySalary });
  };

  const reset = () => {
    setHourlyRate("");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Hourly Wage to Annual Salary Calculator</h1>
          <p className="text-muted-foreground">
            Convert any hourly pay rate to an annual, monthly, or weekly salary equivalent. Based on your hours worked per week for a fast, accurate comparison.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="Enter hourly wage"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hoursPerWeek">Hours Per Week</Label>
                <Input
                  id="hoursPerWeek"
                  type="number"
                  placeholder="Default 40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeksPerYear">Weeks Per Year</Label>
                <Input
                  id="weeksPerYear"
                  type="number"
                  placeholder="Default 52"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateSalary} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Annual Salary</p>
                    <p className="text-3xl font-bold text-primary">${result.annualSalary.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Monthly Salary</p>
                      <p className="text-lg font-bold">${result.monthlySalary.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Weekly Salary</p>
                      <p className="text-lg font-bold">${result.weeklySalary.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Bi-weekly Salary</p>
                    <p className="text-lg font-bold">${result.biweeklySalary.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on ${parseFloat(hourlyRate).toFixed(2)}/hour × {hoursPerWeek} hours/week × {weeksPerYear} weeks</p>
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
