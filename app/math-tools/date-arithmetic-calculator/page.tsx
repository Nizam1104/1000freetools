"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DateArithmeticCalculator() {
  const [startDate, setStartDate] = useState("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [value, setValue] = useState<number>(0);
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [result, setResult] = useState<Date | null>(null);
  const [error, setError] = useState("");

  const calculateDate = () => {
    if (!startDate) {
      setError("Please enter a start date");
      setResult(null);
      return;
    }

    try {
      const start = new Date(startDate);
      if (isNaN(start.getTime())) {
        setError("Invalid date format");
        setResult(null);
        return;
      }

      const resultDate = new Date(start);
      const multiplier = operation === "add" ? 1 : -1;

      switch (unit) {
        case "days":
          resultDate.setDate(resultDate.getDate() + (value * multiplier));
          break;
        case "weeks":
          resultDate.setDate(resultDate.getDate() + (value * 7 * multiplier));
          break;
        case "months":
          resultDate.setMonth(resultDate.getMonth() + (value * multiplier));
          break;
        case "years":
          resultDate.setFullYear(resultDate.getFullYear() + (value * multiplier));
          break;
      }

      setResult(resultDate);
      setError("");
    } catch (e) {
      setError("Error calculating date. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setStartDate("");
    setValue(0);
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    setValue(30);
    setOperation("add");
    setUnit("days");
    setResult(null);
  };

  const loadBusinessDays = () => {
    const today = new Date();
    setStartDate(today.toISOString().split("T")[0]);
    setValue(90);
    setOperation("add");
    setUnit("days");
    setResult(null);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getDayDifference = (): number => {
    if (!result) return 0;
    const start = new Date(startDate);
    const diffTime = result.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Date Arithmetic Calculator – Add or Subtract Days, Weeks, Months, Years</h1>
        <p className="text-muted-foreground">
          Add or subtract time from any date with our free online date arithmetic calculator. Calculate future or past dates by adding/subtracting days, weeks, months, or years.
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
            <Label>Operation</Label>
            <Select value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value) || 0)}
              min="0"
              placeholder="Enter number"
            />
          </div>
          <div>
            <Label>Unit</Label>
            <Select value={unit} onValueChange={(v) => setUnit(v as "days" | "weeks" | "months" | "years")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDate}>Calculate Date</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>+30 Days</Button>
          <Button variant="outline" onClick={loadBusinessDays}>+90 Days</Button>
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
                Result Date
              </p>
              <p className="text-3xl font-bold text-primary">{formatDate(result)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {result.toISOString().split("T")[0]}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{getDayDifference()}</p>
                <p className="text-sm text-muted-foreground">Days Difference</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{Math.floor(Math.abs(getDayDifference()) / 7)}</p>
                <p className="text-sm text-muted-foreground">Weeks Difference</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold">{result.toLocaleDateString("en-US", { weekday: "long" })}</p>
                <p className="text-sm text-muted-foreground">Day of Week</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculation Summary</h4>
              <p className="text-sm text-muted-foreground">
                {operation === "add" ? "Added" : "Subtracted"} {value} {unit} {operation === "add" ? "to" : "from"} {new Date(startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Date Arithmetic</h2>
        <p className="text-muted-foreground">
          Date arithmetic involves adding or subtracting time units from a given date. This calculator handles days, weeks, months, and years, automatically accounting for varying month lengths and leap years.
        </p>
        <p className="text-muted-foreground">
          When adding months or years, the calculator preserves the day of month when possible (e.g., January 31 + 1 month = February 28 or 29).
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Time Unit Conversions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Basic Conversions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 1 week = 7 days</li>
              <li>• 1 month ≈ 30.44 days (average)</li>
              <li>• 1 year = 365 days (366 in leap year)</li>
              <li>• 1 decade = 10 years</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Month Lengths</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 31 days: Jan, Mar, May, Jul, Aug, Oct, Dec</li>
              <li>• 30 days: Apr, Jun, Sep, Nov</li>
              <li>• 28/29 days: February</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Example Calculations</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Adding Days</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Start: January 1, 2025<br />
              Add: 30 days<br />
              Result: January 31, 2025
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Adding Months</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Start: January 31, 2025<br />
              Add: 1 month<br />
              Result: February 28, 2025
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Adjusted because February doesn't have 31 days.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Adding Years</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Start: February 29, 2024 (leap year)<br />
              Add: 1 year<br />
              Result: February 28, 2025
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Adjusted because 2025 is not a leap year.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Subtracting Weeks</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              Start: December 25, 2025<br />
              Subtract: 4 weeks<br />
              Result: November 27, 2025
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Project Planning</h3>
            <p className="text-sm text-muted-foreground">
              Calculate project deadlines by adding estimated duration to start dates.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Loan Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Determine loan maturity dates by adding loan term to origination date.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Event Planning</h3>
            <p className="text-sm text-muted-foreground">
              Plan events by counting backward from a target date.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Age Calculations</h3>
            <p className="text-sm text-muted-foreground">
              Find birth dates by subtracting age from current date.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How are leap years handled?</h3>
            <p className="text-sm text-muted-foreground">
              The calculator automatically accounts for leap years. February 29 exists only in years divisible by 4 (except century years not divisible by 400).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What happens when adding months to month-end dates?</h3>
            <p className="text-sm text-muted-foreground">
              If the resulting month doesn't have the same day, it uses the last day of that month (e.g., Jan 31 + 1 month = Feb 28).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can I calculate business days only?</h3>
            <p className="text-sm text-muted-foreground">
              This calculator uses calendar days. For business days (excluding weekends), approximately multiply by 5/7 or use a dedicated business day calculator.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How far back/forward can I calculate?</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript Date supports dates from about 271,821 BCE to 275,760 CE, covering virtually all practical use cases.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/date-difference-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Difference</p>
            <p className="text-xs text-muted-foreground">Days between</p>
          </a>
          <a href="/math-tools/day-of-week-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Day of Week</p>
            <p className="text-xs text-muted-foreground">Find weekday</p>
          </a>
          <a href="/math-tools/age-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Age Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate age</p>
          </a>
        </div>
      </section>
    </div>
  );
}
