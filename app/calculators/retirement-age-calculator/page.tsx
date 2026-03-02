"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RetirementAgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [results, setResults] = useState<{
    retirementDate: string;
    yearsUntil: number;
    monthsUntil: number;
    daysUntil: number;
    ageAtRetirement: number;
  } | null>(null);

  useEffect(() => {
    if (!birthDate || !retirementAge) {
      setResults(null);
      return;
    }

    const birth = new Date(birthDate);
    const now = new Date();
    const retirementAgeNum = parseInt(retirementAge);

    if (isNaN(retirementAgeNum) || retirementAgeNum <= 0) return;

    // Calculate retirement date
    const retirementDate = new Date(birth);
    retirementDate.setFullYear(birth.getFullYear() + retirementAgeNum);

    // Calculate time until retirement
    const diffTime = retirementDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years, months, days
    let yearsUntil = retirementDate.getFullYear() - now.getFullYear();
    let monthsUntil = retirementDate.getMonth() - now.getMonth();
    let daysUntil = retirementDate.getDate() - now.getDate();

    if (daysUntil < 0) {
      monthsUntil--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      daysUntil += lastMonth.getDate();
    }

    if (monthsUntil < 0) {
      yearsUntil--;
      monthsUntil += 12;
    }

    // If retirement has passed
    const isRetired = diffDays < 0;

    setResults({
      retirementDate: retirementDate.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric",
        weekday: "long"
      }),
      yearsUntil: isRetired ? 0 : yearsUntil,
      monthsUntil: isRetired ? 0 : monthsUntil,
      daysUntil: isRetired ? 0 : daysUntil,
      ageAtRetirement: retirementAgeNum,
    });
  }, [birthDate, retirementAge]);

  const reset = () => {
    setBirthDate("");
    setRetirementAge("65");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Retirement Age Calculator – Free Retirement Date Calculator</CardTitle>
          <CardDescription>
            Calculate when you can retire based on your birth date and desired retirement age. Find out exactly how many years, months, and days until your retirement.
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
              <Label htmlFor="retirementAge">Desired Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                placeholder="e.g., 65"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-4">
                <div className="text-center p-4 bg-background rounded-md">
                  <p className="text-sm text-muted-foreground">Estimated Retirement Date</p>
                  <p className="text-2xl font-bold mt-2">{results.retirementDate}</p>
                  <p className="text-lg font-medium mt-1 text-primary">Age {results.ageAtRetirement}</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2 text-center">Time Until Retirement</p>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.yearsUntil}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.yearsUntil === 1 ? "Year" : "Years"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.monthsUntil}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.monthsUntil === 1 ? "Month" : "Months"}
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded-md text-center">
                      <p className="text-3xl font-bold">{results.daysUntil}</p>
                      <p className="text-xs text-muted-foreground">
                        {results.daysUntil === 1 ? "Day" : "Days"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Common Retirement Ages</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[55, 60, 62, 65, 67, 70].map((age) => (
                      <button
                        key={age}
                        onClick={() => setRetirementAge(age.toString())}
                        className={`p-2 rounded-md text-sm transition-colors ${
                          retirementAge === age.toString()
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted"
                        }`}
                      >
                        Age {age}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  This calculator provides an estimate based on your input. Consider factors like Social Security benefits, pension plans, and personal savings when planning retirement.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
