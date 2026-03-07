"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DaysUntilSinceCalculator() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    hours: number;
    minutes: number;
    seconds: number;
    businessDays: number;
    weekends: number;
    direction: "until" | "since" | "today";
  } | null>(null);
  const [error, setError] = useState("");

  const calculateDays = () => {
    if (!fromDate || !toDate) {
      setError("Please enter both dates");
      setResult(null);
      return;
    }

    try {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const diffTime = to.getTime() - from.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffSeconds = Math.floor(diffTime / 1000);

      // Calculate business days (excluding weekends)
      let businessDays = 0;
      let weekends = 0;
      const current = new Date(from);
      const direction = diffDays >= 0 ? 1 : -1;
      
      while ((direction > 0 && current < to) || (direction < 0 && current > to)) {
        const day = current.getDay();
        if (day === 0 || day === 6) {
          weekends++;
        } else {
          businessDays++;
        }
        current.setDate(current.getDate() + direction);
      }

      if (direction < 0) {
        businessDays = -businessDays;
        weekends = -weekends;
      }

      let years = to.getFullYear() - from.getFullYear();
      let months = years * 12 + (to.getMonth() - from.getMonth());
      if (to.getDate() < from.getDate()) {
        months--;
      }

      setResult({
        days: Math.abs(diffDays),
        weeks: Math.floor(Math.abs(diffDays) / 7),
        months: Math.abs(months),
        years: Math.floor(Math.abs(months) / 12),
        hours: Math.abs(diffHours),
        minutes: Math.abs(diffMinutes),
        seconds: Math.abs(diffSeconds),
        businessDays: Math.abs(businessDays),
        weekends: Math.abs(weekends),
        direction: diffDays > 0 ? "until" : diffDays < 0 ? "since" : "today",
      });
      setError("");
    } catch (e) {
      setError("Error calculating days. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setFromDate("");
    setToDate("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    const today = new Date();
    const future = new Date(today);
    future.setDate(future.getDate() + 100);
    setFromDate(today.toISOString().split("T")[0]);
    setToDate(future.toISOString().split("T")[0]);
    setResult(null);
  };

  const loadNewYear = () => {
    const today = new Date();
    const newYear = new Date(today.getFullYear() + 1, 0, 1);
    setFromDate(today.toISOString().split("T")[0]);
    setToDate(newYear.toISOString().split("T")[0]);
    setResult(null);
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Days Until/Since Calculator – Count Days Between Dates</h1>
        <p className="text-muted-foreground">
          Calculate days until a future date or days since a past date with our free online countdown calculator. See the exact count in days, weeks, months, and years with business day breakdown.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>From Date</Label>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <Label>To Date</Label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDays}>Calculate Days</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>100 Days Example</Button>
          <Button variant="outline" onClick={loadNewYear}>Until New Year</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {result.direction === "until" ? "Days Until" : result.direction === "since" ? "Days Since" : "It's Today!"}
              </p>
              <p className="text-6xl font-bold text-primary">{result.days.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {formatDate(fromDate)} → {formatDate(toDate)}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.weeks.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Weeks</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.months.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Months</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.years}</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-3xl font-bold">{result.hours.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Hours</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Day Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Days:</span>
                    <span className="font-semibold">{result.businessDays.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekend Days:</span>
                    <span className="font-semibold">{result.weekends.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Days:</span>
                    <span className="font-semibold">{result.days.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Time Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minutes:</span>
                    <span className="font-semibold">{result.minutes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seconds:</span>
                    <span className="font-semibold">{result.seconds.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Percentage of Year</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Days remaining/elapsed:</span>
                  <span className="font-semibold">{result.days} of 365</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${Math.min((result.days / 365) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {((result.days / 365) * 100).toFixed(1)}%
                </p>
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
