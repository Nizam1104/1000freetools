"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [difference, setDifference] = useState<{days: number, weeks: number, months: number, years: number} | null>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor(diffDays / 30.44);
    const weeks = Math.floor(diffDays / 7);

    setDifference({
      days: diffDays,
      weeks,
      months,
      years
    });
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setDifference(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Date Difference Calculator – Days Between Two Dates</CardTitle>
          <CardDescription>
            Easily find the difference between any two dates. Our date difference calculator returns results in days, weeks, months, and years—perfect for planning and tracking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Difference</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {difference !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Time Between Dates</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-2xl font-bold">{difference.days.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{difference.weeks.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Weeks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{difference.months.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Months</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{difference.years.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Years</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
