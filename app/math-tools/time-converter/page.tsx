"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimeConverter() {
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("seconds");
  const [toUnit, setToUnit] = useState<string>("minutes");
  const [result, setResult] = useState<number | null>(null);

  const units = [
    { value: "seconds", label: "Seconds" },
    { value: "minutes", label: "Minutes" },
    { value: "hours", label: "Hours" },
    { value: "days", label: "Days" },
    { value: "weeks", label: "Weeks" },
    { value: "months", label: "Months (avg)" },
    { value: "years", label: "Years (avg)" },
  ];

  const convertToSeconds = (val: number, unit: string): number => {
    const toSeconds: Record<string, number> = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
      weeks: 604800,
      months: 2629746,
      years: 31556952,
    };
    return val * toSeconds[unit];
  };

  const convertFromSeconds = (seconds: number, unit: string): number => {
    const fromSeconds: Record<string, number> = {
      seconds: 1,
      minutes: 1 / 60,
      hours: 1 / 3600,
      days: 1 / 86400,
      weeks: 1 / 604800,
      months: 1 / 2629746,
      years: 1 / 31556952,
    };
    return seconds * fromSeconds[unit];
  };

  const convert = () => {
    const val = parseFloat(value);
    if (!val) {
      setResult(null);
      return;
    }

    const seconds = convertToSeconds(val, fromUnit);
    const converted = convertFromSeconds(seconds, toUnit);
    setResult(converted);
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  const loadExample = () => {
    setValue("3600");
    setFromUnit("seconds");
    setToUnit("hours");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Time Converter – Convert Seconds, Minutes, Hours, Days Online</h1>
        <p className="text-muted-foreground">
          Convert between any time unit with our free online time converter. Quickly convert between seconds, minutes, hours, days, weeks, months, and years with precise results.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Convert Time Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                placeholder="e.g., 3600"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromUnit">From</Label>
              <select
                id="fromUnit"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toUnit">To</Label>
              <select
                id="toUnit"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convert} className="flex-1">
              Convert
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
            <Button onClick={loadExample} variant="outline">
              Example
            </Button>
          </div>

          {result !== null && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Result</div>
              <div className="text-4xl font-bold">
                {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {value} {fromUnit} = {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toUnit}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Time Unit Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 font-semibold">Unit</th>
                <th className="text-left py-2 px-3 font-semibold">Seconds</th>
                <th className="text-left py-2 px-3 font-semibold">Minutes</th>
                <th className="text-left py-2 px-3 font-semibold">Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3">1 Minute</td>
                <td className="py-2 px-3">60</td>
                <td className="py-2 px-3">1</td>
                <td className="py-2 px-3">0.0167</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">1 Hour</td>
                <td className="py-2 px-3">3,600</td>
                <td className="py-2 px-3">60</td>
                <td className="py-2 px-3">1</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">1 Day</td>
                <td className="py-2 px-3">86,400</td>
                <td className="py-2 px-3">1,440</td>
                <td className="py-2 px-3">24</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">1 Week</td>
                <td className="py-2 px-3">604,800</td>
                <td className="py-2 px-3">10,080</td>
                <td className="py-2 px-3">168</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">1 Month (avg)</td>
                <td className="py-2 px-3">2,629,746</td>
                <td className="py-2 px-3">43,829</td>
                <td className="py-2 px-3">730.5</td>
              </tr>
              <tr>
                <td className="py-2 px-3">1 Year (avg)</td>
                <td className="py-2 px-3">31,556,952</td>
                <td className="py-2 px-3">525,949</td>
                <td className="py-2 px-3">8,766</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Common Time Conversions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Work Hours</div>
            <p className="text-xs text-muted-foreground">
              8 hours = 480 minutes = 28,800 seconds. A standard workday.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Weeks to Days</div>
            <p className="text-xs text-muted-foreground">
              1 week = 7 days. 2 weeks = 14 days. 4 weeks = 28 days.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Hours in a Year</div>
            <p className="text-xs text-muted-foreground">
              1 year = 365.25 days (average) = 8,766 hours = 525,949 minutes.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Movie Runtime</div>
            <p className="text-xs text-muted-foreground">
              2 hours = 120 minutes. A typical movie length.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are months and years approximate?</h4>
            <p className="text-xs text-muted-foreground">
              Months vary from 28-31 days, and years can be 365 or 366 days (leap year). We use averages: 30.44 days per month and 365.25 days per year.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert decimal hours to hours and minutes?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply the decimal part by 60. For example, 2.75 hours = 2 hours + (0.75 × 60) = 2 hours 45 minutes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a sidereal and solar day?</h4>
            <p className="text-xs text-muted-foreground">
              A solar day (24 hours) is based on the Sun's position. A sidereal day (23h 56m) is Earth's actual rotation period relative to distant stars.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
