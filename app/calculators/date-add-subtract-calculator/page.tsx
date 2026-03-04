"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DateAddSubtractCalculator() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [value, setValue] = useState<string>("");
  const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
  const [result, setResult] = useState<string>("");

  const calculate = () => {
    if (!startDate || !value) return;

    const val = parseInt(value);
    if (isNaN(val) || val <= 0) return;

    const date = new Date(startDate);
    const multiplier = operation === "add" ? 1 : -1;

    switch (unit) {
      case "days":
        date.setDate(date.getDate() + (val * multiplier));
        break;
      case "weeks":
        date.setDate(date.getDate() + (val * 7 * multiplier));
        break;
      case "months":
        date.setMonth(date.getMonth() + (val * multiplier));
        break;
      case "years":
        date.setFullYear(date.getFullYear() + (val * multiplier));
        break;
    }

    setResult(date.toISOString().split("T")[0]);
  };

  const reset = () => {
    setStartDate(new Date().toISOString().split("T")[0]);
    setValue("");
    setResult("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Date Calculator – Add or Subtract Days, Weeks & Months from a Date</CardTitle>
          <CardDescription>
            Find past or future dates instantly by adding or subtracting time from any date. Works with days, weeks, months, and years for deadlines, events, and planning.
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
              <Label>Operation</Label>
              <Select value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add</SelectItem>
                  <SelectItem value="subtract">Subtract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Amount</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="e.g., 30"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
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
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Result Date</p>
                <p className="text-4xl font-bold mt-1">{result}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {operation === "add" ? "Added" : "Subtracted"} {value} {unit} {operation === "add" ? "to" : "from"} {startDate}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              How to Use This Date Calculator
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Select your starting date</p>
                  <p>Choose any date from the calendar picker. This is your reference point for adding or subtracting time.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Choose add or subtract and enter the amount</p>
                  <p>Select whether to move forward or backward in time. Enter the number of days, weeks, months, or years to calculate.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Click Calculate to see the result</p>
                  <p>The calculator handles month boundaries, leap years, and varying month lengths automatically.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Date Calculation Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Unit</th>
                    <th className="text-left py-3 px-2 font-semibold">Equals</th>
                    <th className="text-left py-3 px-2 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-3 px-2">1 week</td>
                    <td className="py-3 px-2">7 days</td>
                    <td className="py-3 px-2">Fixed length</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 month</td>
                    <td className="py-3 px-2">28-31 days</td>
                    <td className="py-3 px-2">Varies by month</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">1 year</td>
                    <td className="py-3 px-2">365 or 366 days</td>
                    <td className="py-3 px-2">366 in leap years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-2">Average month</td>
                    <td className="py-3 px-2">30.44 days</td>
                    <td className="py-3 px-2">365.25 / 12</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Leap year</td>
                    <td className="py-3 px-2">Every 4 years</td>
                    <td className="py-3 px-2">Except century years not divisible by 400</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Month calculations preserve the day number when possible. Adding 1 month to January 31 gives February 28 (or 29 in leap years).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Understanding Date Arithmetic
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Why Month Addition Is Tricky</h4>
                <p>
                  Months have different lengths: 28, 29, 30, or 31 days. When you add &quot;1 month&quot; to January 31, should the result be March 3 (31 days later) or February 28 (same day number)? This calculator uses day-number preservation — the result is February 28.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Leap Year Rules</h4>
                <p>
                  Leap years occur every 4 years, adding February 29. Exception: century years (1900, 2000) are only leap years if divisible by 400. So 2000 was a leap year, but 1900 was not. This keeps our calendar aligned with Earth&apos;s orbit.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Business Days vs Calendar Days</h4>
                <p>
                  This calculator uses calendar days. For business calculations, you&apos;d exclude weekends and holidays. Adding 30 business days typically equals about 6 weeks of calendar time. Use a business day calculator for project deadlines.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">ISO 8601 Date Format</h4>
                <p>
                  Dates are displayed in YYYY-MM-DD format (ISO 8601). This international standard avoids confusion between MM/DD/YYYY and DD/MM/YYYY formats. It also sorts correctly in alphabetical order.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Use Cases
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Project Deadlines</p>
                  <p>Calculate when a project is due by adding the timeline to the start date. Add 90 days for a quarterly project, or 6 months for a longer initiative.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Contract End Dates</p>
                  <p>Find when a lease, subscription, or employment contract ends. Add 12 months for annual contracts or 36 months for typical car leases.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Pregnancy Due Dates</p>
                  <p>Calculate estimated due dates by adding 40 weeks (280 days) to the last menstrual period. This is Naegele&apos;s rule, used by healthcare providers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Historical Research</p>
                  <p>Subtract years to find dates in the past. Calculate ages, anniversaries, or how long ago historical events occurred.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">How do you add months to a date?</h4>
                <p>
                  Add the number of months to the month component, keeping the same day number. If the resulting month doesn&apos;t have that day (like February 31), use the last day of that month instead.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Does this calculator account for leap years?</h4>
                <p>
                  Yes. When adding years or calculating across February, the calculator correctly handles leap years. February 29, 2024 plus 1 year equals February 28, 2025 (no Feb 29 in 2025).
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What&apos;s the difference between adding 30 days vs 1 month?</h4>
                <p>
                  Adding 30 days always moves forward exactly 30 calendar days. Adding 1 month moves to the same day number next month, which could be 28, 29, 30, or 31 days depending on the months involved.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Can I calculate dates in the past?</h4>
                <p>
                  Yes. Use the &quot;Subtract&quot; operation to go backward in time. This is useful for finding historical dates, calculating birth dates from ages, or determining when something started.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How accurate is this for business planning?</h4>
                <p>
                  For calendar-based planning, it&apos;s exact. For business-day planning (excluding weekends/holidays), use a dedicated business day calculator. Bank processing, shipping estimates, and project timelines often need business days, not calendar days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Related Tools
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="/calculators/date-difference-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Date Difference Calculator</span>
                <p className="text-muted-foreground">Find the number of days, weeks, and months between two dates</p>
              </a>
              <a
                href="/calculators/business-day-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Business Day Calculator</span>
                <p className="text-muted-foreground">Add or subtract business days, excluding weekends and holidays</p>
              </a>
              <a
                href="/calculators/age-calculator"
                className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">Age Calculator</span>
                <p className="text-muted-foreground">Calculate exact age in years, months, and days from birth date</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
