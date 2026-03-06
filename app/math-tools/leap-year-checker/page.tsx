"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LeapYearChecker() {
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{
    isLeap: boolean;
    explanation: string;
    nextLeap: number;
    prevLeap: number;
  } | null>(null);
  const [error, setError] = useState("");

  const checkLeapYear = (year: number) => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
    let explanation = "";
    if (year % 400 === 0) {
      explanation = `${year} is divisible by 400, so it's a leap year`;
    } else if (year % 100 === 0) {
      explanation = `${year} is divisible by 100 but not 400, so it's NOT a leap year`;
    } else if (year % 4 === 0) {
      explanation = `${year} is divisible by 4 but not 100, so it's a leap year`;
    } else {
      explanation = `${year} is not divisible by 4, so it's NOT a leap year`;
    }

    let nextLeap = year + 1;
    while (!((nextLeap % 4 === 0 && nextLeap % 100 !== 0) || (nextLeap % 400 === 0))) {
      nextLeap++;
    }

    let prevLeap = year - 1;
    while (!((prevLeap % 4 === 0 && prevLeap % 100 !== 0) || (prevLeap % 400 === 0))) {
      prevLeap--;
    }

    return { isLeap, explanation, nextLeap, prevLeap };
  };

  const calculate = () => {
    const num = parseInt(year.trim());

    if (isNaN(num)) {
      setError("Please enter a valid year");
      setResult(null);
      return;
    }

    if (num < 1 || num > 9999) {
      setError("Please enter a year between 1 and 9999");
      setResult(null);
      return;
    }

    setError("");
    setResult(checkLeapYear(num));
  };

  const reset = () => {
    setYear("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Leap Year Checker – Check If a Year Is a Leap Year</h1>
        <p className="text-muted-foreground">
          Find out if any year is a leap year with our free online leap year checker. Get instant results with clear explanations of the leap year rules.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter a year</Label>
          <Input
            type="text"
            placeholder="e.g., 2024"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Check Leap Year</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${result.isLeap ? "bg-green-500/10 border border-green-500/30" : "bg-muted"}`}>
              <p className={`text-5xl font-bold mb-2 ${result.isLeap ? "text-green-600" : ""}`}>
                {result.isLeap ? "Leap Year" : "Not a Leap Year"}
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Previous Leap Year</p>
                <p className="text-2xl font-bold">{result.prevLeap}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Next Leap Year</p>
                <p className="text-2xl font-bold">{result.nextLeap}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is a Leap Year?</h2>
        <p className="text-muted-foreground">
          A leap year has 366 days instead of the usual 365. The extra day gets added to February, making it 29 days long instead of 28. This adjustment keeps our calendar in sync with Earth's orbit around the Sun.
        </p>
        <p className="text-muted-foreground">
          Earth takes about 365.2422 days to orbit the Sun – not exactly 365 days. Without leap years, our calendar would drift by about 6 hours each year. After 100 years, we'd be off by roughly 24 days. Seasons would slowly shift, and eventually summer would happen during what the calendar calls winter.
        </p>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Leap Year Rules</h2>
        <p className="text-muted-foreground">
          The Gregorian calendar uses three rules to determine leap years:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">Rule 1: Divisible by 4</h3>
            <p className="text-sm text-muted-foreground">
              If a year is divisible by 4, it's a leap year – unless Rule 2 applies.
            </p>
            <p className="text-xs font-mono mt-2">2024 ÷ 4 = 506 ✓ Leap year</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Rule 2: Divisible by 100</h3>
            <p className="text-sm text-muted-foreground">
              If a year is divisible by 100, it's NOT a leap year – unless Rule 3 applies.
            </p>
            <p className="text-xs font-mono mt-2">1900 ÷ 100 = 19 ✗ Not a leap year</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">Rule 3: Divisible by 400</h3>
            <p className="text-sm text-muted-foreground">
              If a year is divisible by 400, it IS a leap year.
            </p>
            <p className="text-xs font-mono mt-2">2000 ÷ 400 = 5 ✓ Leap year</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Leap Year Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">Recent Leap Years</span>
            </div>
            <p className="text-sm font-mono">2020, 2024, 2028, 2032, 2036, 2040</p>
            <p className="text-xs text-muted-foreground mt-1">These years are all divisible by 4 and not by 100.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">Century Years That Are NOT Leap Years</span>
            </div>
            <p className="text-sm font-mono">1700, 1800, 1900, 2100, 2200, 2300</p>
            <p className="text-xs text-muted-foreground mt-1">Divisible by 100 but not by 400.</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">Century Years That ARE Leap Years</span>
            </div>
            <p className="text-sm font-mono">1600, 2000, 2400, 2800, 3200</p>
            <p className="text-xs text-muted-foreground mt-1">Divisible by 400, so they're leap years.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why the Complex Rules?</h2>
        <p className="text-muted-foreground">
          The simple "every 4 years" rule was used in the Julian calendar, but it overcorrected. Adding a day every 4 years assumes Earth's orbit is exactly 365.25 days, but it's actually about 365.2422 days. That difference of 0.0078 days seems tiny – but over 400 years, it adds up to about 3 extra days.
        </p>
        <p className="text-muted-foreground">
          The Gregorian calendar, introduced in 1582, fixed this by skipping leap years on century years (divisible by 100) unless they're also divisible by 400. This brings the average year length to 365.2425 days – extremely close to the actual 365.2422 days.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Calendar Accuracy Comparison</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>No leap years:</span>
              <span className="font-mono">365 days (off by ~0.2422 days/year)</span>
            </div>
            <div className="flex justify-between">
              <span>Julian (every 4 years):</span>
              <span className="font-mono">365.25 days (off by ~0.0078 days/year)</span>
            </div>
            <div className="flex justify-between">
              <span>Gregorian (current):</span>
              <span className="font-mono">365.2425 days (off by ~0.0003 days/year)</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            At the current rate, the Gregorian calendar will be off by 1 day after about 3,300 years.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Leap Year Facts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Did You Know?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• February 29 is called "Leap Day"</li>
              <li>• People born on Feb 29 are called "leaplings"</li>
              <li>• Leaplings often celebrate on Feb 28 or Mar 1 in non-leap years</li>
              <li>• About 1 in 1,461 people are born on Leap Day</li>
              <li>• The term "leap year" comes from how dates "leap" forward</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Leap Year Traditions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• In Ireland, women could propose to men on Leap Day</li>
              <li>• In Greece, marrying in a leap year is considered unlucky</li>
              <li>• In Russia, leap years are associated with more disasters</li>
              <li>• In Italy, leap years are called "anno bisesto" (bissextile year)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">How do I know if a year is a leap year?</h3>
          <p className="text-sm text-muted-foreground">
            Check if the year is divisible by 4. If yes, check if it's divisible by 100. If yes to both, check if it's divisible by 400. For example, 2024 ÷ 4 = 506 (leap year), but 1900 ÷ 100 = 19 (not a leap year), and 2000 ÷ 400 = 5 (leap year).
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Why do we have leap years?</h3>
          <p className="text-sm text-muted-foreground">
            Earth's orbit takes about 365.2422 days, not exactly 365. Without adding an extra day every 4 years, our calendar would drift out of sync with the seasons by about 24 days every 100 years.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Is 2100 a leap year?</h3>
          <p className="text-sm text-muted-foreground">
            No. 2100 is divisible by 100 but not by 400, so it won't be a leap year. The next leap year after 2096 will be 2104.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What happens if you're born on February 29?</h3>
          <p className="text-sm text-muted-foreground">
            People born on Leap Day typically celebrate on February 28 or March 1 in non-leap years. Legally, most jurisdictions consider March 1 as the official birthday in common years.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">When is the next leap year?</h3>
          <p className="text-sm text-muted-foreground">
            The next leap year is 2028, followed by 2032, 2036, and 2040. Leap years occur every 4 years, except for century years that aren't divisible by 400.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/date-difference-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Date Difference Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate days between dates</p>
          </a>
          <a href="/math-tools/day-of-week-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Day of Week Calculator</p>
            <p className="text-xs text-muted-foreground">Find the day for any date</p>
          </a>
          <a href="/math-tools/days-until-since-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Days Until/Since Calculator</p>
            <p className="text-xs text-muted-foreground">Count days to or from a date</p>
          </a>
        </div>
      </section>
    </div>
  );
}
