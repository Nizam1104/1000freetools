"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SalaryToHourlyCalculatorPage() {
  const [salary, setSalary] = useState<string>("");
  const [salaryType, setSalaryType] = useState<string>("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");
  const [result, setResult] = useState<{
    hourlyRate: number;
    dailyRate: number;
    weeklyRate: number;
    monthlyRate: number;
  } | null>(null);

  const calculateHourly = () => {
    const sal = parseFloat(salary);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (isNaN(sal) || isNaN(hours) || isNaN(weeks) || sal <= 0 || hours <= 0 || weeks <= 0) {
      return;
    }

    let annualSalary = sal;
    if (salaryType === "monthly") {
      annualSalary = sal * 12;
    } else if (salaryType === "weekly") {
      annualSalary = sal * weeks;
    }

    const hourlyRate = annualSalary / (hours * weeks);
    const dailyRate = hourlyRate * hours;
    const weeklyRate = hourlyRate * hours;
    const monthlyRate = annualSalary / 12;

    setResult({ hourlyRate, dailyRate, weeklyRate, monthlyRate });
  };

  const reset = () => {
    setSalary("");
    setSalaryType("annual");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Salary to Hourly Rate Calculator</h1>
          <p className="text-muted-foreground">
            Convert your annual or monthly salary to an equivalent hourly rate. Customize based on work hours and days per week for a true per-hour breakdown.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Amount</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="Enter salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryType">Salary Type</Label>
                <Select value={salaryType} onValueChange={setSalaryType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button onClick={calculateHourly} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="text-3xl font-bold text-primary">${result.hourlyRate.toFixed(2)}/hr</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Daily Rate</p>
                      <p className="text-lg font-bold">${result.dailyRate.toFixed(2)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Weekly Rate</p>
                      <p className="text-lg font-bold">${result.weeklyRate.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Monthly Rate</p>
                    <p className="text-lg font-bold">${result.monthlyRate.toFixed(2)}</p>
                  </div>
                  <div className="text-sm text-muted-foreground pt-4 border-t">
                    <p>Based on {hoursPerWeek} hours/week, {weeksPerYear} weeks/year</p>
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
