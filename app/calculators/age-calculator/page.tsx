"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [age, setAge] = useState<{years: number, months: number, days: number} | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [nextBirthday, setNextBirthday] = useState<string>("");

  const calculate = () => {
    if (!birthDate || !targetDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) return;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
    
    // Calculate total days lived
    const diffTime = target.getTime() - birth.getTime();
    const totalDaysCount = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setTotalDays(totalDaysCount);

    // Calculate next birthday
    const currentYear = target.getFullYear();
    const birthMonth = birth.getMonth();
    const birthDay = birth.getDate();
    let nextBirthdayDate = new Date(currentYear, birthMonth, birthDay);
    if (nextBirthdayDate <= target) {
      nextBirthdayDate = new Date(currentYear + 1, birthMonth, birthDay);
    }
    const daysUntilNext = Math.ceil((nextBirthdayDate.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    setNextBirthday(`${daysUntilNext} days (${nextBirthdayDate.toLocaleDateString()})`);
  };

  const reset = () => {
    setBirthDate("");
    setTargetDate(new Date().toISOString().split("T")[0]);
    setAge(null);
    setTotalDays(null);
    setNextBirthday("");
  };

  // Fun age facts
  const getAgeFacts = () => {
    if (!totalDays || !age) return [];
    const hours = totalDays * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const heartbeats = Math.round(seconds * 1.2); // Average 72 bpm
    const breaths = Math.round(minutes * 16); // Average 16 breaths/min
    const sleepDays = Math.round(totalDays * 0.33); // Assume 8 hours sleep
    
    return [
      { label: "Hours lived", value: hours.toLocaleString() },
      { label: "Minutes lived", value: minutes.toLocaleString() },
      { label: "Seconds lived", value: seconds.toLocaleString() },
      { label: "Heartbeats (est.)", value: heartbeats.toLocaleString() },
      { label: "Breaths taken (est.)", value: breaths.toLocaleString() },
      { label: "Days spent sleeping", value: sleepDays.toLocaleString() },
    ];
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="birthDate">Date of Birth</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="targetDate">Calculate Age On</Label>
              <Input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave as today for current age
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Age</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {age !== null && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Your Age</p>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-3xl font-bold">{age.years}</p>
                    <p className="text-sm text-muted-foreground">Years</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{age.months}</p>
                    <p className="text-sm text-muted-foreground">Months</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{age.days}</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                </div>
                {totalDays && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Total days lived: <span className="font-semibold">{totalDays.toLocaleString()}</span></p>
                    {nextBirthday && (
                      <p className="text-sm text-muted-foreground">Next birthday: <span className="font-semibold">{nextBirthday}</span></p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {age && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Age in Different Units</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {getAgeFacts().map((fact) => (
                  <div key={fact.label} className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">{fact.label}</p>
                    <p className="text-lg font-bold">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Age Is Calculated</CardTitle>
          <CardDescription>Understanding the calculation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Age calculation seems simple but has quirks. You can't just subtract years – you need to account for whether your birthday has occurred this year. If today is March 1 and your birthday is June 15, you haven't had your birthday yet, so you're one year younger than the year difference suggests.
          </p>
          <p className="text-sm text-muted-foreground">
            Months and days get tricky because months have different lengths. The calculator uses the actual calendar: if you were born on the 31st and it's now the 15th, it borrows days from the previous month. This gives you an accurate "lived time" rather than a rough estimate.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-semibold mb-2">Example Calculation</p>
            <p className="text-xs text-muted-foreground">
              Born: January 15, 2000 | Today: March 10, 2024
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Years: 2024 - 2000 = 24, but birthday hasn't occurred yet, so 23 years
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Months: January to March = 1 month (Jan 15 to Feb 15)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Days: Feb 15 to Mar 10 = 24 days (2024 is a leap year)
            </p>
            <p className="text-xs font-semibold mt-2">
              Result: 23 years, 1 month, 24 days
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Milestones</CardTitle>
          <CardDescription>Common age-related milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Age</TableHead>
                <TableHead>Milestone</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">0</TableCell>
                <TableCell className="font-medium">Birth</TableCell>
                <TableCell className="text-xs">Average human lifespan varies by country (60-85 years)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">1</TableCell>
                <TableCell className="font-medium">First birthday</TableCell>
                <TableCell className="text-xs">Infant mortality largely passed in developed nations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">5</TableCell>
                <TableCell className="font-medium">School age</TableCell>
                <TableCell className="text-xs">Brain at 90% of adult size</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">13</TableCell>
                <TableCell className="font-medium">Teenager</TableCell>
                <TableCell className="text-xs">Puberty typically underway</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">16</TableCell>
                <TableCell className="font-medium">Driving age (US)</TableCell>
                <TableCell className="text-xs">Varies by country (17-18 in many places)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">18</TableCell>
                <TableCell className="font-medium">Legal adult</TableCell>
                <TableCell className="text-xs">Can vote, sign contracts, join military</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">21</TableCell>
                <TableCell className="font-medium">Drinking age (US)</TableCell>
                <TableCell className="text-xs">Brain fully developed around age 25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">25</TableCell>
                <TableCell className="font-medium">Car rental age</TableCell>
                <TableCell className="text-xs">Brain prefrontal cortex fully matures</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">30</TableCell>
                <TableCell className="font-medium">Physical peak ends</TableCell>
                <TableCell className="text-xs">Muscle mass begins gradual decline</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">50</TableCell>
                <TableCell className="font-medium">Half century</TableCell>
                <TableCell className="text-xs">Menopause typically occurs (45-55)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">65</TableCell>
                <TableCell className="font-medium">Retirement age</TableCell>
                <TableCell className="text-xs">Medicare eligibility (US)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">100</TableCell>
                <TableCell className="font-medium">Centenarian</TableCell>
                <TableCell className="text-xs">~0.02% of population reaches 100</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you calculate age accurately?</h4>
            <p className="text-xs text-muted-foreground">
              Count complete years first – only count a year if your birthday has passed. Then count complete months from your last birthday. Finally, count remaining days. This gives you precise age in years, months, and days rather than just years.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does age matter in different cultures?</h4>
            <p className="text-xs text-muted-foreground">
              In East Asian cultures, you're 1 at birth and gain a year each New Year (not birthday). In Korea, you're also a year older on New Year's Day. Some cultures count pregnancy time. Western age counts from birth date – the method used by this calculator.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the oldest verified human age?</h4>
            <p className="text-xs text-muted-foreground">
              Jeanne Calment of France lived to 122 years and 164 days (1875-1997), the oldest verified person ever. The oldest living person is typically around 115-118. Maximum human lifespan appears to be around 120-125 years based on current data.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many days have I lived?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply your age in years by 365.25 (accounting for leap years), then add days for months and extra days. A 30-year-old has lived approximately 10,957 days. Our calculator shows the exact number based on your specific birth date.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When is my next birthday?</h4>
            <p className="text-xs text-muted-foreground">
              Your next birthday is the anniversary of your birth date in the current or next year. If your birthday already passed this year, it's next year. The calculator shows days remaining until your next birthday when you calculate your age.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/calculators/date-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Date Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate days between dates</p>
            </a>
            <a href="/calculators/anniversary-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Anniversary Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate anniversary dates</p>
            </a>
            <a href="/calculators/week-number-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Week Number Calculator</p>
              <p className="text-xs text-muted-foreground">Find week of year</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
