"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const loadExample = (val: string, from: string, to: string) => {
    setValue(val);
    setFromUnit(from);
    setToUnit(to);
    setResult(null);
  };

  const getFormula = () => {
    const conversionFactors: Record<string, Record<string, number>> = {
      seconds: { minutes: 60, hours: 3600, days: 86400, weeks: 604800 },
      minutes: { seconds: 60, hours: 60, days: 1440 },
      hours: { seconds: 3600, minutes: 60, days: 24 },
      days: { seconds: 86400, minutes: 1440, hours: 24, weeks: 7 },
      weeks: { days: 7 },
    };
    return conversionFactors[fromUnit]?.[toUnit] || conversionFactors[toUnit]?.[fromUnit];
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Time Converter – Convert Seconds, Minutes, Hours, Days Online</h1>
        <p className="text-muted-foreground">
          Convert between any time unit with our free online time converter. Quickly convert between seconds, minutes, hours, days, weeks, months, and years with precise results.
        </p>
      </div>

      <div className="space-y-4">
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
            <Select value={fromUnit} onValueChange={(v) => { setFromUnit(v); setResult(null); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="toUnit">To</Label>
            <Select value={toUnit} onValueChange={(v) => { setToUnit(v); if (value) convert(); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("3600", "seconds", "hours")}>3600 sec to hours</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("24", "hours", "days")}>24 hours to days</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("90", "minutes", "hours")}>90 min to hours</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2", "weeks", "days")}>2 weeks to days</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1", "years", "days")}>1 year to days</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("48", "hours", "minutes")}>48 hours to min</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("7", "days", "hours")}>7 days to hours</Button>
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
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Time Units</h2>
          <p className="text-muted-foreground">
            Time measurement is fundamental to human civilization. We divide time into standardized units: 60 seconds make a minute, 60 minutes make an hour, 24 hours make a day. These divisions come from ancient Babylonian mathematics (base-60) and Earth's rotation. Converting between units helps us understand durations in meaningful ways.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Need to know how many minutes are in 2.5 hours? How many days in 10,000 hours? This converter handles all the multiplication and division so you can focus on planning, scheduling, or solving physics problems.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Time Unit Reference</h3>
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

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Seconds to hours</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Convert 7,200 seconds to hours
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 7,200 ÷ 3,600 = 2 hours
            </p>
            <p className="text-sm text-muted-foreground">
              There are 3,600 seconds in an hour, so divide by 3,600.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Hours to days</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: How many days are in 100 hours?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 100 ÷ 24 = 4.167 days
            </p>
            <p className="text-sm text-muted-foreground">
              That's 4 days and 4 hours (0.167 × 24 ≈ 4).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Weeks to minutes</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Convert 2 weeks to minutes
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 2 weeks = 14 days = 336 hours = 20,160 minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Or: 2 × 7 × 24 × 60 = 20,160 minutes.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Years to days</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: How many days in 5 years?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Average year = 365.25 days (accounts for leap years)
            </p>
            <p className="text-sm text-muted-foreground">
              5 × 365.25 = 1,826.25 days. About 1,826 days.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Mixed conversion</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: A movie is 142 minutes long. Express in hours and minutes.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: 142 ÷ 60 = 2.367 hours
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              2 hours + (0.367 × 60) = 2 hours 22 minutes
            </p>
            <p className="text-sm text-muted-foreground">
              The movie runs 2 hours and 22 minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            The 60-second minute and 60-minute hour come from ancient Babylonians who used base-60 (sexagesimal) mathematics around 2000 BCE. This system was convenient because 60 has many divisors (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60). The 24-hour day comes from ancient Egyptians who divided daylight into 12 hours and nighttime into 12 hours.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Common Time Conversions</h3>
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
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Sleep Duration</div>
            <p className="text-xs text-muted-foreground">
              8 hours = 1/3 of a day. Recommended adult sleep.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold text-sm mb-2">Commute Time</div>
            <p className="text-xs text-muted-foreground">
              30 minutes each way = 5 hours/week = 260 hours/year commuting.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why are months and years approximate?</h4>
            <p className="text-sm text-muted-foreground">
              Months vary from 28-31 days, and years can be 365 or 366 days (leap year). We use averages: 30.44 days per month and 365.25 days per year. For precise calculations, specify exact dates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert decimal hours to hours and minutes?</h4>
            <p className="text-sm text-muted-foreground">
              Multiply the decimal part by 60. For example, 2.75 hours = 2 hours + (0.75 × 60) = 2 hours 45 minutes. The whole number stays as hours; convert only the decimal portion.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a sidereal and solar day?</h4>
            <p className="text-sm text-muted-foreground">
              A solar day (24 hours) is based on the Sun's position. A sidereal day (23h 56m) is Earth's actual rotation period relative to distant stars. The 4-minute difference comes from Earth's orbit around the Sun.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does a year have 365.25 days?</h4>
            <p className="text-sm text-muted-foreground">
              Earth takes about 365.2422 days to orbit the Sun. We round to 365.25 and add a leap day every 4 years. Century years aren't leap years unless divisible by 400 (so 2000 was a leap year, 2100 won't be).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many seconds are in a day?</h4>
            <p className="text-sm text-muted-foreground">
              24 hours × 60 minutes × 60 seconds = 86,400 seconds. This is exact for a standard day. Leap seconds are occasionally added to atomic time to keep it synchronized with Earth's rotation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's a Julian year?</h4>
            <p className="text-sm text-muted-foreground">
              In astronomy, a Julian year is exactly 365.25 days of 86,400 seconds each = 31,557,600 seconds. It's used for calculating orbital periods and light-years. Different from the calendar year which averages 365.2425 days.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/time-duration-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Time Duration Calculator</p>
            <p className="text-xs text-muted-foreground">Time between times</p>
          </a>
          <a href="/math-tools/date-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Calculator</p>
            <p className="text-xs text-muted-foreground">Date calculations</p>
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
