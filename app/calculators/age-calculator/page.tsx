"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [age, setAge] = useState<{years: number, months: number, days: number} | null>(null);

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
  };

  const reset = () => {
    setBirthDate("");
    setTargetDate(new Date().toISOString().split("T")[0]);
    setAge(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Age Calculator – Calculate Your Exact Age in Years, Months & Days</CardTitle>
          <CardDescription>
            Find out your exact age down to the day with our free age calculator. Enter any date of birth and get a precise breakdown of years, months, and days elapsed.
          </CardDescription>
        </CardHeader>
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
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
