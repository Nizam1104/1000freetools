"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SleepDebtCalculator() {
  const [recommendedSleep, setRecommendedSleep] = useState<string>("8");
  const [sleepHours, setSleepHours] = useState<string>("");
  const [days, setDays] = useState<string>("7");
  const [results, setResults] = useState<{
    totalDebt: number;
    averageDebt: number;
    dailySleep: number[];
  } | null>(null);

  const calculate = () => {
    const recommended = parseFloat(recommendedSleep);
    const avgSleep = parseFloat(sleepHours);
    const numDays = parseInt(days);

    if (isNaN(recommended) || isNaN(avgSleep) || isNaN(numDays) || recommended <= 0 || numDays <= 0) return;

    // If average sleep is provided, calculate based on that
    const dailySleep = [];
    let totalDebt = 0;

    if (avgSleep > 0) {
      // Use average for all days
      for (let i = 0; i < numDays; i++) {
        dailySleep.push(avgSleep);
        const debt = recommended - avgSleep;
        if (debt > 0) totalDebt += debt;
      }
    } else {
      // Use individual day inputs
      for (let i = 0; i < numDays; i++) {
        dailySleep.push(avgSleep);
      }
    }

    setResults({
      totalDebt: Math.round(totalDebt * 10) / 10,
      averageDebt: Math.round((totalDebt / numDays) * 10) / 10,
      dailySleep,
    });
  };

  const reset = () => {
    setRecommendedSleep("8");
    setSleepHours("");
    setDays("7");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sleep Debt Calculator – How Much Sleep Are You Missing?</CardTitle>
          <CardDescription>
            Are you chronically under-slept? Our sleep debt calculator totals your cumulative sleep deficit over days or weeks so you can understand and address your sleep deprivation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recommended">Recommended Sleep (hours/night)</Label>
              <Input
                id="recommended"
                type="number"
                value={recommendedSleep}
                onChange={(e) => setRecommendedSleep(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">Adults typically need 7-9 hours</p>
            </div>

            <div>
              <Label htmlFor="sleepHours">Average Actual Sleep (hours/night)</Label>
              <Input
                id="sleepHours"
                type="number"
                placeholder="e.g., 6.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="days">Number of Days</Label>
              <Input
                id="days"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Sleep Debt</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sleep Debt</p>
                  <p className="text-4xl font-bold">{results.totalDebt} hours</p>
                  <p className="text-muted-foreground">
                    ≈ {Math.round(results.totalDebt / 24)} days of sleep
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Daily Debt</p>
                  <p className="text-2xl font-bold">{results.averageDebt} hours/night</p>
                </div>
                {results.totalDebt > 14 && (
                  <div className="p-3 bg-destructive/10 rounded-md">
                    <p className="font-medium text-destructive">
                      ⚠️ Severe sleep debt detected! Consider prioritizing sleep recovery.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
