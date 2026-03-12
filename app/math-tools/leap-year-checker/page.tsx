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

    if (num < 1 || num > 999999) {
      setError("Please enter a year between 1 and 999,999");
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

  const loadExample = (y: string) => {
    setYear(y);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Check Leap Year</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2024")}>2024</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2000")}>2000</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1900")}>1900</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2023")}>2023</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2100")}>2100</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2400")}>2400</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2025")}>2025</Button>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Leap Years</h2>
        <p className="text-muted-foreground">
          A leap year has 366 days instead of the usual 365, with an extra day added to February (February 29). This adjustment keeps our calendar synchronized with Earth's orbit around the Sun, which takes approximately 365.2422 days – not exactly 365 days.
        </p>
        <p className="text-muted-foreground">
          Without leap years, our calendar would drift by about 6 hours each year. After 100 years, we'd be off by about 24 days! The leap year system, refined over centuries, keeps this drift to a minimum.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Leap Year Rules</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <p className="font-semibold">Divisible by 4</p>
                <p className="text-sm text-muted-foreground">Most years divisible by 4 are leap years. This adds the basic correction for the extra ~0.25 days per year.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <p className="font-semibold">Except divisible by 100</p>
                <p className="text-sm text-muted-foreground">Years divisible by 100 are NOT leap years, unless... This corrects for the fact that 0.2422 is slightly less than 0.25.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <p className="font-semibold">Unless also divisible by 400</p>
                <p className="text-sm text-muted-foreground">Years divisible by 400 ARE leap years. This fine-tunes the correction for long-term accuracy.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-background rounded">
            <p className="font-semibold text-sm mb-2">Quick Decision Tree:</p>
            <div className="font-mono text-sm space-y-1">
              <div>Is year divisible by 400? → YES = Leap Year</div>
              <div>Is year divisible by 100? → YES = Not a Leap Year</div>
              <div>Is year divisible by 4? → YES = Leap Year, NO = Not a Leap Year</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Year 2024</h4>
            <div className="font-mono text-sm space-y-2">
              <div>2024 ÷ 4 = 506 ✓ (divisible by 4)</div>
              <div>2024 ÷ 100 = 20.24 ✗ (not divisible by 100)</div>
              <div className="text-muted-foreground mt-2">2024 IS a leap year</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Year 2000</h4>
            <div className="font-mono text-sm space-y-2">
              <div>2000 ÷ 400 = 5 ✓ (divisible by 400)</div>
              <div className="text-muted-foreground mt-2">2000 IS a leap year (rare century leap year!)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Year 1900</h4>
            <div className="font-mono text-sm space-y-2">
              <div>1900 ÷ 4 = 475 ✓ (divisible by 4)</div>
              <div>1900 ÷ 100 = 19 ✓ (divisible by 100)</div>
              <div>1900 ÷ 400 = 4.75 ✗ (not divisible by 400)</div>
              <div className="text-muted-foreground mt-2">1900 is NOT a leap year</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Year 2023</h4>
            <div className="font-mono text-sm space-y-2">
              <div>2023 ÷ 4 = 505.75 ✗ (not divisible by 4)</div>
              <div className="text-muted-foreground mt-2">2023 is NOT a leap year (February has 28 days)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Year 2100</h4>
            <div className="font-mono text-sm space-y-2">
              <div>2100 ÷ 4 = 525 ✓ (divisible by 4)</div>
              <div>2100 ÷ 100 = 21 ✓ (divisible by 100)</div>
              <div>2100 ÷ 400 = 5.25 ✗ (not divisible by 400)</div>
              <div className="text-muted-foreground mt-2">2100 will NOT be a leap year</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The leap year system we use today is called the Gregorian calendar, introduced by Pope Gregory XIII in 1582. Before that, the Julian calendar had a simpler rule (every 4 years), which caused a 10-day drift over centuries. When switching, October 4, 1582 was followed by October 15, 1582!
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do we need leap years?</h4>
            <p className="text-sm text-muted-foreground">
              Earth takes about 365.2422 days to orbit the Sun, not exactly 365 days. Without leap years, our calendar would drift by about 1 day every 4 years. After 700 years, summer would occur in December (in the Northern Hemisphere)!
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is February the shortest month?</h4>
            <p className="text-sm text-muted-foreground">
              In the ancient Roman calendar, February was the last month and had fewer days. When January and February were added to the beginning of the year, February kept its shorter length. The extra leap day was added to this already-short month.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What happens if you're born on February 29?</h4>
            <p className="text-sm text-muted-foreground">
              "Leaplings" typically celebrate on February 28 or March 1 in non-leap years. Legally, most jurisdictions consider March 1 as the official date in common years for things like driver's licenses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How accurate is the Gregorian calendar?</h4>
            <p className="text-sm text-muted-foreground">
              Very! The Gregorian calendar averages 365.2425 days per year, which is only 0.0003 days (about 26 seconds) off from the actual solar year. At this rate, it will take about 3,300 years to accumulate a 1-day error.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Will 2100 really not be a leap year?</h4>
            <p className="text-sm text-muted-foreground">
              Correct! 2100 is divisible by 100 but not by 400, so it breaks the usual 4-year pattern. The next century leap year after 2000 will be 2400. This is why the rule exists – to prevent too many leap years.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do all cultures use leap years?</h4>
            <p className="text-sm text-muted-foreground">
              Different calendars handle this differently. The Hebrew calendar adds an entire leap month 7 times per 19-year cycle. The Islamic calendar doesn't use leap years, so its holidays drift through the seasons over time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
