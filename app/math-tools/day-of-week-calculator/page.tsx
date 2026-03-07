"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DayOfWeekCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{
    dayOfWeek: string;
    dayNumber: number;
    isWeekend: boolean;
    dayOfYear: number;
    weekNumber: number;
    quarter: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateDayOfWeek = () => {
    if (!date) {
      setError("Please enter a date");
      setResult(null);
      return;
    }

    try {
      const inputDate = new Date(date);
      if (isNaN(inputDate.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayIndex = inputDate.getDay();
      
      const startOfYear = new Date(inputDate.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((inputDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const weekNumber = Math.ceil(dayOfYear / 7);
      
      const month = inputDate.getMonth();
      const quarter = Math.floor(month / 3) + 1;

      setResult({
        dayOfWeek: days[dayIndex],
        dayNumber: dayIndex,
        isWeekend: dayIndex === 0 || dayIndex === 6,
        dayOfYear,
        weekNumber,
        quarter,
      });
      setError("");
    } catch (e) {
      setError("Error calculating day of week. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setDate("");
    setResult(null);
    setError("");
  };

  const loadToday = () => {
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
    setResult(null);
  };

  const loadExample = () => {
    setDate("2025-07-04");
    setResult(null);
  };

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Day of Week Calculator – Find What Day Any Date Falls On</h1>
        <p className="text-muted-foreground">
          Discover what day of the week any date falls on with our free online day calculator. Instantly find the weekday for past, present, or future dates with additional date information.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Select a Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDayOfWeek}>Find Day of Week</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadToday}>Today</Button>
          <Button variant="outline" onClick={loadExample}>Example Date</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                {formatDate(date)}
              </p>
              <p className="text-5xl font-bold text-primary">{result.dayOfWeek}</p>
              <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${result.isWeekend ? 'bg-red-500/20 text-red-700 dark:text-red-400' : 'bg-green-500/20 text-green-700 dark:text-green-400'}`}>
                {result.isWeekend ? "Weekend" : "Weekday"}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.dayNumber}</p>
                <p className="text-sm text-muted-foreground">Day Number (0=Sun)</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.dayOfYear}</p>
                <p className="text-sm text-muted-foreground">Day of Year</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.weekNumber}</p>
                <p className="text-sm text-muted-foreground">Week of Year</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">Q{result.quarter}</p>
                <p className="text-sm text-muted-foreground">Quarter</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Date Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Year:</span>
                  <span className="ml-2 font-semibold">{new Date(date).getFullYear()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Month:</span>
                  <span className="ml-2 font-semibold">{new Date(date).toLocaleDateString("en-US", { month: "long" })}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Days in Month:</span>
                  <span className="ml-2 font-semibold">{new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0).getDate()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Is Leap Year:</span>
                  <span className="ml-2 font-semibold">{(new Date(date).getFullYear() % 4 === 0 && new Date(date).getFullYear() % 100 !== 0) || new Date(date).getFullYear() % 400 === 0 ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
