"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AnniversaryCalculator() {
  const [anniversaryDate, setAnniversaryDate] = useState<string>("");
  const [anniversaryType, setAnniversaryType] = useState<string>("wedding");
  const [results, setResults] = useState<{
    yearsSince: number;
    monthsSince: number;
    daysSince: number;
    totalDays: number;
    nextAnniversary: string;
    daysUntilNext: number;
    nextAnniversaryDay: string;
    nextAnniversaryYear: number;
  } | null>(null);

  useEffect(() => {
    if (!anniversaryDate) {
      setResults(null);
      return;
    }

    const anniversary = new Date(anniversaryDate);
    const now = new Date();

    // Calculate time since anniversary
    const diffTime = now.getTime() - anniversary.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years, months, days
    let yearsSince = now.getFullYear() - anniversary.getFullYear();
    let monthsSince = now.getMonth() - anniversary.getMonth();
    let daysSince = now.getDate() - anniversary.getDate();

    if (daysSince < 0) {
      monthsSince--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      daysSince += lastMonth.getDate();
    }

    if (monthsSince < 0) {
      yearsSince--;
      monthsSince += 12;
    }

    // If anniversary is in the future
    if (totalDays < 0) {
      setResults(null);
      return;
    }

    // Calculate next anniversary
    let nextAnniversaryYear = now.getFullYear();
    let nextAnniversary = new Date(anniversary);
    nextAnniversary.setFullYear(nextAnniversaryYear);

    // If this year's anniversary has passed, calculate next year's
    if (now > nextAnniversary) {
      nextAnniversaryYear = now.getFullYear() + 1;
      nextAnniversary = new Date(anniversary);
      nextAnniversary.setFullYear(nextAnniversaryYear);
    }

    const daysUntilNext = Math.ceil((nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const nextAnniversaryDay = nextAnniversary.toLocaleDateString("en-US", { weekday: "long" });

    setResults({
      yearsSince,
      monthsSince,
      daysSince,
      totalDays,
      nextAnniversary: nextAnniversary.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric"
      }),
      daysUntilNext,
      nextAnniversaryDay,
      nextAnniversaryYear,
    });
  }, [anniversaryDate]);

  const reset = () => {
    setAnniversaryDate("");
    setAnniversaryType("wedding");
    setResults(null);
  };

  const getAnniversaryName = (years: number): string => {
    const names: { [key: number]: string } = {
      1: "Paper",
      2: "Cotton",
      3: "Leather",
      4: "Fruit/Flowers",
      5: "Wood",
      6: "Iron",
      7: "Wool/Copper",
      8: "Bronze",
      9: "Pottery",
      10: "Tin/Aluminum",
      11: "Steel",
      12: "Silk",
      13: "Lace",
      14: "Ivory",
      15: "Crystal",
      20: "China",
      25: "Silver",
      30: "Pearl",
      35: "Coral",
      40: "Ruby",
      45: "Sapphire",
      50: "Gold",
      55: "Emerald",
      60: "Diamond",
    };
    return names[years] || "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Anniversary Calculator – Free Anniversary Date Counter</CardTitle>
          <CardDescription>
            Calculate how long since your special day and when your next anniversary is. Perfect for weddings, birthdays, relationships, and any memorable date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="anniversaryDate">Anniversary Date</Label>
              <Input
                id="anniversaryDate"
                type="date"
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
              />
            </div>

            <div>
              <Label>Anniversary Type</Label>
              <Select value={anniversaryType} onValueChange={setAnniversaryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding Anniversary</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="relationship">Relationship</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Time Since Your {anniversaryType === "wedding" ? "Wedding" : anniversaryType.charAt(0).toUpperCase() + anniversaryType.slice(1)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.yearsSince}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.yearsSince === 1 ? "Year" : "Years"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.monthsSince}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.monthsSince === 1 ? "Month" : "Months"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.daysSince}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.daysSince === 1 ? "Day" : "Days"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.totalDays}</p>
                      <p className="text-xs text-muted-foreground">Total Days</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Next Anniversary</p>
                  <div className="p-4 bg-background rounded-md">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{results.daysUntilNext}</p>
                      <p className="text-sm text-muted-foreground">
                        {results.daysUntilNext === 1 ? "day until" : "days until"}
                      </p>
                      <p className="font-medium mt-2">{results.nextAnniversary}</p>
                      <p className="text-sm text-muted-foreground">
                        {results.nextAnniversaryDay}
                        {results.yearsSince + 1 <= 60 && getAnniversaryName(results.yearsSince + 1) && (
                          <span> • {getAnniversaryName(results.yearsSince + 1)} Anniversary</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Anniversary Gift Guide</p>
                  <div className="text-xs grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[1, 5, 10, 15, 20, 25, 30, 40, 50].map((year) => (
                      <div key={year} className="p-2 bg-background rounded">
                        <span className="font-medium">{year}yr:</span> {getAnniversaryName(year)}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  Traditional anniversary gift names are shown for wedding anniversaries. Celebrate every moment!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
