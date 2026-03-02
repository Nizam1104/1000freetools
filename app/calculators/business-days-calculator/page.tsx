"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [result, setResult] = useState<{businessDays: number, totalDays: number} | null>(null);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const calculate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    let businessDays = 0;
    const current = new Date(start);

    while (current <= end) {
      if (!isWeekend(current)) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    setResult({
      businessDays,
      totalDays
    });
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Business Days Calculator – Count Working Days Between Dates</CardTitle>
          <CardDescription>
            Count the number of working/business days between two dates, excluding weekends and holidays. Perfect for project planning and deadline calculations.
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
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Days Between Dates</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-3xl font-bold">{result.businessDays}</p>
                    <p className="text-sm text-muted-foreground">Business Days</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{result.totalDays}</p>
                    <p className="text-sm text-muted-foreground">Total Days</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Excludes weekends (Saturday and Sunday). Does not account for holidays.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
