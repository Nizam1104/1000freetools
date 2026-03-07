"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    hours: number;
    inclusive: number;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setError("Please enter both start and end dates");
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid date format");
      setResult(null);
      return;
    }

    if (start > end) {
      setError("Start date must be before end date");
      setResult(null);
      return;
    }

    const diffTime = end.getTime() - start.getTime();
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const hours = Math.floor(diffTime / (1000 * 60 * 60));

    let years = end.getFullYear() - start.getFullYear();
    let months = years * 12 + (end.getMonth() - start.getMonth());
    
    if (end.getDate() < start.getDate()) {
      months--;
    }

    setResult({
      days,
      weeks,
      months,
      years: Math.floor(months / 12),
      hours,
      inclusive: days + 1,
    });
    setError("");
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    const today = new Date();
    const start = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Date Difference Calculator – Find Days Between Two Dates</h1>
        <p className="text-muted-foreground">
          Calculate the exact difference between any two dates in days, weeks, months, and years with our free online date difference calculator. Instant and accurate date comparison.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDifference}>Calculate Difference</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 bg-primary text-primary-foreground rounded-lg text-center">
                <p className="text-4xl font-bold">{result.days.toLocaleString()}</p>
                <p className="text-sm opacity-80">Days</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.weeks.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Weeks</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.months.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Months</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.years}</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.hours.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-3xl font-bold">{result.inclusive.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Days (inclusive)</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Date Range</h4>
              <p className="text-sm text-muted-foreground">
                From <strong>{new Date(startDate).toLocaleDateString()}</strong> to <strong>{new Date(endDate).toLocaleDateString()}</strong>
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
