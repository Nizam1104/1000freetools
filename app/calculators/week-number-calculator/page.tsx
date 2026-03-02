"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WeekNumberCalculator() {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{week: number, year: number, start: string, end: string} | null>(null);

  const getISOWeek = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
  };

  const getWeekRange = (date: Date) => {
    const day = date.getDay() || 7;
    const start = new Date(date);
    start.setDate(date.getDate() - day + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0]
    };
  };

  const calculate = () => {
    if (!date) return;

    const inputDate = new Date(date);
    const [year, week] = getISOWeek(inputDate);
    const { start, end } = getWeekRange(inputDate);

    setResult({
      week,
      year,
      start,
      end
    });
  };

  const reset = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Week Number Calculator – Find ISO Week Number for Any Date</CardTitle>
          <CardDescription>
            Look up the week number for any date instantly. Our ISO week number calculator also shows the start and end dates for any given week of the year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">ISO Week Number</p>
                <p className="text-4xl font-bold mt-1">Week {result.week}</p>
                <p className="text-lg font-medium mt-1">{result.year}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Week Range</p>
                  <p className="text-lg font-medium mt-1">
                    {result.start} to {result.end}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
